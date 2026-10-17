# CLAUDE.md - The Luxury House Website Development Guide

## Project Overview
This is a luxury holiday rental website built with Next.js 15.4.6, TypeScript, and Tailwind CSS. The site features a sophisticated booking system with Google Sheets integration and Stripe payment processing.

## Development Commands
```bash
# Start development server
npm run dev -- -p 3003

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npm run type-check
```

## Key File Locations

### Core Components
- `src/components/layout/Header.tsx` - Main navigation
- `src/components/layout/Footer.tsx` - Site footer
- `src/components/layout/ReserveStaySection.tsx` - Availability checking form
- `src/components/booking/BookingWizard.tsx` - Multi-step booking process

### API Routes
- `src/app/api/availability/route.ts` - Availability checking and form submissions
- `src/app/api/create-payment-intent/route.ts` - Stripe payment processing
- `src/lib/googleSheets.ts` - Google Sheets integration functions

### Page Components
- `src/app/page.tsx` - Homepage
- `src/app/booking/page.tsx` - Booking wizard
- `src/app/activities/page.tsx` - Local activities guide
- `src/app/terms/page.tsx` - Terms and conditions

## Environment Variables Required
```env
# Google Sheets Integration
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-google-sheet-id

# Stripe Payment Processing
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Key Features

### Availability Checking System
- Real-time availability validation against Google Sheets
- Dynamic button states: Submit → Checking diary → Available/Unavailable
- Color-coded feedback (green=available, red=unavailable, blue=checking)
- Graceful error handling for external service failures

### Booking Wizard Flow
1. **Accommodation Selection** - Choose entire property or poolhouse only
2. **Dates & Guests** - Calendar selection with live availability checking
3. **Guest Details** - Contact information and special requirements
4. **Payment** - Stripe-powered deposit processing

### Design System
Redesign live since 2026-10-17. Tokens live in `src/app/globals.css` `@theme`.
- **Colours**: ink #1c1c1a, stone #efebe4, muted #5e5b54, hairline #d9d3c7, ONE accent olive #4b5234 (`text-olive`, `bg-olive`). No orange, pink or amber.
- **Typography**: Cormorant Garamond light display (`font-display`) with an italic second line, Inter body. Tracked uppercase eyebrow labels.
- **Long text**: `.prose-editorial` (blog bodies, legal pages); `.callout` for boxed notes.
- **Shared pieces**: `layout/PageHeader` (inner-page opening band), `layout/Spread` (photo/text spread), `layout/OccasionPage` (occasion landing pages), `layout/ClosingCta`.
- **Motion**: CSS hero load + GSAP ScrollTrigger via `layout/ScrollReveal` (`data-reveal`, `data-reveal-image`; opacity only, off under reduced motion). framer-motion is uninstalled.
- **Buttons**: square (2px radius), olive fill or ink underline link. No pills, no shadows.
- **Responsive**: mobile-first; check 390px and 1440px.

## Common Development Tasks

### Adding New Pages
1. Create page component in `src/app/[page-name]/page.tsx`
2. Add navigation link in `Header.tsx`
3. Update SEO metadata as needed

### Modifying Forms
- Form components use controlled state with TypeScript interfaces
- All forms integrate with Google Sheets via `/api/availability` endpoint
- Validation handled client-side with server-side backup

### Updating Content
- Blog content: `src/lib/blog/blogData.ts`
- Activities data: `src/app/activities/page.tsx`
- Property details: Various component files

### Styling Guidelines
- Use Tailwind utility classes consistently
- Follow mobile-first responsive design
- Maintain consistent spacing with Tailwind's scale (4, 6, 8, 12, etc.)
- Use the design tokens above (ink, stone, muted, hairline, olive); never raw Tailwind palette colours

## Google Sheets Integration

### Setup Requirements
1. Create Google Service Account in Google Cloud Console
2. Generate private key and add to environment variables
3. Share Google Sheet with service account email address
4. Set up sheet with proper column headers (see `googleSheets.ts`)

### Data Flow
- Availability queries check existing bookings in real-time
- Form submissions create new rows marked as "draft" inquiries
- Booking wizard creates confirmed bookings with payment status

## Deployment Checklist
- [ ] Environment variables configured
- [ ] Google Sheets permissions set up
- [ ] Stripe webhooks configured
- [ ] Domain DNS settings updated
- [ ] SSL certificate active
- [ ] Performance testing completed

## Troubleshooting

### Google Sheets Auth Issues
- Verify service account email has sheet access
- Check private key formatting (includes \n characters)
- Ensure Google Sheets API is enabled in Cloud Console

### Form Submission Problems
- Check network tab for API response errors
- Verify required fields are properly validated
- Test with simplified form data

### Styling Issues
- Run `npm run build` to check for Tailwind purging problems
- Verify responsive classes at each breakpoint
- Check for conflicting CSS specificity

## Performance Optimization
- Images use Next.js Image component with optimization
- Components lazy load with React.lazy() where appropriate
- Critical CSS inlined, non-critical styles deferred
- Bundle analyzer: `npx @next/bundle-analyzer`

## Security Considerations
- Environment variables properly secured
- Form inputs validated and sanitized
- Stripe webhooks verified with signatures
- Google Sheets access limited to service account only