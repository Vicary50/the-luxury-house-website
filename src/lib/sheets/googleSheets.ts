import { google } from 'googleapis';
import { AccommodationType, BookingData, AvailabilitySlot } from '@/types';

// Google Sheets configuration
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// Initialize Google Sheets client
function getGoogleSheetsClient() {
  const email = process.env.GOOGLE_SHEETS_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n');
  
  if (!email || !privateKey) {
    throw new Error('Google Sheets credentials not configured');
  }

  const auth = new google.auth.JWT(
    email,
    undefined,
    privateKey,
    SCOPES
  );

  return google.sheets({ version: 'v4', auth });
}

// Sheet structure constants
export const SHEET_NAMES = {
  BOOKINGS: 'Bookings',
  AVAILABILITY: 'Availability',
  SETTINGS: 'Settings'
} as const;

// Column mappings for the Bookings sheet
export const BOOKING_COLUMNS = {
  ID: 'A',
  ACCOMMODATION_TYPE: 'B',
  CHECK_IN: 'C',
  CHECK_OUT: 'D',
  NIGHTS: 'E',
  ADULTS: 'F',
  CHILDREN: 'G',
  INFANTS: 'H',
  TOTAL_GUESTS: 'I',
  FIRST_NAME: 'J',
  LAST_NAME: 'K',
  EMAIL: 'L',
  PHONE: 'M',
  TOTAL_PRICE: 'N',
  STATUS: 'O',
  PAYMENT_STATUS: 'P',
  SPECIAL_REQUESTS: 'Q',
  CREATED_AT: 'R',
  UPDATED_AT: 'S'
} as const;

// Column mappings for the Availability sheet
export const AVAILABILITY_COLUMNS = {
  DATE: 'A',
  ENTIRE_PROPERTY_AVAILABLE: 'B',
  POOLHOUSE_AVAILABLE: 'C',
  NOTES: 'D'
} as const;

/**
 * Get all bookings from Google Sheets
 */
export async function getAllBookings(): Promise<BookingData[]> {
  try {
    const sheets = getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

    if (!spreadsheetId) {
      throw new Error('Google Sheets ID not configured');
    }

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${SHEET_NAMES.BOOKINGS}!A2:S1000`, // Skip header row
    });

    const rows = response.data.values || [];
    
    return rows.map((row, index) => ({
      id: row[0] || `booking-${index}`,
      accommodationType: row[1] as AccommodationType,
      dates: {
        checkIn: new Date(row[2]),
        checkOut: new Date(row[3]),
        nights: parseInt(row[4]) || 0
      },
      guests: {
        adults: parseInt(row[5]) || 0,
        children: parseInt(row[6]) || 0,
        infants: parseInt(row[7]) || 0,
        total: parseInt(row[8]) || 0
      },
      pricing: {
        basePrice: 0,
        seasonMultiplier: 1,
        weekendSurcharge: 0,
        guestSurcharge: 0,
        subtotal: 0,
        taxes: 0,
        cleaningFee: 0,
        total: parseFloat(row[13]) || 0
      },
      customerInfo: {
        firstName: row[9] || '',
        lastName: row[10] || '',
        email: row[11] || '',
        phone: row[12] || '',
        address: {
          street: '',
          city: '',
          postalCode: '',
          country: ''
        }
      },
      specialRequests: row[16] || '',
      status: row[14] as 'draft' | 'pending' | 'confirmed' | 'cancelled' || 'draft',
      paymentStatus: row[15] as 'pending' | 'paid' | 'failed' | 'refunded' || 'pending',
      createdAt: new Date(row[17] || Date.now()),
      updatedAt: new Date(row[18] || Date.now())
    }));
  } catch (error) {
    console.error('Error fetching bookings from Google Sheets:', error);
    return [];
  }
}

/**
 * Add a new booking to Google Sheets
 */
export async function addBooking(booking: BookingData): Promise<boolean> {
  try {
    const sheets = getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

    if (!spreadsheetId) {
      throw new Error('Google Sheets ID not configured');
    }

    const row = [
      booking.id,
      booking.accommodationType,
      booking.dates.checkIn.toISOString().split('T')[0],
      booking.dates.checkOut.toISOString().split('T')[0],
      booking.dates.nights,
      booking.guests.adults,
      booking.guests.children,
      booking.guests.infants,
      booking.guests.total,
      booking.customerInfo.firstName,
      booking.customerInfo.lastName,
      booking.customerInfo.email,
      booking.customerInfo.phone,
      booking.pricing.total,
      booking.status,
      booking.paymentStatus,
      booking.specialRequests || '',
      booking.createdAt.toISOString(),
      booking.updatedAt.toISOString()
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${SHEET_NAMES.BOOKINGS}!A:S`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [row]
      }
    });

    return true;
  } catch (error) {
    console.error('Error adding booking to Google Sheets:', error);
    return false;
  }
}

/**
 * Check availability for specific dates and accommodation type
 */
export async function checkAvailability(
  checkIn: Date,
  checkOut: Date,
  accommodationType: AccommodationType
): Promise<boolean> {
  try {
    // Get all bookings
    const bookings = await getAllBookings();
    
    // Check for overlapping bookings
    const hasConflict = bookings.some(booking => {
      // Skip cancelled bookings
      if (booking.status === 'cancelled') return false;
      
      // Check if accommodation types conflict
      if (booking.accommodationType === 'entire-property' || accommodationType === 'entire-property') {
        // If either booking is for entire property, there's a conflict
        return datesOverlap(checkIn, checkOut, booking.dates.checkIn, booking.dates.checkOut);
      }
      
      // Both are poolhouse bookings - check for overlap
      if (booking.accommodationType === accommodationType) {
        return datesOverlap(checkIn, checkOut, booking.dates.checkIn, booking.dates.checkOut);
      }
      
      return false;
    });

    return !hasConflict;
  } catch (error) {
    console.error('Error checking availability:', error);
    return false;
  }
}

