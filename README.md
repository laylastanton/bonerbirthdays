# B1 Member Dashboard

A modern, minimal web application for managing the B1 (Boners) living community member directory with birthday tracking.

## Features

- 📋 **Member Directory**: View all community members organized by graduation year
- 🎂 **Birthday Tracking**: See upcoming birthdays within the next 30 days
- 🔍 **Search & Filter**: Quickly find members by name or graduation year
- ✏️ **CRUD Operations**: Add, edit, and delete member information
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI**: Clean, blue-themed design system built with Tailwind CSS

## Tech Stack

- **Frontend**: SvelteKit with TypeScript
- **Backend**: SvelteKit API routes (serverless)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Getting Started

### 1. Clone and Install

```bash
cd b1-dashboard
npm install --force
```

Note: We use `--force` due to Node version compatibility issues with the current setup.

### 2. Set Up Supabase

Follow the detailed instructions in `SUPABASE_SETUP.md`:

1. Create a Supabase project
2. Get your API keys
3. Run the SQL schema from `supabase-schema.sql`
4. Create a `.env` file with your credentials:

```bash
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Migrate Existing Data

If you have existing member data in the CSV file, follow `MIGRATION_GUIDE.md` to import it:

```bash
cd scripts
npm install
npm run migrate
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see the application.

## Project Structure

```
b1-dashboard/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── ui/              # Design system components
│   │   │   │   ├── Button.svelte
│   │   │   │   ├── Input.svelte
│   │   │   │   ├── Card.svelte
│   │   │   │   ├── Badge.svelte
│   │   │   │   └── Modal.svelte
│   │   │   ├── MemberCard.svelte
│   │   │   ├── MemberList.svelte
│   │   │   ├── MemberForm.svelte
│   │   │   ├── SearchBar.svelte
│   │   │   ├── GradYearFilter.svelte
│   │   │   └── BirthdayWidget.svelte
│   │   ├── utils/
│   │   │   ├── birthday.ts     # Birthday parsing and calculations
│   │   │   └── phone.ts        # Phone number formatting
│   │   ├── supabase.ts         # Supabase client
│   │   └── types.ts            # TypeScript types
│   ├── routes/
│   │   ├── api/
│   │   │   └── members/        # API endpoints
│   │   └── +page.svelte        # Main dashboard
│   └── app.css                 # Tailwind imports
├── scripts/
│   └── migrate-data.ts         # Data migration script
├── supabase-schema.sql         # Database schema
├── SUPABASE_SETUP.md          # Supabase setup guide
└── MIGRATION_GUIDE.md         # Data migration guide
```

## Deployment to Vercel

### Prerequisites

- GitHub account
- Vercel account (free tier is sufficient)
- Supabase project with data

### Deployment Steps

1. **Push to GitHub**:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-github-repo-url
git push -u origin main
```

2. **Connect to Vercel**:

   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect SvelteKit

3. **Configure Environment Variables**:

   In Vercel project settings, add:
   - `PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key

4. **Deploy**:

   - Click "Deploy"
   - Vercel will build and deploy your app
   - You'll get a live URL (e.g., `your-project.vercel.app`)

5. **Subsequent Deploys**:

   Every push to your main branch will automatically trigger a new deployment.

## Design System

The app uses a cohesive design system for easy maintenance:

### Colors

- **Primary**: Blue (`#3B82F6` / `blue-600`)
- **Background**: `gray-50`
- **Cards**: White with subtle shadows
- **Text**: `gray-900` for headings, `gray-600` for body

### Components

All UI components are in `src/lib/components/ui/` and support consistent props:

- `Button`: Multiple variants (primary, secondary, ghost, danger)
- `Input`: Built-in label, error, and helper text support
- `Card`: Configurable padding and hover states
- `Badge`: Color variants for different contexts
- `Modal`: Accessible dialog with backdrop

## API Endpoints

- `GET /api/members` - List all members (optional `?gradYear=25s` filter)
- `POST /api/members` - Create new member
- `GET /api/members/[id]` - Get single member
- `PUT /api/members/[id]` - Update member
- `DELETE /api/members/[id]` - Delete member
- `GET /api/members/birthdays` - Get upcoming birthdays (optional `?days=30`)

## Development

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Type Checking

```bash
npm run check
```

## Contributing

When adding new features:

1. Follow the existing component structure
2. Use TypeScript for type safety
3. Maintain the design system consistency
4. Test on both desktop and mobile viewports

## License

Private project for B1 community use.
