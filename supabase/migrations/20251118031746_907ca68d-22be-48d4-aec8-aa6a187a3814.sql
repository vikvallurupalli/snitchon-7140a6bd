-- Create fake_news_entries table
CREATE TABLE public.fake_news_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  topic_or_person TEXT NOT NULL,
  short_description TEXT NOT NULL,
  url TEXT NOT NULL,
  details TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.fake_news_entries ENABLE ROW LEVEL SECURITY;

-- Create policies for fake_news_entries
-- Everyone can view entries (public read)
CREATE POLICY "Anyone can view fake news entries"
ON public.fake_news_entries
FOR SELECT
USING (true);

-- Users can create their own entries
CREATE POLICY "Users can create their own entries"
ON public.fake_news_entries
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own entries
CREATE POLICY "Users can update their own entries"
ON public.fake_news_entries
FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own entries
CREATE POLICY "Users can delete their own entries"
ON public.fake_news_entries
FOR DELETE
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_fake_news_entries_updated_at
BEFORE UPDATE ON public.fake_news_entries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();