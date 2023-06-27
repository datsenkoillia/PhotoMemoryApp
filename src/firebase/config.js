// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDWn8yFrk9HvWFF5gea6k_Pm8-ivAMwX9s",
  authDomain: "photomemory-app.firebaseapp.com",
  databaseURL:
    "https://photomemory-app-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "photomemory-app",
  storageBucket: "photomemory-app.appspot.com",
  messagingSenderId: "622025020961",
  appId: "1:622025020961:web:a87db6de647c3ed69ab560",
  measurementId: "G-YB8FTQHS0Y",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
