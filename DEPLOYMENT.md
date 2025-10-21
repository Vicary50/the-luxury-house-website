# The Luxury House - Deployment Guide

This guide will help you deploy The Luxury House website to production.

## Prerequisites

- GitHub account
- Netlify account (free tier is sufficient)
- Resend account for email (free tier: 100 emails/day)
- Optional: Google account for Google Sheets integration

---

## Step 1: Push to GitHub

### Option A: Using GitHub Web Interface

1. Go to https://github.com/new
2. Create a new repository:
   - Repository name: `the-luxury-house-website`
   - Visibility: Public or Private (your choice)
   - **Do NOT** initialize with README, .gitignore, or license
3. Copy the repository URL (e.g., `https://github.com/YOUR_USERNAME/the-luxury-house-website.git`)
4. Open Terminal and run:

```bash
cd "/Users/vasukarri/Desktop/Saas & AI projects/4. The Haven website codebase/the-haven-website"
git remote add origin https://github.com/YOUR_USERNAME/the-luxury-house-website.git
git branch -M main
git push -u origin main
```

### Option B: Using GitHub CLI (if installed)

```bash
cd "/Users/vasukarri/Desktop/Saas & AI projects/4. The Haven website codebase/the-haven-website"
gh repo create the-luxury-house-website --public --source=. --remote=origin --push
```

---

## Step 2: Set Up Email Service (Resend)

1. Go to https://resend.com and sign up for a free account
2. Verify your email address
3. Go to **API Keys** section
4. Click **Create API Key**
5. Give it a name (e.g., "The Luxury House Production")
6. Copy the API key (starts with `re_`) - **you'll only see this once!**
7. Save it securely - you'll need it for Netlify

### Verify Your Domain (Important!)

To send emails from your own domain:

1. Go to **Domains** in Resend dashboard
2. Click **Add Domain**
3. Enter your domain (e.g., `www.theluxuryhouse.uk`)
4. Follow the instructions to add DNS records
5. Wait for verification (usually takes a few minutes)

**Until domain is verified**, emails will be sent from `onboarding@resend.dev`

After verification, update the email sender in:
- `src/app/api/contact/route.ts` (line 37 and 67)
- Change `noreply@www.theluxuryhouse.uk` to your actual domain

---

## Step 3: Deploy to Netlify

### 3.1 Create Netlify Account

1. Go to https://netlify.com
2. Sign up with your GitHub account (recommended)
3. Authorize Netlify to access your GitHub repositories

### 3.2 Deploy Website

1. Click **Add new site** → **Import an existing project**
2. Choose **GitHub**
3. Search for and select `the-luxury-house-website`
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Base directory**: (leave empty)
5. Click **Show advanced** → **New variable** and add:

```
NODE_VERSION = 18
```

6. **DO NOT** click Deploy yet! First, add environment variables.

### 3.3 Add Environment Variables

Still on the deployment configuration page, add these environment variables:

#### Required:
```
RESEND_API_KEY = re_your_api_key_from_resend
NEXT_PUBLIC_CONTACT_EMAIL = theluxuryhouseuk@gmail.com
NEXT_PUBLIC_SITE_URL = https://YOUR_SITE.netlify.app
```

#### Optional:
```
```

7. Click **Deploy site**

### 3.4 Wait for Deployment

- First deployment takes 2-5 minutes
- Watch the deploy logs for any errors
- Once complete, you'll get a URL like `https://random-name-123.netlify.app`

---

## Step 4: Configure Custom Domain (Optional)

### 4.1 In Netlify:

1. Go to **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Enter your domain (e.g., `www.theluxuryhouse.uk`)
4. Netlify will provide DNS instructions

### 4.2 Update DNS Records:

Add these records at your domain registrar:

**For root domain (www.theluxuryhouse.uk):**
```
Type: A
Name: @
Value: 75.2.60.5
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: YOUR_SITE.netlify.app
```

### 4.3 Enable HTTPS:

1. In Netlify, go to **Site settings** → **Domain management**
2. Wait for SSL certificate (automatic, takes 1-2 minutes)
3. Enable **Force HTTPS**

