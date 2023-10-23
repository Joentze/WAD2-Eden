//HELPER FUNCTIONS FOR MEDIA DOCUMENTS IN FIREBASE
import {
  addDoc,
  collection,
  getDocs,
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
    let events: MediaPostType[] = [];
    const eventsRef = collection(db, "media");
    const q = query(eventsRef, where("creatorId", "==", creatorId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data() as MediaPostType;
      events.push({
        ...data,
        createdOn: (data.createdOn as Timestamp).toDate(),
      });
    });
    return events.sort((a, b) => {
      return (a.createdOn as Date).getTime() - (b.createdOn as Date).getTime();
    }) as MediaPostType[];
  } catch (e) {
    throw new Error("There was an error with getting media at this moment");
  }
};
