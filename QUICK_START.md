# Quick Start Guide - The Luxury House Website

## 🚀 Ready to Publish! Here's Your Checklist

### 1️⃣ Push to GitHub (5 minutes)

```bash
cd "/Users/vasukarri/Desktop/Saas & AI projects/4. The Haven website codebase/the-haven-website"

# If you have GitHub CLI installed:
gh repo create the-luxury-house-website --public --source=. --remote=origin --push

# OR manually:
# 1. Create repo at https://github.com/new (name: the-luxury-house-website)
# 2. Then run:
git remote add origin https://github.com/YOUR_USERNAME/the-luxury-house-website.git
git push -u origin main
```

### 2️⃣ Set Up Email Service (10 minutes)

1. **Sign up at Resend**: https://resend.com
2. **Create API Key**:
   - Go to API Keys → Create API Key
   - Copy the key (starts with `re_`)
   - Save it securely!
3. **Verify Domain** (optional but recommended):
   - Go to Domains → Add Domain
   - Add DNS records they provide
   - Wait for verification

### 3️⃣ Deploy to Netlify (15 minutes)

1. **Sign up at Netlify**: https://netlify.com
   - Use your GitHub account

2. **Create New Site**:
   - Add new site → Import from GitHub
   - Select `the-luxury-house-website`
   - Build settings:
     ```
     Build command: npm run build
     Publish directory: .next
     ```

3. **Add Environment Variables** (BEFORE deploying):
   ```
   RESEND_API_KEY = re_xxxxx (from step 2)
   NEXT_PUBLIC_CONTACT_EMAIL = theluxuryhouseuk@gmail.com
   NEXT_PUBLIC_SITE_URL = https://your-site.netlify.app
   NODE_VERSION = 18
   ```

4. **Click Deploy!**

5. **Get your live URL**: `https://random-name.netlify.app`

### 4️⃣ Test Everything (5 minutes)

✅ Visit your live site  
✅ Submit a test contact form inquiry  
✅ Check email arrived at theluxuryhouseuk@gmail.com  
✅ Test mobile menu  
✅ Test gallery filtering  
✅ Try pool villa validation (max 3 guests)

---

## 📧 Email Setup Details

**What emails get sent:**
1. **To you** (theluxuryhouseuk@gmail.com):
   - Customer name, email, phone
   - Booking dates and accommodation type
   - Number of guests

2. **To customer** (auto-confirmation):
   - Thank you message
   - Summary of their inquiry
   - Your contact email

**Email provider:** Resend
- **Free tier:** 100 emails/day (plenty for inquiries!)
- **Paid tier:** $20/month for 50,000 emails/day

---

## 🌐 Custom Domain Setup (Optional)

After Netlify deployment:

1. **In Netlify**: Site settings → Domain management → Add custom domain
2. **At your domain registrar**, add DNS records:
   ```
   Type: A, Name: @, Value: 75.2.60.5
   Type: CNAME, Name: www, Value: your-site.netlify.app
   ```
3. **Wait** for DNS propagation (5-30 minutes)
4. **Update** environment variable in Netlify:
   ```
   NEXT_PUBLIC_SITE_URL = https://www.theluxuryhouse.uk
   ```
5. **Redeploy** the site

---

## 💰 Monthly Costs

| Service | Cost |
|---------|------|
| Netlify (hosting) | FREE |
| Resend (email) | FREE (100/day) |
| Domain name | ~$1/month |
| **TOTAL** | **~$1/month** |

---

## 🔄 Making Updates

After initial deployment, any changes are automatic:

```bash
# Edit files as needed
git add .
git commit -m "Update content"
git push
```

Netlify auto-deploys in ~2 minutes! ✨

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `DEPLOYMENT.md` | Full deployment guide with troubleshooting |
| `.env.example` | Template for environment variables |
| `src/app/api/contact/route.ts` | Email sending logic |
| `src/components/layout/ReserveStaySection.tsx` | Contact form |
| `src/lib/images.ts` | Gallery images configuration |

---

## 🆘 Need Help?

**Build fails?**
- Check Netlify deploy logs
- Verify all environment variables are set
- Make sure NODE_VERSION = 18

**Emails not sending?**
- Check RESEND_API_KEY in Netlify
- Verify domain in Resend dashboard
- Check Netlify function logs

**For full troubleshooting guide**, see `DEPLOYMENT.md`

---

## ✅ Final Checklist

- [ ] Code pushed to GitHub
- [ ] Resend account created and API key saved
- [ ] Site deployed on Netlify
- [ ] Environment variables configured
- [ ] Test email sent successfully
- [ ] Website tested on mobile and desktop
- [ ] Custom domain connected (optional)
- [ ] SSL certificate active (auto in Netlify)

---

**🎉 You're ready to go live!**

Questions? Check `DEPLOYMENT.md` for detailed instructions.
