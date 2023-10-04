// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "nextjs-ai-note-app.firebaseapp.com",
  projectId: "nextjs-ai-note-app",
  storageBucket: "nextjs-ai-note-app.appspot.com",
  messagingSenderId: "206441301902",
  appId: "1:206441301902:web:dd3759e3b44725aa1486df",
  measurementId: "G-S3N86FDEBD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export async function uploadFileToFirebase(image_url: string, name: string) {
  try {
    const response = await fetch(image_url);
    const buffer = await response.arrayBuffer();
    const file_name = name.replace(" ", "") + Date.now + ".jpeg";
    const storage = getStorage();

    const storageRef = ref(storage, file_name);
    await uploadBytes(storageRef, buffer, {
      contentType: "image/jpeg",
    });
    const firebase_url = await getDownloadURL(storageRef);
    return firebase_url;
  } catch (error) {
    console.error(error);
  }
}


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: "aideation-yt.firebaseapp.com",
//   projectId: "aideation-yt",
//   storageBucket: "aideation-yt.appspot.com",
//   messagingSenderId: "962348384448",
//   appId: "1:962348384448:web:e02758407aba3258d5ad25",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const storage = getStorage(app);

// export async function uploadFileToFirebase(image_url: string, name: string) {
//   try {
//     const response = await fetch(image_url);
//     const buffer = await response.arrayBuffer();
//     const file_name = name.replace(" ", "") + Date.now + ".jpeg";
//     const storageRef = ref(storage, file_name);
//     await uploadBytes(storageRef, buffer, {
//       contentType: "image/jpeg",
//     });
//     const firebase_url = await getDownloadURL(storageRef);
//     return firebase_url;
//   } catch (error) {
//     console.error(error);
//   }
// }