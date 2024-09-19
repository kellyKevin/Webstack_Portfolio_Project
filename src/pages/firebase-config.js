// Import Firebase SDK
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyBUZJDLktz7qBHUPj_XtPybxz3vkz5cYlQ",
    authDomain: "seedlingsweb-b6e5e.firebaseapp.com",
    projectId: "seedlingsweb-b6e5e",
    storageBucket: "seedlingsweb-b6e5e.appspot.com",
    messagingSenderId: "1042431917002",
    appId: "1:1042431917002:web:ebea14cb0326379967ed33",
    measurementId: "G-JVWHZPDJX7"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Export the authentication module
export { auth };
