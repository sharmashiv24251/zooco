# Zooco - Pet Management & Reminders PWA

A Progressive Web App (PWA) built with Next.js, Prisma ORM, and Neon Postgres for managing pets and their reminders.

## Features

### Progressive Web App (PWA)

- Installable on mobile devices and desktops
- App-like experience with custom icons and splash screens
- Installation prompt appears automatically on supported devices (via `install-prompt.tsx`)
- Configured via `src/app/manifest.ts` and service worker files

### Pet Management

**Frontend Routes:**

- `/pets` - List all pets
- `/pets/add` - Add a new pet
- `/pets/[id]` - View pet details
- `/pets/[id]/edit` - Edit pet information

**API Endpoints:**

- `GET /api/pets` - Retrieve all pets
- `POST /api/pets` - Create a new pet
- `GET /api/pets/[id]` - Get specific pet details
- `PUT /api/pets/[id]` - Update pet information
- `DELETE /api/pets/[id]` - Delete a pet

### Reminders

**Frontend Routes:**

- `/reminders` - List all reminders
- `/reminders/add` - Add a new reminder
- `/reminders/[id]` - View reminder details
- `/favourites` - View favorite reminders

**API Endpoints:**

- `GET /api/reminders` - Retrieve all reminders
- `POST /api/reminders` - Create a new reminder
- `GET /api/reminders/[id]` - Get specific reminder details
- `PUT /api/reminders/[id]` - Update reminder information
- `DELETE /api/reminders/[id]` - Delete a reminder

### Database & ORM

- Uses Neon Postgres as the database backend
- Prisma ORM for type-safe database operations
- Database schema defined in `prisma/schema.prisma`

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file
   - Add your Neon Postgres database URL:
     ```
     DATABASE_URL="postgresql://..."
     ```
4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## How to Use

### Managing Pets

1. **Add a Pet**

   - Navigate to `/pets/add`
   - Fill in the pet details form
   - Submit to create a new pet

2. **Update Pet Information**

   - Go to `/pets` to see all pets
   - Click on a pet to view details
   - Click "Edit" to modify pet information
   - Submit changes to update

3. **Delete a Pet**
   - Navigate to pet details page
   - Click "Delete" button
   - Confirm deletion in the dialog

### Managing Reminders

1. **Create Reminders**

   - Go to `/reminders/add`
   - Fill in reminder details
   - Set date and time
   - Submit to create

2. **Update Reminders**

   - Navigate to `/reminders`
   - Select a reminder to edit
   - Modify details and save

3. **Delete Reminders**
   - Open the reminder details
   - Click "Delete"
   - Confirm in the dialog

## Upcoming Features

### Planned Improvements

1. **Offline Support**

   - Implementation of IndexedDB for offline data storage
   - Sync mechanism when connection is restored
   - Cache-first strategy for assets and data

2. **Date Filtering**
   - Filter reminders by date range
   - Calendar view for reminders
   - Date-based sorting and organization

## Technical Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Neon Postgres
- **ORM**: Prisma
- **PWA Features**: Next-PWA, Service Workers
- **UI Components**: Shadcn UI
