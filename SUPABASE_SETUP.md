# Supabase Setup Guide

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in:
   - Project name: `b1-dashboard` (or any name you prefer)
   - Database password: Choose a strong password
   - Region: Choose the closest region
4. Wait for the project to be created (takes ~2 minutes)

## 2. Get Your API Keys

1. In your Supabase project dashboard, click on the "Project Settings" icon (gear icon)
2. Click on "API" in the left sidebar
3. Copy the following:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

## 3. Create Environment Variables

Create a `.env` file in the project root with:

```
PUBLIC_SUPABASE_URL=your_project_url_here
PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## 4. Create the Database Schema

1. In Supabase dashboard, click on "SQL Editor" in the left sidebar
2. Click "New Query"
3. Copy and paste the SQL from `supabase-schema.sql` (will be created)
4. Click "Run" to execute the query

The schema includes:
- `members` table with all necessary fields
- Automatic timestamp management
- Indexes for performance

## 5. Verify Setup

After running the migration script, you should see the `members` table populated with B1 member data (grad years 25s and above).

