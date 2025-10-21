# Stripe Setup Guide

## Step 1: Create Stripe Account

### 1.1 Sign Up for Stripe
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/register)
2. Create your account
3. Complete the verification process

### 1.2 Get API Keys
1. In Stripe Dashboard, go to "Developers" → "API keys"
2. You'll see two test keys:
   - **Publishable key** (starts with `pk_test_`) → This goes in NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
   - **Secret key** (starts with `sk_test_`) → This goes in STRIPE_SECRET_KEY

## Step 2: Configure Webhook (For Local Development)

### 2.1 Install Stripe CLI (Optional for local testing)
```bash
# On macOS
brew install stripe/stripe-cli/stripe

# Login to your Stripe account
stripe login
```

### 2.2 Create Webhook Endpoint
1. In Stripe Dashboard, go to "Developers" → "Webhooks"
2. Click "Add endpoint"
3. For now, use: `https://your-production-domain.com/api/stripe/webhook`
4. Select events: `checkout.session.completed`
5. Click "Add endpoint"
6. Copy the "Signing secret" (starts with `whsec_`) → This goes in STRIPE_WEBHOOK_SECRET

### 2.3 For Local Testing
If you want to test webhooks locally:
```bash
# Forward webhooks to your local server
stripe listen --forward-to localhost:3001/api/stripe/webhook

# This will give you a webhook secret starting with whsec_
# Use this in your .env.local for testing
```

## Step 3: Update Environment Variables

Edit your `.env.local` file:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_51ABC...your_actual_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51ABC...your_actual_publishable_key  
STRIPE_WEBHOOK_SECRET=whsec_1ABC...your_actual_webhook_secret
```

## Step 4: Test Payment Flow

### 4.1 Test Credit Cards
Stripe provides test cards for development:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Requires 3D Secure**: `4000 0027 6000 3184`

Use any future date for expiry and any 3-digit CVC.

### 4.2 Test the Booking Flow
1. Go to `http://localhost:3001/booking`
2. Complete all steps
3. Use test card `4242 4242 4242 4242`
4. Check your Google Sheet for the booking data
5. Verify in Stripe Dashboard under "Payments"

## Step 5: Production Setup

### 5.1 When Ready for Live Payments
1. Complete Stripe account verification
2. Replace test keys with live keys (starting with `pk_live_` and `sk_live_`)
3. Update webhook endpoint to your production domain
4. Test thoroughly with small amounts first

### 5.2 Security Notes
- ✅ Never expose secret keys in client-side code
- ✅ Always validate webhooks with signing secrets
- ✅ Use HTTPS in production
- ✅ Keep environment variables secure

## Webhook Events Handled

Your system handles these Stripe events:
- `checkout.session.completed` → Updates booking to "confirmed" and payment to "paid"

## Troubleshooting

### Common Issues:
1. **Webhook failures**: Check endpoint URL is accessible
2. **Invalid signature**: Verify webhook secret matches
3. **Test card declined**: Use `4242 4242 4242 4242`
4. **Keys not working**: Ensure you're using test keys for development

Your Stripe integration will be ready! 💳✨