/**
 * Get availability slots for a date range
 */
export async function getAvailabilitySlots(
  startDate: Date,
  endDate: Date,
  accommodationType: AccommodationType
): Promise<AvailabilitySlot[]> {
  const slots: AvailabilitySlot[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const isAvailable = await checkAvailability(currentDate, nextDay, accommodationType);
    
    slots.push({
      date: currentDate.toISOString().split('T')[0],
      isAvailable,
      accommodationType,
      reason: isAvailable ? undefined : 'Already booked'
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return slots;
}

/**
 * Helper function to check if two date ranges overlap
 */
function datesOverlap(
  start1: Date,
  end1: Date,
  start2: Date,
  end2: Date
): boolean {
  return start1 < end2 && end1 > start2;
}

/**
 * Update booking status in Google Sheets
 */
export async function updateBookingStatus(
  bookingId: string,
  status: 'draft' | 'pending' | 'confirmed' | 'cancelled',
  paymentStatus?: 'pending' | 'paid' | 'failed' | 'refunded'
): Promise<boolean> {
  try {
    const sheets = getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

    if (!spreadsheetId) {
      throw new Error('Google Sheets ID not configured');
    }

    // First, find the row with the booking ID
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${SHEET_NAMES.BOOKINGS}!A:A`,
    });

    const rows = response.data.values || [];
    const rowIndex = rows.findIndex(row => row[0] === bookingId);

    if (rowIndex === -1) {
      throw new Error(`Booking with ID ${bookingId} not found`);
    }

    // Update the status (rowIndex + 1 because sheets are 1-indexed)
    const actualRowNumber = rowIndex + 1;
    
    const updates = [
      {
        range: `${SHEET_NAMES.BOOKINGS}!${BOOKING_COLUMNS.STATUS}${actualRowNumber}`,
        values: [[status]]
      },
      {
        range: `${SHEET_NAMES.BOOKINGS}!${BOOKING_COLUMNS.UPDATED_AT}${actualRowNumber}`,
        values: [[new Date().toISOString()]]
      }
    ];

    if (paymentStatus) {
      updates.push({
        range: `${SHEET_NAMES.BOOKINGS}!${BOOKING_COLUMNS.PAYMENT_STATUS}${actualRowNumber}`,
        values: [[paymentStatus]]
      });
    }

    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId,
      requestBody: {
        data: updates,
        valueInputOption: 'RAW'
      }
    });

    return true;
  } catch (error) {
    console.error('Error updating booking status:', error);
    return false;
  }
}

/**
 * Add availability inquiry to Google Sheets
 */
export async function addAvailabilityInquiry(inquiry: {
  accommodationType: string;
  firstName: string;
  surname: string;
  checkInDate: string;
  checkOutDate: string;
}): Promise<boolean> {
  try {
    const sheets = getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

    if (!spreadsheetId) {
      throw new Error('Google Sheets ID not configured');
    }

    // Create a unique ID for the inquiry
    const inquiryId = `INQ-${Date.now()}`;
    const now = new Date().toISOString();

    const row = [
      inquiryId,
      inquiry.accommodationType,
      inquiry.checkInDate,
      inquiry.checkOutDate,
      '', // nights (calculated later if needed)
      '', // adults (not collected in inquiry)
      '', // children (not collected in inquiry)
      '', // infants (not collected in inquiry)
      '', // total guests (not collected in inquiry)
      inquiry.firstName,
      inquiry.surname,
      '', // email (not collected in inquiry)
      '', // phone (not collected in inquiry)
      '', // total price (not applicable for inquiry)
      'inquiry', // status
      '', // payment status (not applicable)
      '', // special requests (not collected)
      now, // created at
      now  // updated at
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${SHEET_NAMES.BOOKINGS}!A:S`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [row]
      }
    });

    return true;
  } catch (error) {
    console.error('Error adding availability inquiry to Google Sheets:', error);
    return false;
  }
}

/**
 * Initialize Google Sheets with proper headers (run this once)
 */
export async function initializeGoogleSheets(): Promise<boolean> {
  try {
    const sheets = getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

    if (!spreadsheetId) {
      throw new Error('Google Sheets ID not configured');
    }

    // Headers for Bookings sheet
    const bookingHeaders = [
      'ID',
      'Accommodation Type',
      'Check In',
      'Check Out',
      'Nights',
      'Adults',
      'Children',
      'Infants',
      'Total Guests',
      'First Name',
      'Last Name',
      'Email',
      'Phone',
      'Total Price',
      'Status',
      'Payment Status',
      'Special Requests',
      'Created At',
      'Updated At'
    ];

    // Headers for Availability sheet
    const availabilityHeaders = [
      'Date',
      'Entire Property Available',
      'Poolhouse Available',
      'Notes'
    ];

    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId,
      requestBody: {
        data: [
          {
            range: `${SHEET_NAMES.BOOKINGS}!A1:S1`,
            values: [bookingHeaders]
          },
          {
            range: `${SHEET_NAMES.AVAILABILITY}!A1:D1`,
            values: [availabilityHeaders]
          }
        ],
        valueInputOption: 'RAW'
      }
    });

    return true;
  } catch (error) {
    console.error('Error initializing Google Sheets:', error);
    return false;
  }
}