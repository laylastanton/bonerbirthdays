# Data Migration Guide

This guide explains how to migrate existing member data from the CSV file to your Supabase database.

## Prerequisites

1. Complete the Supabase setup (see `SUPABASE_SETUP.md`)
2. Create a `.env` file in the project root with your Supabase credentials:
   ```
   PUBLIC_SUPABASE_URL=your_project_url
   PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

## Migration Steps

### 1. Install Migration Script Dependencies

```bash
cd scripts
npm install
```

### 2. Run the Migration Script

```bash
cd scripts
npm run migrate
```

The script will:
- Read the CSV file from the parent directory
- Parse members from graduation years 25s and above (25s, 26s, 27s, 28s, 29s, gra)
- Transform the data to match the Supabase schema
- Insert all members into the database

### 3. Verify the Migration

1. Open your Supabase dashboard
2. Go to the Table Editor
3. Select the `members` table
4. Verify that the data has been imported correctly

### What Gets Migrated

- **Name**: Member's full name
- **Graduation Year**: 25s, 26s, 27s, 28s, 29s, or gra
- **Phone**: Phone number (if available)
- **Birthday**: Parsed from various formats and stored as ISO date
- **Birthday Display**: Formatted as "Jan 12" for display purposes

### Notes

- The script will skip empty rows and invalid data
- Birthdays are parsed from formats like "Jan 12, 2005", "January 12", etc.
- If a birthday cannot be parsed, it will be stored as null
- Phone numbers are stored as-is from the CSV
- You can run the migration multiple times (duplicate entries may be created)

### Troubleshooting

If you encounter errors:

1. **Authentication Error**: Double-check your `.env` file has correct Supabase credentials
2. **Table Not Found**: Make sure you've run the SQL schema from `supabase-schema.sql`
3. **Permission Denied**: Ensure RLS policies allow inserting data (see schema file)

### Clean Up (Optional)

If you need to reset the database and start over:

```sql
-- Run this in Supabase SQL Editor
DELETE FROM members;
```

Then run the migration script again.

