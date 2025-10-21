# The Luxury House Website

A beautiful, modern website for The Luxury House holiday rental property in East Yorkshire.

## Features

- 🏠 **Accommodation Options**: Main house and pool villa display
- 📧 **Contact Form**: Instant email notifications with pricing calculator
- 🖼️ **Photo Gallery**: Categorized images with smooth filtering
- 📱 **Mobile Responsive**: Perfect on all devices
- ⚡ **Fast & SEO Optimized**: Built with Next.js 15
- 🎨 **Beautiful Design**: Modern, elegant interface

## Tech Stack

- **Framework**: Next.js 15.4.6 with React 19
- **Styling**: Tailwind CSS
- **Email**: Resend API
- **Deployment**: Netlify
- **Analytics**: Google Analytics (optional)

## Quick Deploy

### 1. Push to GitHub
```bash
cd "/Users/vasukarri/Desktop/Saas & AI projects/4. The Haven website codebase/the-haven-website"
git remote add origin https://github.com/YOUR_USERNAME/the-luxury-house-website.git
git push -u origin main
```

### 2. Set up Resend (Email)
1. Sign up at https://resend.com
2. Create API key
3. Save the key (starts with `re_`)

### 3. Deploy to Netlify
1. Go to https://netlify.com
2. Import from GitHub
3. Add environment variables:
   ```
   RESEND_API_KEY=re_your_key_here
   NEXT_PUBLIC_CONTACT_EMAIL=theluxuryhouseuk@gmail.com
   NEXT_PUBLIC_SITE_URL=https://your-site.netlify.app
   NODE_VERSION=18
   ```
4. Deploy!

### Full Instructions
See `DEPLOYMENT.md` for complete step-by-step guide.

## Environment Variables

Required:
- `RESEND_API_KEY` - Your Resend API key for sending emails
- `NEXT_PUBLIC_CONTACT_EMAIL` - Email where inquiries are sent
- `NEXT_PUBLIC_SITE_URL` - Your website URL

Optional:
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics tracking ID

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open http://localhost:3000 in your browser.

## How It Works

### Contact Form
When a visitor submits the form:
1. **Email to you**: Customer details, dates, accommodation type, and pricing
2. **Confirmation email to customer**: Thank you message with inquiry summary
3. All automatic via Resend!

### Pricing Calculator
- Automatically calculates price based on:
  - Accommodation type (Main House or Pool Villa)
  - Number of nights (minimum 2)
  - Number of guests
  - Special pricing rules for each accommodation

### Pool Villa Validation
- Maximum 3 adults
- Children field disables when 3 adults selected
- Enforces adults + children ≤ 3

## Project Structure

```
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── api/               # API routes
│   │   │   └── contact/       # Email sending endpoint
│   │   ├── activities/        # Activities page
│   │   ├── blog/              # Blog posts
│   │   └── page.tsx           # Homepage
│   ├── components/            # React components
│   │   ├── layout/           # Header, Footer, Sections
│   │   ├── gallery/          # Gallery components
│   │   └── blog/             # Blog components
│   ├── lib/                   # Utilities
│   │   ├── images.ts         # Gallery data
│   │   └── blog/             # Blog data
│   └── types/                 # TypeScript types
├── public/
│   └── images/               # All website images
└── DEPLOYMENT.md             # Detailed deployment guide
```

## Contact

For questions or support:
- **Email**: theluxuryhouseuk@gmail.com
- **Instagram**: [@theluxuryhouseuk](https://www.instagram.com/theluxuryhouseuk/)
- **Facebook**: [The Luxury House](https://www.facebook.com/p/The-Luxury-House-61558062093628/)

## License

Private project for The Luxury House.

---

Built with ❤️ using Next.js and Claude Code
