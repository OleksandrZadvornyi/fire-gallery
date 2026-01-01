# FireGallery 🔥

FireGallery is a responsive, real-time image gallery application. It allows users to securely sign in, upload images via drag-and-drop, and view a shared gallery of photos in a beautiful masonry layout. The project is built with performance and modern web standards in mind, utilizing React (Vite) for the frontend and the Firebase ecosystem for backend services.

## ✨ Features

* **Public Gallery Access:** The gallery is publicly visible to guests, while sensitive actions (Upload/Delete) remain protected.
* **User Authentication:** Secure Sign Up and Sign In using email/password or Google Auth (via Firebase Authentication).
* **Modern Drag & Drop Upload:** Intuitive file upload zone powered by `react-dropzone` with real-time progress bars.
* **Masonry Layout:** Images are displayed in a Pinterest-style masonry grid, handling different aspect ratios gracefully.
* **Image Deletion:** Users can manage their content by deleting images they have uploaded.
* **Smart Feedback:** Interactive toast notifications (via `react-hot-toast`) for uploads, errors, and authentication events.
* **Real-time Database:** Image metadata (URL, uploader email, timestamp) is synced instantly using Firestore.
* **Responsive UI:** Styled with **Tailwind CSS** and **DaisyUI** for a clean, mobile-friendly interface.

## 🛠️ Tech Stack

* **Frontend:** React, TypeScript, Vite
* **Styling:** Tailwind CSS, DaisyUI
* **Backend:** Firebase (Auth, Firestore, Storage)
* **Utilities:** `react-dropzone` (Uploads), `react-hot-toast` (Notifications)
* **Icons:** FontAwesome

## 🚀 Getting Started

### Prerequisites

* Node.js (v14 or higher)
* npm or yarn
* A Firebase project created at [console.firebase.google.com](https://console.firebase.google.com/)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/OleksandrZadvornyi/fire-gallery.git
    cd fire-gallery
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Firebase**
    * Create a file named `config.ts` inside `src/firebase/` (or use `.env` variables if your project supports it).
    * Paste your Firebase configuration keys:
    ```typescript
    // src/firebase/config.ts
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";
    import { getFirestore } from "firebase/firestore";
    import { getStorage } from "firebase/storage";

    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_PROJECT_ID.appspot.com",
      messagingSenderId: "YOUR_SENDER_ID",
      appId: "YOUR_APP_ID"
    };

    const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);
    export const db = getFirestore(app);
    export const storage = getStorage(app);
    ```

4.  **Enable Firebase Services**
    * **Authentication:** Enable "Email/Password" and "Google" providers.
    * **Firestore:** Create a database and set rules to allow public read, private write.
    * **Storage:** Enable storage and set rules to allow public read, private write.

### Run Locally

Start the development server:

```bash
npm run dev
```

## 📂 Project Structure

```
src/
├── components/      # Reusable UI components (Navbar, UploadForm, ImageGallery)
├── context/         # React Context for global state (AuthContext)
├── firebase/        # Firebase configuration and initialization
├── hooks/           # Custom hooks (useAuth, useFirestore, useStorage, useDeleteImage)
├── pages/           # Page components (Home, Signup, Signin)
├── routes/          # Route definitions (PublicRoute)
└── main.tsx         # Entry point
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.