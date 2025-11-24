# Quick Start Guide

Get your B1 Dashboard up and running in 5 minutes!

## Step 1: Install Dependencies

```bash
cd b1-dashboard
npm install --force
```

## Step 2: Set Up Supabase

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Save your project URL and anon key

2. **Run Database Schema**
   - In Supabase dashboard → SQL Editor
   - Open `supabase-schema.sql` from this project
   - Copy/paste and run the SQL

3. **Create `.env` File**
   ```bash
   PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## Step 3: Migrate Data

```bash
cd scripts
npm install
npm run migrate
cd ..
```

This imports all members from the CSV file (graduation years 25s and above).

## Step 4: Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Step 5: Deploy to Vercel (Optional)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

Quick version:
1. Push code to GitHub
2. Connect repo to Vercel
3. Add environment variables in Vercel
4. Deploy!

## What's Next?

- **Add Members**: Click "Add Member" button to add new members
- **Edit Members**: Click any member card to edit their info
- **Search**: Use the search bar to find specific members
- **Filter**: Filter by graduation year using the year buttons
- **Birthdays**: Upcoming birthdays appear at the top of the dashboard

## Need Help?

- **Supabase Setup**: See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
- **Data Migration**: See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)
- **Deployment**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Full Documentation**: See [README.md](./README.md)

## Troubleshooting

### npm install fails
Use `npm install --force` to bypass Node version compatibility checks.

### Can't connect to Supabase
- Check `.env` file exists and has correct values
- Verify Supabase project is active
- Ensure database schema was run successfully

### No members showing
- Run the migration script to import data
- Or manually add members through the "Add Member" button

### Build fails
```bash
npm run check  # Check for TypeScript errors
npm run build  # Build for production
```

Enjoy your B1 Dashboard! 🎉

