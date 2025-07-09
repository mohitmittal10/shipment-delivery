# Shipment Tracking Application

This is a modern web application designed to allow users to register, log in, create new shipment records, and track existing shipments. It provides a clean, responsive user interface and leverages Firebase for authentication and data storage.

## Features

* **User Authentication:**
    * User registration with email and password.
    * User login with email and password.
    * Secure authentication powered by Firebase Authentication.
    * User data (like name) stored in Firestore upon registration.
* **Shipment Management (Authenticated Users):**
    * Create new shipment records with details like sender, receiver, package size, delivery address, and initial status.
    * View a list of all shipments created by the logged-in user.
    * Each shipment card displays key information and its current status.
* **Shipment Tracking (Public & Authenticated):**
    * Track shipments using a unique tracking ID.
    * The tracking page can be accessed directly via a URL with the tracking ID (e.g., `/track/YOUR_TRACKING_ID`).
    * Displays detailed information about a specific shipment, including its current status and timestamps.
* **Responsive Design:**
    * Optimized for various screen sizes (mobile, tablet, desktop) using CSS media queries.
    * Fluid layouts and adaptive components ensure a consistent user experience.
* **Modern UI/UX:**
    * Clean, intuitive design with smooth animations and transitions.
    * Consistent styling using CSS Modules and a defined color palette.

## Technologies Used

* **Frontend:**
    * [React](https://react.dev/): A JavaScript library for building user interfaces.
    * [React Router DOM](https://reactrouter.com/en/main): For declarative routing in React applications.
    * [CSS Modules](https://github.com/css-modules/css-modules): For scoped and modular CSS.
* **Backend & Database:**
    * [Firebase Authentication](https://firebase.google.com/docs/auth): For user authentication (email/password).
    * [Firestore](https://firebase.google.com/docs/firestore): A flexible, scalable NoSQL cloud database for storing user and shipment data.

## Setup and Installation

Follow these steps to get the project up and running on your local machine.

### Prerequisites

* Node.js (LTS version recommended)
* npm or Yarn (npm is used in this guide)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd shipment-tracking-app
```

### 2. Install Dependencies

```bash
npm install
# or if you use yarn
# yarn install
```

### 3. Firebase Project Setup

1.  **Create a Firebase Project:**
    * Go to the [Firebase Console](https://console.firebase.google.com/).
    * Click "Add project" and follow the steps to create a new project.

2.  **Register Your App:**
    * In your Firebase project, click on the web icon (`</>`) to add a web app.
    * Follow the instructions to register your app. You'll get a Firebase configuration object. It will look something like this:

    ```javascript
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID"
    };
    ```

3.  **Enable Firebase Services:**
    * **Authentication:** In the Firebase Console, navigate to "Authentication" -> "Sign-in method" tab. Enable "Email/Password" provider.
    * **Firestore Database:** In the Firebase Console, navigate to "Firestore Database" -> "Create database". Start in "production mode" (you'll set up rules later) or "test mode" for quick setup.

4.  **Firestore Security Rules:**
    For basic functionality, you can use the following rules (for development purposes; adjust for production):

    ```firestore
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        // Users can read and write their own user data
        match /users/{userId} {
          allow read, update, delete: if request.auth != null && request.auth.uid == userId;
          allow create: if request.auth != null;
        }

        // Users can read and write their own shipment data
        match /shipments/{shipmentId} {
          allow read, update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
          allow create: if request.auth != null;
          // Public read for tracking (optional, if you want unauthenticated users to track)
          // allow read: if true; // WARNING: This makes all shipments publicly readable by anyone with the ID
        }
      }
    }
    ```

    **Note:** For the public tracking page to work without authentication, you would need `allow read: if true;` on the `shipments` collection, but this is generally not recommended for sensitive data. The current `TrackingPage.js` fetches data without requiring the user to be logged in, so you might need to adjust your Firestore rules for `shipments` to `allow read: if true;` if you want *anyone* to be able to track. The provided `ShipmentList.js` and `CreateShipmentPage.js` require authentication.

### 4. Configure Firebase Environment Variables

Create a file named `.env` in the root of your project (same level as `package.json`) and add your Firebase configuration:

```
REACT_APP_FIREBASE_API_KEY="YOUR_API_KEY"
REACT_APP_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
REACT_APP_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
REACT_APP_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
REACT_APP_FIREBASE_APP_ID="YOUR_APP_ID"
```

### 5. Update `src/firebase/firebaseConfig.js`

Make sure your `src/firebase/firebaseConfig.js` file uses these environment variables:

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
```

### 6. Run the Application

```bash
npm start
# or if you use yarn
# yarn start
```

The application should now open in your browser at `http://localhost:3000`.

## Usage

1.  **Register:** Navigate to `/register` to create a new account.
2.  **Login:** After registering, or if you already have an account, go to `/login` to sign in.
3.  **Dashboard:** Once logged in, you'll be redirected to the `/dashboard`, where you can see your created shipments.
4.  **Create Shipment:** Go to `/create-shipment` to add a new shipment record.
5.  **Track Shipment:** Use the "Track Shipment" button on the homepage, or navigate directly to `/track` and enter a tracking ID. You can also access a specific shipment via its URL, e.g., `/track/ABC123XYZ`.

## Project Structure

The project follows a standard React application structure:

```
src/
├── components/
│   ├── Auth/           # Authentication forms (Login, Register)
│   ├── Layout/         # Header, Footer, and main layout components
│   └── Shipment/       # Components related to shipment display and forms
├── context/            # React Context for global state (AuthContext)
├── firebase/           # Firebase configuration and initialization
├── hooks/              # Custom React hooks (e.g., useAuthStatus)
├── pages/              # Top-level page components (Home, Dashboard, Tracking, etc.)
├── App.jsx             # Main application component with routing
├── index.css           # Global CSS styles and variables
├── main.jsx            # Entry point for React application
└── ...
```

## Styling

The application uses **CSS Modules** for component-specific styling, preventing style conflicts and promoting maintainability. Global styles and variables are defined in `src/index.css`. The design emphasizes a clean, modern aesthetic with smooth animations and responsive layouts.
