
# Leaf & Life: Your Smart Gardening Companion

Leaf & Life is a comprehensive platform designed to empower gardeners with smart tools for plant care, disease detection, and a vibrant marketplace for agricultural products.

## Features

- **Plant Disease Detection**: Upload photos to instantly identify plant diseases and get recommended treatments.
- **Electrovane Control**: Remotely manage your plant's watering system with smart electrovane controls.
- **Marketplace**: Buy and sell fresh produce, plants, and gardening essentials within a community-driven platform.
- **User Authentication**: Secure sign-up and sign-in for personalized experience.
- **User Profiles**: Manage your profile, view your listings, and track your plant's health.

## Technologies Used

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, Shadcn/ui
- **Backend/Database**: Supabase (PostgreSQL, Authentication, Storage, Edge Functions)
- **API**: Flask (for disease detection model integration)

## Getting Started

Follow these steps to set up and run the Leaf & Life project locally.

### Prerequisites

Make sure you have the following installed:

- Node.js (v18 or higher)
- npm or pnpm
- Python (v3.8 or higher) for the Flask API
- Docker (for local Supabase setup, or you can use a remote Supabase project)

### 1. Clone the repository

```bash
git clone <repository-url>
cd leaf&life
```

### 2. Install Frontend Dependencies

```bash
pnpm install
# or npm install
```

### 3. Set up Supabase

#### Option A: Local Supabase with Docker

If you have Docker installed, you can set up a local Supabase instance. Navigate to the `database` directory and follow the instructions in `step-by-step-setup.sql` to initialize your local database.

```bash
# Example command to start Supabase locally (adjust as per Supabase CLI docs)
supabase start
```

#### Option B: Remote Supabase Project

1. Create a new project on [Supabase](https://app.supabase.com/).
2. Get your `SUPABASE_URL` and `SUPABASE_ANON_KEY` from your project settings.
3. Run the SQL schemas located in the `database/` directory on your Supabase instance:
   - `schema.sql`
   - `schema-simple.sql`
   - `step-2-policies.sql`
   - `step-3-functions.sql`

### 4. Configure Environment Variables

Create a `.env.local` file in the root of the `leaf-life` directory with the following content:

```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Replace `YOUR_SUPABASE_URL` and `YOUR_SUPABASE_ANON_KEY` with your actual Supabase project URL and public anon key.

### 5. Set up the Flask API

Navigate to the `flask-api` directory:

```bash
cd flask-api
```

Create a Python virtual environment and install dependencies:

```bash
python -m venv venv
.\venv\Scripts\activate # On Windows
# source venv/bin/activate # On macOS/Linux
pip install -r requirements.txt
```

Run the Flask API:

```bash
python app.py
```

Ensure the Flask API is running on the port expected by the frontend (default usually 5000).

### 6. Run the Frontend Application

Return to the `leaf-life` root directory and start the Next.js development server:

```bash
pnpm dev
# or npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `app/`: Next.js pages and routes.
- `components/`: Reusable React components.
- `database/`: SQL schema and setup scripts for Supabase.
- `flask-api/`: Python Flask application for AI/ML models (e.g., disease detection).
- `hooks/`: Custom React hooks.
- `lib/`: Utility functions and Supabase client initialization.
- `public/`: Static assets like images.
- `styles/`: Global CSS styles.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.
