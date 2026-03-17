# Portfolio Website

A modern, fully-featured portfolio website built with Next.js 15, featuring glassmorphism design, dark/light mode, and dynamic content management.

## Features

- ✨ Modern glassmorphism UI with Apple-inspired design
- 🌓 Dark/light mode toggle
- 🎨 Smooth animations with Framer Motion
- 📱 Fully responsive design
- 📝 Blog with MDX support
- 📧 Contact form with email integration (Resend)
- 🎯 File-based content management (JSON)
- 🚀 Optimized for Vercel deployment

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **Theme:** next-themes
- **Email:** Resend
- **Blog:** MDX with syntax highlighting

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Customization

### Personal Information

Update the following files with your information:

1. **Homepage Hero Section** - `components/sections/HeroSection.tsx`
   - Replace "Your Name" with your actual name
   - Update social media links

2. **Data Files** - `data/` directory
   - `projects.json` - Your projects
   - `experience.json` - Work experience
   - `education.json` - Educational background
   - `certifications.json` - Professional certifications
   - `testimonials.json` - Client/colleague testimonials
   - `social.json` - Social media links

3. **About Page** - `app/about/page.tsx`
   - Update your bio and description

4. **Resume** - `public/resume.pdf`
   - Replace with your actual resume PDF

### Project Images

Add project images to `public/images/projects/` and update the `imageUrl` in `data/projects.json`.

### Blog Posts

Create new blog posts in `content/blog/`:

```mdx
---
title: "Your Post Title"
description: "Brief description"
date: "2024-12-30"
author: "Your Name"
tags: ["Tag1", "Tag2"]
---

# Your Content Here
```

### Environment Variables

Create `.env.local` file:

```
RESEND_API_KEY=your_resend_api_key_here
```

## Project Structure

```
portfolio_website/
├── app/                      # Next.js app directory
│   ├── about/               # About page
│   ├── blog/                # Blog pages
│   ├── contact/             # Contact page
│   ├── education/           # Education page
│   ├── experience/          # Experience page
│   ├── projects/            # Projects pages
│   ├── api/                 # API routes
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── components/              # React components
│   ├── layout/             # Header, Footer
│   ├── sections/           # Page sections
│   └── ui/                 # shadcn components
├── content/                 # Content files
│   └── blog/               # MDX blog posts
├── data/                    # JSON data files
├── lib/                     # Utility functions
├── public/                  # Static assets
│   └── images/             # Images
├── types/                   # TypeScript types
└── README.md
```

## Deployment

### Deploy to Vercel

### Deploy to Vercel

1. Push your code to GitHub

2. Connect your repository to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables:
     - Add `RESEND_API_KEY`

3. Deploy!

Vercel will automatically:
- Build your Next.js application
- Set up custom domain (optional)
- Enable automatic deployments on git push

## Email Setup (Resend)

1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Add to `.env.local` and Vercel environment variables
4. Update the "from" email in `app/api/send-email/route.ts` with your verified domain

## License

MIT License - feel free to use this template for your own portfolio!

---

Built with ❤️ using Next.js and TypeScript

