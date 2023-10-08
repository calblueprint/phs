// https://zajgwwzcxtkmyjmqqtap.supabase.co ====> url
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inphamd3d3pjeHRrbXlqbXFxdGFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYyMDA1MDIsImV4cCI6MjAxMTc3NjUwMn0.BoX-cCxHARzGTXpZ7tcijeNFeBDMgxx8geNfBQOBXtU ==> api key


import { createClient } from '@supabase/supabase-js';

export const supabase = createClient("https://njxxyxsyrpawdccfvijp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qeHh5eHN5cnBhd2RjY2Z2aWpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU5NzI0NTMsImV4cCI6MjAxMTU0ODQ1M30.rT2418kLoahHrZwYFEi_EnzrptnoD1bVIOe98x9zYGs");