-- KampusQuest Supabase SQL Schema

-- 1. Create Profiles Table (Synced with Auth.Users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  name text,
  avatar text default 'Ariel',
  title text default 'Pelajar SMA',
  level integer default 1,
  total_xp integer default 0,
  streak integer default 0,
  questions_solved integer default 0,
  accuracy_rate numeric default 0.0,
  avg_speed numeric default 0.0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Create Policies
-- Users can view all profiles (for leaderboard)
create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

-- Users can only update their own profile
create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- 2. Trigger to automatically create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name)
  values (new.id, split_part(new.email, '@', 1));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. Create Leaderboard View (Virtual Table)
create or replace view public.leaderboard as
select
  id,
  name,
  avatar,
  title,
  level,
  total_xp,
  streak,
  rank() over (order by total_xp desc) as rank
from public.profiles;

