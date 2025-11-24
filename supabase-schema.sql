-- Create members table
CREATE TABLE IF NOT EXISTS members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  graduation_year TEXT NOT NULL,
  phone TEXT,
  birthday DATE,
  birthday_display TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on graduation_year for faster filtering
CREATE INDEX IF NOT EXISTS idx_members_grad_year ON members(graduation_year);

-- Create index on birthday for birthday queries
CREATE INDEX IF NOT EXISTS idx_members_birthday ON members(birthday) WHERE birthday IS NOT NULL;

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to call the function
CREATE TRIGGER update_members_updated_at BEFORE UPDATE ON members
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (since we don't have auth)
-- In production, you might want to restrict this
CREATE POLICY "Enable all access for members" ON members
FOR ALL
USING (true)
WITH CHECK (true);

