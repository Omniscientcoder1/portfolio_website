# Portfolio Website - Workspace Instructions

A modern Next.js 15 portfolio website with glassmorphism design, dark/light themes, and MDX blog support.

## Code Style

**TypeScript Strict Mode:**
- All code uses TypeScript with strict mode enabled
- Centralized types in [types/index.ts](types/index.ts)
- Use explicit interface definitions for all data structures

**Component Patterns:**
- Mark interactive components with `"use client"` directive (hooks, events, animations, theme access)
- Server components by default (no directive needed)
- Use `cn()` utility from [lib/utils.ts](lib/utils.ts) for conditional class composition
- Follow shadcn/ui component structure with composition pattern (Card, CardHeader, CardContent)

**Styling:**
- Use Tailwind CSS utility classes exclusively
- Apply `.glass` for subtle glassmorphism, `.glass-strong` for prominent elements
- Responsive breakpoints: `md:`, `lg:` for grid layouts
- CSS variables defined in [globals.css](app/globals.css) for theme colors

## Architecture

**App Router Structure:**
- Pages in `app/` directory with `page.tsx` files
- Dynamic routes use `[slug]` pattern with `generateStaticParams()`
- Shared layout: [app/layout.tsx](app/layout.tsx) with Header/Footer wrapper
- Theme provider: [app/providers.tsx](app/providers.tsx) wraps entire app

**Data Management:**
- JSON files in `data/` directory imported directly (projects, experience, education, certifications, testimonials, social)
- Blog posts as MDX files in `content/blog/` with frontmatter
- Blog parser utilities in [lib/mdx.ts](lib/mdx.ts) (`getAllPosts()`, `getPostBySlug()`)
- API routes in `app/api/` for dynamic data (blog listing, email sending)

**Component Organization:**
- `components/ui/` — Base UI components (button, card, input, textarea)
- `components/sections/` — Page sections (HeroSection, FeaturedProjectsSection, etc.)
- `components/layout/` — Layout components (Header, Footer)

## Build and Test

```bash
# Development
npm run dev          # Start at http://localhost:3000

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Conventions

**Animation Pattern:**
Use Framer Motion for scroll-triggered animations:
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: index * 0.1 }}
>
```

**Theme Hydration Guard:**
Components using `useTheme()` must guard against hydration mismatches:
```typescript
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return null;
```

**Data File Structure:**
- Projects require: id, title, description, longDescription, techStack, githubLink, liveLink, imageUrl, featured, slug
- Experience/Education: Follow existing patterns in [types/index.ts](types/index.ts)
- Blog frontmatter: title, description, date, author, tags, coverImage (optional)

**Client-Side Data Fetching:**
For dynamic content that can't be statically generated, use `useEffect` + `fetch` pattern:
```typescript
const [data, setData] = useState([]);
useEffect(() => {
  fetch("/api/blog")
    .then(res => res.json())
    .then(data => setData(data));
}, []);
```

## Important Notes

**Environment Variables:**
- `RESEND_API_KEY` required for contact form functionality
- Set in `.env.local` for development
- Configure in Vercel dashboard for production

**Deployment:**
- Optimized for Vercel deployment
- Static generation for projects/blog pages via `generateStaticParams()`
- Update hardcoded email in [app/api/send-email/route.ts](app/api/send-email/route.ts) when deploying

**Common Pitfalls:**
- Don't use theme-dependent rendering without mounted guard (causes hydration errors)
- JSON data files are bundled at build time, not runtime-editable
- Image paths in JSON must match actual files in `public/images/projects/`
- Blog MDX files must include all required frontmatter fields

## Content Updates

**Adding Projects:**
1. Add project object to [data/projects.json](data/projects.json)
2. Add project image to `public/images/projects/`
3. Set `featured: true` for homepage display

**Writing Blog Posts:**
1. Create `.mdx` file in `content/blog/`
2. Include frontmatter with title, description, date, author, tags
3. Use markdown with syntax highlighting support (rehype-highlight)
4. Reading time calculated automatically (200 words/min)

**Updating Experience/Education:**
Edit JSON files directly in [data/](data/) directory

For detailed setup instructions, see [SETUP_GUIDE.md](SETUP_GUIDE.md).
