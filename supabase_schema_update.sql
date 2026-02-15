-- Programs Table
create table if not exists "Program" (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  degree text not null, -- 'M.Tech', 'PhD', 'Certificate'
  duration text,
  description text,
  curriculum text, -- JSON string for course structure
  "isVisible" boolean default true,
  "createdAt" timestamp with time zone default timezone('utc'::text, now()) not null,
  "updatedAt" timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Research Table
create table if not exists "Research" (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  authors text, -- JSON array or comma separated
  "publicationDate" timestamp with time zone,
  journal text,
  link text,
  abstract text,
  "isVisible" boolean default true,
  "createdAt" timestamp with time zone default timezone('utc'::text, now()) not null,
  "updatedAt" timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Gallery Table
create table if not exists "Gallery" (
  id uuid default uuid_generate_v4() primary key,
  title text,
  type text default 'image', -- 'image', 'video'
  url text not null,
  category text, -- 'campus', 'events', 'convocation'
  date timestamp with time zone default timezone('utc'::text, now()),
  "isVisible" boolean default true,
  "createdAt" timestamp with time zone default timezone('utc'::text, now()) not null,
  "updatedAt" timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Placement Table
create table if not exists "Placement" (
  id uuid default uuid_generate_v4() primary key,
  "studentName" text not null,
  company text not null,
  role text,
  batch text,
  "imageUrl" text,
  package text, -- e.g. "12 LPA"
  "isVisible" boolean default true,
  "createdAt" timestamp with time zone default timezone('utc'::text, now()) not null,
  "updatedAt" timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Settings Table (Key-Value store for site config)
create table if not exists "Settings" (
  key text primary key,
  value text, -- JSON value
  category text, -- 'general', 'seo', 'contact'
  "updatedAt" timestamp with time zone default timezone('utc'::text, now()) not null
);
