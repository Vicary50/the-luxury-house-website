import { NextRequest, NextResponse } from 'next/server';
import { addBooking, getAllBookings, checkAvailability } from '@/lib/sheets/googleSheets';
import { BookingData } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    const bookings = await getAllBookings();
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json();

    // Validate required fields
    if (!bookingData.accommodationType || !bookingData.dates || !bookingData.guests || !bookingData.customerInfo) {
      return NextResponse.json(
        { error: 'Missing required booking information' },
        { status: 400 }
      );
    }

    // Check availability before creating booking
    const checkIn = new Date(bookingData.dates.checkIn);
    const checkOut = new Date(bookingData.dates.checkOut);
    
    const isAvailable = await checkAvailability(
      checkIn,
      checkOut,
      bookingData.accommodationType
    );

    if (!isAvailable) {
      return NextResponse.json(
        { error: 'Selected dates are not available' },
        { status: 409 }
      );
    }

    // Create a complete booking object
    const booking: BookingData = {
      id: uuidv4(),
      accommodationType: bookingData.accommodationType,
      dates: {
        checkIn: new Date(bookingData.dates.checkIn),
        checkOut: new Date(bookingData.dates.checkOut),
        nights: bookingData.dates.nights
      },
      guests: bookingData.guests,
      pricing: bookingData.pricing,
      customerInfo: bookingData.customerInfo,
      specialRequests: bookingData.specialRequests || '',
      status: 'draft',
      paymentStatus: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Add booking to Google Sheets
    const success = await addBooking(booking);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to save booking' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      booking: {
        id: booking.id,
        status: booking.status,
        paymentStatus: booking.paymentStatus
      }
    });

  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}