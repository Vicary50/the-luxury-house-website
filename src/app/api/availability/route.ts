import { NextRequest, NextResponse } from 'next/server';
import { checkAvailability, getAvailabilitySlots, addBooking } from '@/lib/sheets/googleSheets';
import { AccommodationType, BookingData } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const accommodationType = (searchParams.get('accommodationType') || searchParams.get('accommodation')) as AccommodationType;
    const range = searchParams.get('range'); // For getting multiple days

    if (!accommodationType) {
      return NextResponse.json(
        { error: 'Accommodation type is required' },
        { status: 400 }
      );
    }

    // If range is requested, return availability for multiple days
    if (range && checkIn) {
      const startDate = new Date(checkIn);
      const endDate = new Date(checkOut || checkIn);
      endDate.setDate(endDate.getDate() + parseInt(range) || 30);

      const slots = await getAvailabilitySlots(startDate, endDate, accommodationType);
      return NextResponse.json({ slots });
    }

    // Single availability check
    if (!checkIn || !checkOut) {
      return NextResponse.json(
        { error: 'Check-in and check-out dates are required' },
        { status: 400 }
      );
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    const isAvailable = await checkAvailability(checkInDate, checkOutDate, accommodationType);

    return NextResponse.json({ 
      available: isAvailable,
      checkIn: checkInDate.toISOString(),
      checkOut: checkOutDate.toISOString(),
      accommodationType 
    });

  } catch (error) {
    console.error('Availability check error:', error);
    return NextResponse.json(
      { error: 'Failed to check availability' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Handle form submissions from the check availability form
    if (body.firstName && body.surname) {
      const { accommodationType, firstName, surname, checkInDate, checkOutDate } = body;

      if (!accommodationType || !firstName || !surname || !checkInDate || !checkOutDate) {
        return NextResponse.json(
          { error: 'All fields are required' },
          { status: 400 }
        );
      }

      // Create a booking object for the inquiry (using same method as booking form)
      const inquiryAsBooking: BookingData = {
        id: `INQ-${uuidv4()}`,
        accommodationType: accommodationType as AccommodationType,
        dates: {
          checkIn: new Date(checkInDate),
          checkOut: new Date(checkOutDate),
          nights: Math.ceil((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24))
        },
        guests: {
          adults: 0, // Not collected in availability form
          children: 0,
          infants: 0,
          total: 0
        },
        pricing: {
          basePrice: 0,
          seasonMultiplier: 1,
          weekendSurcharge: 0,
          guestSurcharge: 0,
          subtotal: 0,
          taxes: 0,
          cleaningFee: 0,
          total: 0
        },
        customerInfo: {
          firstName,
          lastName: surname,
          email: '', // Not collected in availability form
          phone: '',
          address: {
            street: '',
            city: '',
            postalCode: '',
            country: ''
          }
        },
        specialRequests: '',
        status: 'draft', // Mark as draft inquiry
        paymentStatus: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const success = await addBooking(inquiryAsBooking);

      if (success) {
        return NextResponse.json({ 
          message: 'Inquiry submitted successfully'
        });
      } else {
        return NextResponse.json(
          { error: 'Failed to save inquiry' },
          { status: 500 }
        );
      }
    }

    // Handle batch availability checks (existing functionality)
    const { dates, accommodationType } = body;

    if (!dates || !dates.length || !accommodationType) {
      return NextResponse.json(
        { error: 'Dates and accommodation type are required' },
        { status: 400 }
      );
    }

    const availabilityResults = await Promise.all(
      dates.map(async (dateStr: string) => {
        const date = new Date(dateStr);
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);

        const isAvailable = await checkAvailability(date, nextDay, accommodationType);
        return {
          date: dateStr,
          available: isAvailable
        };
      })
    );

    return NextResponse.json({ results: availabilityResults });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}