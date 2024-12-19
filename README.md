# Learning Management System (LMS)

This project is a Learning Management System (LMS) module with separate Admin and User views. It allows admins to manage courses and users to browse and enroll in them.

## Features

### Admin View
1. **Dashboard**: Displays all courses with options to add, edit, or delete them.
2. **Add/Edit Course Page**: Form to add or update course details (Title, Description, Duration, Instructor Name).

### User View
1. **Course Catalog**: Displays a list of all available courses.
2. **Course Details Page**: Shows detailed information about a course, including an Enroll button.

## Tech Stack
- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express (Optional, if implemented for API services)
- **Database**: MongoDB (Optional, if implemented for data storage)

## Setup Instructions

### Prerequisites
1. Install [Node.js](https://nodejs.org/) (v16+ recommended).
2. Install [MongoDB](https://www.mongodb.com/) (if using a database).
3. Clone this repository:
   ```bash
   git clone https://github.com/your-repo/lms.git
   cd lms
   ```

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables:
   - Create a `.env` file in the root directory and add the following:
     ```env
     NEXT_PUBLIC_API_URL=<your_backend_api_url> # If using an external API
     MONGODB_URI=<your_mongo_connection_string> # If using MongoDB
     ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:3000`.

### Building for Production
1. Build the project:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm run start
   ```

### Optional Backend Setup
If you have implemented a backend:
1. Navigate to the backend directory (if separate):
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm run start
   ```
4. Ensure the backend API URL is correctly configured in the frontend `.env` file.

## Predefined Credentials

### Admin Account
- **Username**: admin
- **Password**: admin123

### User Account
- **Username**: user
- **Password**: user123

## Folder Structure
```
├── backend/               # Backend server
│   ├── controllers/       # Controllers for handling logic
│   ├── database/          # Database configuration
│   ├── middleware/        # Middleware functions
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── .env               # Backend environment variables
│   ├── index.js           # Entry point for backend server
│   ├── package.json       # Backend dependencies
│   └── package-lock.json  # Backend lockfile
│
├── frontend/              # Frontend application
│   ├── public/            # Static assets
│   ├── src/               # Application source code
│   │   ├── app/           # Next.js app structure
│   │   │   ├── (admin)/   # Admin-specific pages
│   │   │   ├── (auth)/    # Authentication pages
│   │   │   └── user/      # User-specific pages
│   │   ├── components/    # Reusable UI components
│   │   ├── styles/        # Global styles
│   │   ├── utils/         # Helper functions
│   │   ├── lib/           # Additional libraries
│   │   └── types/         # TypeScript types
│   ├── .env               # Frontend environment variables
│   ├── next.config.js     # Next.js configuration
│   ├── package.json       # Frontend dependencies
│   └── package-lock.json  # Frontend lockfile
│
├── .gitignore             # Git ignore file
└── README.md              # Project documentation
```

## Contributing
1. Fork the repository.
2. Create a new branch for your feature/bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push them to your fork:
   ```bash
   git commit -m "Add feature-name"
   git push origin feature-name
   ```
4. Submit a pull request.

## License
This project is licensed under the [MIT License](./LICENSE).

---
For further assistance, please contact the project maintainer at [your-email@example.com].