### 4.4 Update Environment Variables:

In Netlify **Site settings** → **Environment variables**, update:
```
NEXT_PUBLIC_SITE_URL = https://www.theluxuryhouse.uk
```

Then redeploy:
1. Go to **Deploys**
2. Click **Trigger deploy** → **Deploy site**

---

## Step 5: Test Everything

### Test Contact Form:
1. Go to your live site
2. Fill out the contact form
3. Submit an inquiry
4. Check if you receive:
   - Email notification to theluxuryhouseuk@gmail.com
   - Confirmation email to the customer's email

### Test Navigation:
- Smooth scrolling to sections
- Gallery filtering
- Blog posts and categories
- Mobile menu functionality

### Test Pool Villa Validation:
1. Select "Pool Villa & Heated Swimming Pool"
2. Try entering more than 3 adults (should be blocked)
3. Enter 3 adults - children field should disable
4. Verify pricing calculations are correct

---

## Step 6: Set Up Automatic Deployments

Netlify automatically deploys when you push to GitHub!

To make a change:
```bash
# Make your changes
git add .
git commit -m "Your change description"
git push
```

Netlify will automatically:
1. Detect the push
2. Build the site
3. Deploy the new version
4. Keep the old version as backup

---

## Troubleshooting

### Email Not Sending:
- Check RESEND_API_KEY is correct in Netlify environment variables
- Verify domain in Resend dashboard
- Check Netlify function logs: **Site settings** → **Functions** → **View logs**

### Build Fails:
- Check build logs in Netlify
- Verify all environment variables are set
- Make sure NODE_VERSION is set to 18

### Images Not Loading:
- Images are in the repository, so they should work
- Check browser console for 404 errors
- Verify image paths in `src/lib/images.ts`

### 404 on Pages:
- Next.js is configured for Netlify automatically
- If issues persist, add `netlify.toml`:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Monitoring & Analytics

### Add Google Analytics (Optional):

1. Get your GA4 Measurement ID
2. Add to Netlify environment variables:
```
NEXT_PUBLIC_GA_MEASUREMENT_ID = G-XXXXXXXXXX
```
3. Redeploy the site

### Netlify Analytics:

- Go to **Analytics** in Netlify dashboard
- Enable Netlify Analytics ($9/month, optional)
- Get server-side analytics without JavaScript

---

## Maintenance

### Update Content:

1. Edit files locally
2. Commit and push:
```bash
git add .
git commit -m "Update content"
git push
```
3. Netlify auto-deploys in ~2 minutes

### Add Blog Posts:

1. Edit `src/lib/blog/blogData.ts`
2. Add images to `public/images/blog/`
3. Commit and push

### Update Pricing:

1. Edit pricing logic in `src/components/layout/ReserveStaySection.tsx`
2. Test locally with `npm run dev`
3. Commit and push when satisfied

---

## Support

If you encounter issues:

1. **Check Netlify Deploy Logs**: Shows build errors
2. **Check Netlify Function Logs**: Shows runtime errors (email, API calls)
3. **Browser Console**: Shows client-side errors
4. **Resend Logs**: Shows email delivery status

---

## Cost Breakdown

| Service | Plan | Cost |
|---------|------|------|
| Netlify Hosting | Free | $0/month |
| Resend Email | Free (100/day) | $0/month |
| Custom Domain | Varies by registrar | ~$12/year |
| **Total** | | **~$1/month** |

Upgrade options:
- Netlify Pro ($19/month): Analytics, forms, better performance
- Resend Pro ($20/month): 50,000 emails/month

---

## Next Steps After Deployment

1. ✅ Test all functionality
2. ✅ Set up Google Analytics (optional)
3. ✅ Submit sitemap to Google Search Console: `https://your-domain.com/sitemap.xml`
4. ✅ Monitor emails in Resend dashboard
5. ✅ Update social media profiles with live URL
6. ✅ Create robots.txt rules if needed

---

**Website deployed! 🎉**

Your live URL: https://YOUR_SITE.netlify.app
(or https://www.theluxuryhouse.uk after domain setup)
