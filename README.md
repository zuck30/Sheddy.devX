# Sheddy.dev - Modern Personal Blog

A production-ready personal tech blog built with React, TypeScript, Tailwind CSS, and Supabase. Features a glassmorphism UI aesthetic, full mobile responsiveness, and a Reddit-style feed.

## Tech Stack
- **Frontend**: React (Vite), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **State Management**: Zustand
- **Routing**: React Router DOM v6
- **Deployment**: Netlify

## Features
- **Public Blog**: List posts, filter by tags, search, markdown rendering with syntax highlighting.
- **Interactive Elements**: Like button (rate-limited), view counter (session-based), reading time estimation.
- **Admin Dashboard**: Secure /admin route to create, edit, and delete posts.
- **Glassmorphism**: Beautiful frosted glass effects in both light and dark modes.
- **Responsive**: Fully mobile-first design.

## Setup Instructions

### 1. Supabase Setup
Create a new project in [Supabase](https://supabase.com/).

**Storage Setup:**
- Go to "Storage" in the Supabase dashboard.
- Create a new bucket named `post-images`.
- Make it "Public" or set up appropriate RLS policies for uploads.

**Database Setup:**
Run the following SQL in the SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Posts table
CREATE TABLE posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  tags TEXT[] DEFAULT '{}',
  views INTEGER DEFAULT 0,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_posts_published ON posts(published);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_tags ON posts USING GIN(tags);

-- Profile table (for resume and social)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  resume_url TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  email TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Helper functions for incrementing views/likes
CREATE OR REPLACE FUNCTION increment_views(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE posts SET views = views + 1 WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION upvote_post(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE posts SET upvotes = upvotes + 1 WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION downvote_post(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE posts SET downvotes = downvotes + 1 WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published posts" ON posts FOR SELECT USING (published = true);
CREATE POLICY "Public can view profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Admin can do anything on posts" ON posts FOR ALL USING (auth.jwt() ->> 'email' = 'admin@example.com');
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, email)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url', NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Starter Content
INSERT INTO posts (slug, title, excerpt, content, tags, published, cover_image) VALUES
('modern-architecture-patterns', 'Modern Architecture Patterns for Scale', 'A deep dive into scalable system design and architecture for modern web apps.', '# System Architecture\n\nExploring patterns like micro-frontends, edge computing, and serverless architectures.\n\n```tsx\nconst scale = "limitless";\nconsole.log(scale);\n```', ARRAY['Architecture', 'Engineering'], true, 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'),
('immersive-design-philosophy', 'The Philosophy of Immersive Design', 'Exploring why aesthetics matter and how to create deeper user connections.', '# Design Beyond Visuals\n\nImmersive design is about emotion, flow, and the subtle details that create a sense of presence.\n\n### Key Pillars:\n- Atmospheric Depth\n- Intentional Motion\n- Contextual Awareness', ARRAY['Design', 'Innovation'], true, 'https://images.unsplash.com/photo-1550745165-9bc0b252726f'),
('accelerating-career-growth', 'Strategies for Accelerating Career Growth', 'Actionable insights for moving from senior to staff and beyond.', '# The Growth Mindset\n\nTrue growth happens at the intersection of technical excellence and strategic influence.\n1. Broaden your impact\n2. Master high-leverage skills\n3. Build your personal brand', ARRAY['Strategy', 'Growth'], true, 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4');
```

### 2. Environment Variables
Copy `.env.example` to `.env` and fill in your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_ADMIN_EMAIL=admin@example.com
```

### 3. Install and Run
```bash
npm install
npm run dev
```

## Deployment
This project is configured for easy deployment to Netlify. Simply connect your repository and Netlify will use the `netlify.toml` configuration.
