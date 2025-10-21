# Booking System Setup Instructions

Your comprehensive booking system has been implemented with the following features:

## 🎯 What's Been Built

### ✅ Phase 1 - Booking Wizard (COMPLETED)
- **3-Step Booking Flow**: Accommodation → Dates & Guests → Payment
- **Dynamic Pricing Engine**: Calculates pricing based on:
  - Guest count
  - Seasonal pricing (peak/high/standard)
  - Weekend surcharges
  - Accommodation type (entire property vs poolhouse)
  - Cleaning fees and taxes
- **Form Validation**: Comprehensive validation at each step
- **Animated Progress Indicator**: Visual progress through booking steps

### ✅ Phase 2 - Backend Integration (COMPLETED)
- **Google Sheets Integration**: Booking storage and availability checking
- **Stripe Payment Processing**: Secure checkout sessions and webhooks
- **API Endpoints**:
  - `/api/bookings` - Create and retrieve bookings
  - `/api/availability` - Check date availability
  - `/api/stripe/create-checkout-session` - Create payment sessions
  - `/api/stripe/webhook` - Handle payment confirmations
- **Real-time Availability Checking**: Validates dates before booking

## 🚀 To Complete Setup

### 1. Install Required Packages
```bash
npm install stripe uuid googleapis react-datepicker
npm install --save-dev @types/uuid
```

### 2. Environment Variables Setup
Copy `.env.example` to `.env.local` and configure:

```bash
# Google Sheets Configuration
GOOGLE_SHEETS_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key-Here\n-----END PRIVATE KEY-----"
GOOGLE_SHEETS_ID=your-google-sheet-id-here

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# App Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3001
```

### 3. Google Sheets Setup

#### Create Service Account:
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google Sheets API
4. Create Service Account credentials
5. Download the JSON key file
6. Copy email and private key to environment variables

#### Create Spreadsheet:
1. Create a new Google Sheet
2. Share it with your service account email (Editor access)
3. Add these headers in Row 1:
   ```
   ID | Accommodation | Check-in | Check-out | Nights | Adults | Children | Infants | Total Guests | Base Price | Weekend Surcharge | Guest Surcharge | Cleaning Fee | Taxes | Total Price | First Name | Last Name | Email | Phone | Street | City | Postal Code | Country | Special Requests | Status | Payment Status | Created At | Updated At
   ```
4. Copy the spreadsheet ID from the URL and add to environment variables

### 4. Stripe Setup

#### Create Stripe Account:
1. Sign up at [Stripe Dashboard](https://dashboard.stripe.com)
2. Get your test API keys from the dashboard
3. Add them to environment variables

#### Configure Webhook:
1. In Stripe Dashboard, go to Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/stripe/webhook`
3. Select events: `checkout.session.completed`
4. Copy webhook secret to environment variables

### 5. Test the System

1. **Start Development Server**:
   ```bash
   npm run dev
   ```

2. **Test Booking Flow**:
   - Visit `/booking`
   - Complete all 3 steps
   - Verify data appears in Google Sheets
   - Test Stripe payment (use test card: 4242 4242 4242 4242)

## 📋 File Structure

```
src/
├── components/booking/
│   ├── BookingWizard.tsx           # Main booking orchestrator
│   ├── BookingProgress.tsx         # Progress indicator
│   └── steps/
│       ├── Step1AccommodationType.tsx
│       ├── Step2DatesGuests.tsx
│       └── Step3Payment.tsx
├── lib/
│   ├── booking/pricing.ts          # Pricing calculations
│   ├── sheets/googleSheets.ts      # Google Sheets integration
│   └── stripe/stripe.ts           # Stripe integration
├── app/api/
│   ├── bookings/route.ts          # Booking API endpoints
│   ├── availability/route.ts      # Availability checking
│   └── stripe/
│       ├── create-checkout-session/route.ts
│       └── webhook/route.ts
└── types/index.ts                 # TypeScript definitions
```

## 🎛️ Customization Options

### Pricing Configuration
Edit `src/lib/booking/pricing.ts`:
- Adjust base prices for accommodation types
- Modify seasonal pricing periods
- Change surcharge percentages
- Update minimum stay requirements

### Accommodation Features
Edit `src/components/booking/steps/Step1AccommodationType.tsx`:
- Update property descriptions
- Modify capacity limits
- Change feature lists

### Payment Flow
Edit `src/components/booking/steps/Step3Payment.tsx`:
- Customize form fields
- Modify validation rules
- Update country options

## 🔧 Production Deployment

1. **Update Environment Variables**:
   - Change Stripe keys to live mode
   - Update BASE_URL to production domain
   - Ensure Google Sheets is properly shared

2. **Configure Webhook Endpoint**:
   - Update Stripe webhook URL to production
   - Verify webhook signature validation

3. **Test Production Flow**:
   - Complete test booking
   - Verify Google Sheets integration
   - Confirm email notifications (if implemented)

## 🆘 Troubleshooting

### Common Issues:

1. **Google Sheets Connection**:
   - Verify service account email has editor access
   - Check private key formatting (newlines as \\n)
   - Ensure correct spreadsheet ID

2. **Stripe Integration**:
   - Verify API keys are correct
   - Check webhook endpoint URL
   - Confirm webhook secret matches

3. **Date Availability**:
   - Check Google Sheets has proper headers
   - Verify date format consistency
   - Ensure API endpoints are accessible

### Debug Tools:
- Check browser console for errors
- Review Next.js server logs
- Use Stripe CLI for webhook testing
- Verify Google Sheets API quotas

## 📞 Support

If you encounter issues:
1. Check the browser console for error messages
2. Review server logs in terminal
3. Verify all environment variables are set
4. Test each integration separately

Your booking system is now ready for testing and deployment! 🎉