# Switching to crosswithfriends: assessment

_Assessed 2026-11-13 against https://github.com/ScaleOvenStove/crosswithfriends (`master` at `c56b603b`, 2026-11-03)._

**Verdict:** moderate lift, roughly half a day to a day of work. Your own changes are small. Nearly all the risk is in upgrading the Postgres database and changing how the site is deployed.

## Where things stand

- This repo split off upstream downforacross at `789c2f4` (2025-09-20, "Update iPUZtoJSON.js (#351)").
- The 5 local commits since then are all branding and config: the "Josh for a Cross" name, the margarita icon, the `#566FCE` colour, a `pool.ts` tweak, and moving the Firebase settings into env vars.
- crosswithfriends forked from the same upstream and has made about 1,128 commits since, so it's now a substantially rewritten app.

## What changed in crosswithfriends

| Area | This repo | crosswithfriends |
|---|---|---|
| Node / package manager | Node 18, yarn | Node 22, pnpm (via corepack) |
| Frontend build | Create React App, React 16 | Vite, React 19 |
| Frontend env vars | `REACT_APP_*` | `VITE_*` |
| Firebase | Required | **Removed completely** |
| Auth | Firebase anonymous auth | Optional accounts: email/password with JWT, plus Google OAuth |
| Backend | Express 4, socket.io 2 | Express 5, socket.io 4, Helmet, rate limiting, optional Sentry |
| Database | 5 tables | About 15 more tables (users, snapshots, ratings, bans, etc.) |
| Deployment | Static `build/` folder plus a separate API domain | Backend can serve the frontend itself (`SERVE_STATIC=true`), and Docker Compose is included |

Dropping Firebase is a real benefit: the Firebase project and its credentials are no longer needed.

## The work involved

### 1. Re-apply branding (about an hour)

It can't be cherry-picked because the files were restructured, but it's about 10 small edits:

- Nav title ("Josh for a Cross") and the info dialog text
- Mobile toolbar "JFAC" link
- Welcome page `<title>`
- CSS colour variables (`--main-blue`, `--main-blue-2` → `#566FCE`), puzzle list and welcome icon fills, welcome entry border
- `src/images/joshmargarita.png` plus the nav CSS that shows it

The `pool.ts` and Firebase changes are no longer needed: the new `pool.ts` reads `PGPORT`/`PGHOST` and turns SSL off outside production (or set `PGSSL=disable`).

### 2. Runtime setup on the Ubuntu server (about an hour)

- Install Node 22 and run `corepack enable`, then `pnpm install`.
- Write a new `.env` (see `server/.env.example`) with:
  - `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, `PGPASSWORD`
  - `JWT_SECRET` (random string)
  - `NODE_ENV=production`
  - `SERVE_STATIC=true`
  - `FRONTEND_URL` (your public URL; used for CORS and email links)
- Build with `VITE_SELF_HOSTED=true pnpm build`.
- Point the systemd unit at `pnpm start:server` instead of `yarn servebackendprod`.

### 3. A deployment change to watch for

The production frontend now calls the API on the same domain it's served from (`SERVER_URL = ''`); the separate `api.domain.com` setup is gone. Two options:

- **Simplest:** let the backend on port 3021 serve everything (`SERVE_STATIC=true`) and put the reverse proxy in front of it.
- **Alternative:** keep nginx serving the static files, and proxy `/api` and `/socket.io` to port 3021.

### 4. Database: the main decision

**Option A: start fresh (easiest)**

- Run `docker compose up`, or run `server/sql/create_fresh_db.sql` against a new database.
- You lose old games and replays.
- To keep uploaded puzzles, dump and restore just the `puzzles` table.

**Option B: upgrade the existing database (about 2–4 hours, carefully)**

- There's no migration runner, so the scripts in `server/sql/` have to be run by hand, in order.
- Back up with `pg_dump` first, and rehearse the whole upgrade on a copy of the database.
- Most `create_*.sql` files use `IF NOT EXISTS`, and several `alter_*` files handle the old schema directly. For example, `alter_puzzle_solves_add_user_id.sql` drops the old `only_one_solve_per_puzzle_and_game` constraint.
- `alter_add_game_moderation.sql` and `alter_add_game_restrictions.sql` have no `IF NOT EXISTS` guards, so check those by hand.

## Other things to know

- Old Firebase-era player IDs won't carry over to the new account system. Anonymous play still works, but past history won't link up unless people sign up and the backfill script matches their games.
- Email verification and Google login are optional. Without `RESEND_API_KEY`, verification emails are just written to the server log.
- A dev frontend started without `VITE_USE_LOCAL_SERVER=1` sends API calls to the public crosswithfriends production backend, not yours. Production builds aren't affected.
- The repo moves fast (several commits a day), so decide whether to pull updates regularly or pin to a commit.

## Recommendation

- **If old game history doesn't matter much:** start a fresh database with Docker Compose, restore your puzzles, apply your branding on a branch, and put it behind the existing reverse proxy. Realistically a few hours.
- **If you want to keep the history:** do the above plus a rehearsed in-place upgrade on a database copy. About a day.
