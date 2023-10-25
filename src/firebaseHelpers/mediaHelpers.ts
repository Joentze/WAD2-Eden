//HELPER FUNCTIONS FOR MEDIA DOCUMENTS IN FIREBASE
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
// import { JoinedType } from "./projectHelpers";
import { db } from "../firebase";

interface JoinedType {
  companyId: string;
  companyName: string;
  companyPhotoUrl: string;
}

export interface MediaPostType {
  id?: string;
  postDescription: string;
  postMentions?: JoinedType[];
  postImages: string[];
  postTag?: string;
  creatorType: string;
  createdBy: string;
  creatorId: string;
  creatorPhotoUrl: string;
  createdOn: Date | Timestamp;
}

export const postMedia = async (post: MediaPostType) => {
  try {
    await addDoc(collection(db, "media"), post);
  } catch (e) {
    throw new Error("There was an error in uploading media");
  }
};
export const getMedias = async (
  creatorId: string
): Promise<MediaPostType[]> => {
  try {
    let medias: MediaPostType[] = [];
    const mediaRef = collection(db, "media");
    const q = query(mediaRef, where("creatorId", "==", creatorId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data() as MediaPostType;
      medias.push({
        ...data,
        createdOn: data.createdOn as Timestamp,
      });
    });
    return medias.sort((a, b) => {
      return (
        (a.createdOn as Timestamp).toDate().getTime() -
        (b.createdOn as Timestamp).toDate().getTime()
      );
    }) as MediaPostType[];
  } catch (e) {
    console.error(e);
    throw new Error("There was an error with getting media at this moment");
  }
};

export const getAllMedias = async (
  limitNo: number
): Promise<MediaPostType[]> => {
  try {
    let medias: MediaPostType[] = [];
    const mediaRef = collection(db, "media");
    const q = query(mediaRef, orderBy("createdOn", "desc"), limit(limitNo));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data() as MediaPostType;
      medias.push({ ...data, id: doc.id });
    });
    return medias.sort((a, b) => {
      return (
        (b.createdOn as Timestamp).toDate().getTime() -
        (a.createdOn as Timestamp).toDate().getTime()
      );
    }) as MediaPostType[];
  } catch (e) {
    console.error(e);
    throw new Error("There was an error with getting media at this moment");
  }
};
