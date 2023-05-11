import {
  FieldValue,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export const getInfoUser = async (uid: string) => {
  try {
    const docRef = doc(db, `users`, uid);
    const document = await getDoc(docRef);
    return document.data();
  } catch (error) {
    console.log(error);
  }
};

export interface propsAddSport {
  idTeam: string;
  imageURL: string;
  isLiked: boolean;
  name: string;
  uid?: string;
}
export const addSportToHistory = async ({
  idTeam,
  imageURL,
  isLiked,
  name,
  uid,
}: propsAddSport) => {
  try {
    const docRef = doc(db, `users/${uid}`);
    const document = await updateDoc(docRef, {
      history: arrayUnion({ idTeam, imageURL, isLiked, name }),
    });
    return document;
  } catch (error) {
    console.log(error);
  }
};
