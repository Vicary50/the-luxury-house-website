# Google Sheets Setup Guide

## Step 1: Create Google Cloud Project & Service Account

### 1.1 Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click "Select a project" → "New Project"
3. Name it "Haven Booking System" → Create

### 1.2 Enable Google Sheets API
1. In your project, go to "APIs & Services" → "Library"
2. Search for "Google Sheets API"
3. Click on it → Enable

### 1.3 Create Service Account
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "Service Account"
3. Name: `haven-booking-service`
4. Description: `Service account for booking system`
5. Click "Create and Continue"
6. Skip role assignment for now → Done

### 1.4 Generate Service Account Key
1. Click on your new service account
2. Go to "Keys" tab → "Add Key" → "Create New Key"
3. Choose JSON format → Create
4. Download the JSON file (keep it safe!)

### 1.5 Extract Credentials
From the downloaded JSON file, you need:
- `client_email` → This goes in GOOGLE_SHEETS_EMAIL
- `private_key` → This goes in GOOGLE_SHEETS_PRIVATE_KEY

## Step 2: Create Google Sheet

### 2.1 Create New Spreadsheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it "Haven Booking Data"

### 2.2 Set Up Headers
**Copy these EXACT headers into Row 1 (A1 to AA1):**

```
ID	Accommodation	Check-in	Check-out	Nights	Adults	Children	Infants	Total Guests	Base Price	Weekend Surcharge	Guest Surcharge	Cleaning Fee	Taxes	Total Price	First Name	Last Name	Email	Phone	Street	City	Postal Code	Country	Special Requests	Status	Payment Status	Created At	Updated At
```

### 2.3 Share with Service Account
1. Click "Share" button in your spreadsheet
2. Add your service account email (from step 1.5)
3. Give it "Editor" permissions
4. Uncheck "Notify people" → Send

### 2.4 Get Spreadsheet ID
From your spreadsheet URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
Copy the SPREADSHEET_ID part → This goes in GOOGLE_SHEETS_ID

## Step 3: Update Environment Variables

Edit your `.env.local` file with the actual values:

```bash
# Google Sheets Configuration
GOOGLE_SHEETS_EMAIL=haven-booking-service@your-project-id.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----"
GOOGLE_SHEETS_ID=1aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789
```

⚠️ **Important Notes:**
- The private key must include the `\n` characters for line breaks
- Keep the quotes around the private key
- Don't share these credentials publicly

## Testing the Connection

Once configured, your booking system will:
1. ✅ Store all bookings in your Google Sheet
2. ✅ Check availability against existing bookings  
3. ✅ Update booking status when payments complete

Your Google Sheets integration will be ready! 🎉