import { db } from "./config";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  where,
  query,
} from "firebase/firestore";

import { useSelector } from "react-redux";
import { userSelector } from "../redux/auth/authSlice";

export const writeDataToFirestore = async (post) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), post);
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const writeCommentToFirestore = async (comment, postId) => {
  try {
    const postRef = doc(collection(db, `posts`), postId);
    const docRef = await addDoc(collection(postRef, "comments"), comment);
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const getDataFromFirestore = async () => {
  try {
    let dataArray = [];
    const snapshot = await getDocs(collection(db, "posts"));
    snapshot.forEach((doc) => {
      dataArray.push({ id: doc.id, data: doc.data() });
    });

    return dataArray;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserPostsFromFirestore = async (uid) => {
  try {
    let dataArray = [];
    const postsRef = collection(db, "posts");
    const q = query(postsRef, where("userId", "==", uid));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      dataArray.push({ id: doc.id, data: doc.data() });
    });

    return dataArray;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCommentsFromFirestore = async (postId) => {
  try {
    let dataArray = [];
    const postRef = doc(collection(db, `posts`), postId);
    const snapshot = await getDocs(collection(postRef, "comments"));
    snapshot.forEach((doc) => {
      dataArray.push({ id: doc.id, data: doc.data() });
    });

    return dataArray;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateDataInFirestore = async (
  collectionName,
  docId,
  updateDataObject
) => {
  try {
    const ref = doc(db, collectionName, docId);

    await updateDoc(ref, updateDataObject);
  } catch (error) {
    console.log(error);
  }
};
