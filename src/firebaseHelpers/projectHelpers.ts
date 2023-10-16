// HELPER FUNCTIONS FOR PROJECT DOCUMENTS IN FIREBASE

import { setDoc, collection, doc, Timestamp, getDoc } from "firebase/firestore";
import { useFirebaseAuth } from "vuefire";
import { db } from "../firebase";

export type JoinedType = {
    companyId: string;
    companyName: string;
    companyPhotoUrl: string;
  };

export type ProjectType = {
    creatorName: string;
    creatorPhotoUrl: string;
    joined: JoinedType[];
    projectStart: Timestamp;
    projectEnd: Timestamp;
    projectDescription: string;
    projectAddress: string;
    projectSize: number;
    projectTag: string;
    completed: boolean;
  };

export const createNewProject =()=>{

}