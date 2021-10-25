import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBj2UZftXD-Wb5RQtWrsDh5EmuWwW8QDzs',
  authDomain: 'image-gallery-442f6.firebaseapp.com',
  projectId: 'image-gallery-442f6',
  storageBucket: 'image-gallery-442f6.appspot.com',
  messagingSenderId: '758628456357',
  appId: '1:758628456357:web:d9de3c5cadb4117f68fa4c',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
