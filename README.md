# TechBlog - Modern Personal Blog

A production-ready personal tech blog built with React, TypeScript, Tailwind CSS, and Supabase. Features a glassmorphism UI aesthetic, full mobile responsiveness, and an administrative dashboard.

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
Create a new project in [Supabase](https://supabase.com/) and run the following SQL in the SQL Editor:

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
  likes INTEGER DEFAULT 0,
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
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION increment_likes(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE posts SET likes = likes + 1 WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION decrement_likes(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE posts SET likes = GREATEST(0, likes - 1) WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

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
CREATE POLICY "Admin can do anything on posts" ON posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Starter Content
INSERT INTO posts (slug, title, excerpt, content, tags, published, cover_image) VALUES
('how-i-built-this-blog', 'How I Built This Blog with React and Supabase', 'A deep dive into the architecture and tech stack of this modern blog.', '# Building with React & Supabase\n\nWelcome to the technical breakdown of this blog. We use **Zustand** for state, **Tailwind** for styling, and **Supabase** for the backend.\n\n```tsx\nconst hello = "world";\nconsole.log(hello);\n```', ARRAY['React', 'Supabase', 'TypeScript'], true, 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'),
('glassmorphism-in-modern-design', 'Glassmorphism in Modern Web Design', 'Exploring the frosted glass aesthetic and how to implement it with Tailwind.', '# The Glassmorphism Trend\n\nGlassmorphism relies on translucency, background blur, and subtle borders to create depth.\n\n### Key Properties:\n- Background Blur\n- Multi-layered approach\n- Vibrant background colors', ARRAY['Design', 'Tailwind', 'CSS'], true, 'https://images.unsplash.com/photo-1550745165-9bc0b252726f'),
('internship-journey-tips', 'My Internship Journey: Landing Your First Role', 'Insights and advice for students looking to break into the tech industry.', '# Landing your first internship\n\nIt takes persistence and a solid portfolio. Here are my top tips:\n1. Build real projects\n2. Network on LinkedIn\n3. Practice LeetCode', ARRAY['Career', 'Internship', 'Tips'], true, 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4');
```

### 2. Environment Variables
Copy `.env.example` to `.env` and fill in your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Install and Run
```bash
npm install
npm run dev
```

## Deployment
This project is configured for easy deployment to Netlify. Simply connect your repository and Netlify will use the `netlify.toml` configuration.
