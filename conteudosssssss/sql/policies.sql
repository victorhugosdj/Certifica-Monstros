alter table users enable row level security;
create policy "public read users" on users for select using (true);
create policy "public insert users" on users for insert with check (true);
create policy "public update users" on users for update using (true) with check (true);
create policy "public delete users" on users for delete using (true);

alter table progress enable row level security;
create policy "public read progress" on progress for select using (true);
create policy "public upsert progress" on progress for insert with check (true);
create policy "public update progress" on progress for update using (true) with check (true);
create policy "public delete progress" on progress for delete using (true);

alter table metrics enable row level security;
create policy "public read metrics" on metrics for select using (true);
create policy "public upsert metrics" on metrics for insert with check (true);
create policy "public update metrics" on metrics for update using (true) with check (true);
create policy "public delete metrics" on metrics for delete using (true);

alter table drafts enable row level security;
create policy "public read drafts" on drafts for select using (true);
create policy "public upsert drafts" on drafts for insert with check (true);
create policy "public update drafts" on drafts for update using (true) with check (true);
create policy "public delete drafts" on drafts for delete using (true);
