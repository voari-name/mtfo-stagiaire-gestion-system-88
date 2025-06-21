
-- Add photo and gender columns to the interns table
ALTER TABLE public.interns 
ADD COLUMN photo TEXT,
ADD COLUMN gender TEXT;
