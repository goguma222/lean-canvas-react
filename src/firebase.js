// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA2WCbaR9WTBwsLDom9UJv2VO_vGhJnWBY',
  authDomain: 'board-6feaa.firebaseapp.com',
  projectId: 'board-6feaa',
  storageBucket: 'board-6feaa.appspot.com',
  messagingSenderId: '1050352460168',
  appId: '1:1050352460168:web:a8a367c1f4af23af4a1a3d',
  measurementId: 'G-SP4YPWRRDM',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
