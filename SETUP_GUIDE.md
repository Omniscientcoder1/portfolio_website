# Portfolio Website Setup Guide

## Quick Start

1. **Start Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

2. **Customize Your Content**
   - Edit files in `data/` folder with your information
   - Replace `public/resume.pdf` with your resume
   - Add project images to `public/images/projects/`

3. **Set Up Email (Optional)**
   - Sign up at [resend.com](https://resend.com)
   - Create `.env.local` and add: `RESEND_API_KEY=your_key`

4. **Deploy to Vercel**
   - Push to GitHub
   - Import repo on [vercel.com](https://vercel.com)
   - Add `RESEND_API_KEY` environment variable
   - Deploy!

## Customization Checklist

### Required Changes
- [ ] Update name in `components/sections/HeroSection.tsx`
- [ ] Fill in `data/projects.json` with your projects
- [ ] Fill in `data/experience.json` with your work history
- [ ] Fill in `data/education.json` with your degrees
- [ ] Fill in `data/certifications.json` with certifications
- [ ] Update `data/social.json` with your social links
- [ ] Replace `public/resume.pdf` with your actual resume

### Optional Changes
- [ ] Update About page bio in `app/about/page.tsx`
- [ ] Add testimonials in `data/testimonials.json`
- [ ] Write blog posts in `content/blog/`
- [ ] Add project images to `public/images/projects/`
- [ ] Customize colors in `app/globals.css`

## Data File Examples

### projects.json
```json
{
  "id": "1",
  "title": "Project Name",
  "description": "Short description",
  "longDescription": "Detailed description for project page",
  "techStack": ["Next.js", "TypeScript"],
  "githubLink": "https://github.com/...",
  "liveLink": "https://...",
  "imageUrl": "/images/projects/project.jpg",
  "featured": true,
  "slug": "project-name"
}
```

### experience.json
```json
{
  "id": "1",
  "company": "Company Name",
  "role": "Your Role",
  "duration": "Jan 2020 - Present",
  "startDate": "2020-01",
  "endDate": "Present",
  "responsibilities": ["Responsibility 1", "Responsibility 2"],
  "achievements": ["Achievement 1", "Achievement 2"]
}
```

## Email Configuration

1. Sign up at [resend.com](https://resend.com)
2. Get API key from dashboard
3. Create `.env.local`:
   ```
   RESEND_API_KEY=re_your_api_key_here
   ```
4. For production, verify your domain in Resend
5. Update `from` email in `app/api/send-email/route.ts`

## Deployment on Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Add environment variables:
     - `RESEND_API_KEY`: Your Resend API key
   - Click "Deploy"

3. **Post-Deployment**
   - Set up custom domain (optional)
   - Test contact form
   - Check all pages load correctly

## Project Structure

```
├── app/                    # App Router pages
│   ├── about/             # About page
│   ├── blog/              # Blog pages
│   ├── contact/           # Contact form
│   ├── education/         # Education page
│   ├── experience/        # Experience page
│   ├── projects/          # Projects pages
│   └── api/               # API routes
├── components/            
│   ├── layout/            # Header, Footer
│   ├── sections/          # Page sections
│   └── ui/                # shadcn components
├── content/blog/          # MDX blog posts
├── data/                  # JSON data files
├── public/                
│   ├── images/            # Images
│   └── resume.pdf         # Your resume
└── types/                 # TypeScript types
```

## Features Overview

### Pages
- **Home**: Hero, featured projects, experience preview, testimonials
- **About**: Bio and values
- **Projects**: All projects with individual detail pages
- **Experience**: Timeline-card hybrid layout
- **Education**: Degrees and certifications
- **Blog**: MDX-powered blog
- **Contact**: Form with email integration

### Design Features
- Glassmorphism UI
- Dark/light mode toggle
- Smooth Framer Motion animations
- Responsive design
- Apple-inspired colors

### Technical Features
- Next.js 15 App Router
- TypeScript
- File-based content (JSON)
- MDX blog
- Email contact form
- SEO optimized

## Troubleshooting

### Development server won't start
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Email not sending
- Check RESEND_API_KEY in .env.local
- Verify API key is valid
- Check Resend dashboard for errors

### Images not loading
- Ensure images are in `public/` directory
- Use paths like `/images/project.jpg`
- Check file extensions match

## Support

For issues or questions:
1. Check the README.md
2. Review Next.js documentation
3. Check component source code
4. Create GitHub issue

## License

MIT - Free to use for your portfolio!
