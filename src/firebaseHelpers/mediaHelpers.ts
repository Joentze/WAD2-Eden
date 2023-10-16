//HELPER FUNCTIONS FOR MEDIA DOCUMENTS IN FIREBASE
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { JoinedType } from "./projectHelpers";
import { db } from "../firebase";
type MediaPostType = {
  postDescription: string;
  postMentions: JoinedType[];
  postImages: string[];
  postTag: string;
  createdBy: string;
  creatorId: string;
  creatorPhotoUrl: string;
  createdOn: Date | Timestamp;
};

export const postMedia = async (post: MediaPostType) => {
  try {
    await addDoc(collection(db, "projects"), post);
  } catch (e) {
    throw new Error("There was an error in uploading media");
  }
};
