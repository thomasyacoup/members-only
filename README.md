# Members Only

A membership-based web application built with Express.js and PostgreSQL. Users can sign up, log in, upgrade to membership, and post messages.

## Features

- **Sign up** with validated form inputs
- **Log in / log out** using Passport.js (local strategy)
- **Membership upgrade** — restricted route for non-members
- **Post messages** — protected route, authenticated users only
- **Delete messages** — restricted to the message author or admin
- **Session-based auth** with express-session and bcryptjs password hashing

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Templates | EJS |
| Database | PostgreSQL |
| Auth | Passport.js + express-session |
| Passwords | bcryptjs |
| Validation | express-validator |

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables** — create a `.env` file with your PostgreSQL connection details and session secret.

3. **Run the dev server:**
   ```bash
   npm run dev
   ```

4. Open `http://localhost:<PORT>` in your browser.

## Project Structure

```
members-only/
├── config/        # Database, Passport, and session config
├── controllers/   # Auth and message logic
├── middlewares/   # Protected routes, error handling
├── models/        # User and message database models
├── validators/    # Input validation rules
├── views/         # EJS templates
├── lib/           # Utility helpers
├── app.js         # Main application entry point
└── package.json
```

## Scripts

- `npm run dev` — Start with nodemon (auto-restart on changes)
- `npm start` — Start production server
