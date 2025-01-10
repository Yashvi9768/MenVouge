# MenVouge
# Project Structure

## Overview
This project is structured into three main parts:
- **frontend**: Contains the React.js frontend code.
- **server**: Contains the server-side code.
- **.env**: Holds environment variables for sensitive data.

## Structure
```
.
├── sercer
│   └── server.js
├── frontend
│   ├── public
│   └── src
├── .env
├── .gitignore
└── README.md
```

## Setup Instructions

1. **Environment Variables**:
   - Populate the `.env` file with the required values.
   ```
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
   REACT_APP_STRIPE_API_KEY=your_stripe_api_key
   ```

2. **Frontend**:
   - Navigate to the `frontend` folder.
   - Install dependencies: `npm install`
   - Start the frontend: `npm start`

3. **Backend**:
   - Navigate to the `backend` folder.
   - Install dependencies: `npm install` (or the appropriate command for your backend framework).
   - Start the backend: `node server.js` (or the appropriate command).

4. **Run the Application**:
   - Ensure both the frontend and backend are running.

## Notes
- The `.env` file is excluded from version control using `.gitignore`.
- Replace the placeholder values in `.env` with your actual API keys.
