//HELPER FUNCTIONS FOR MEDIA DOCUMENTS IN FIREBASE
import { Timestamp } from "firebase/firestore";
import { JoinedType } from "./projectHelpers";

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


