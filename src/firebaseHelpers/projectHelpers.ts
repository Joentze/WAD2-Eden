// HELPER FUNCTIONS FOR PROJECT DOCUMENTS IN FIREBASE

import { update } from "firebase/database";
import {
  setDoc,
  collection,
  doc,
  Timestamp,
  updateDoc,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase";

export interface JoinedType {
  companyId: string;
  companyName: string;
  companyPhotoUrl: string;
}

export type EventType = {
  completed: boolean;
  projectId: string;
  projectName: string;
  projectTag: string;
  startDate: Timestamp | Date;
  companyId: string;
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
enum ApplicationStatus {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  PENDING = "PENDING",
}
export type ApplicationType = {
  companyId: string;
  companyName: string;
  companyPhotoUrl: string;
  enterpriseId: string;
  appliedOn: Date;
  status: ApplicationStatus;
  projectId: string;
  projectName: string;
};
export const createNewProject = async (data: ProjectType): Promise<void> => {
  try {
    await addDoc(collection(db, "projects"), data);
  } catch (e) {
    throw new Error("Error with creating new project!");
  }
};

export const setProjectCompleted = async (projectId: string): Promise<void> => {
  try {
    await updateDoc(doc(db, "projects", projectId), { completed: true });
  } catch (e) {
    throw new Error("Error with setting project as completed");
  }
};
export const createProjectApplication = async (
  data: ApplicationType
): Promise<void> => {
  try {
    await addDoc(collection(db, "applications"), data);
  } catch (e) {
    throw new Error("Error with creating project application");
  }
};

export const updateProjectApplicationStatus = async (
  applicationId: string,
  status: ApplicationStatus
): Promise<void> => {
  try {
    await updateDoc(doc(db, "applications", applicationId), { status });
  } catch (e) {
    throw new Error("There was an error with updating application status");
  }
};

export const getEvents = async (companyId: string): Promise<EventType[]> => {
  try {
    let events: EventType[] = [];
    const eventsRef = collection(db, "events");
    const q = query(eventsRef, where("companyId", "==", companyId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data() as EventType;
      events.push({
        ...data,
        startDate: (data.startDate as Timestamp).toDate(),
      });
    });
    return events.sort((a, b) => {
      return (a.startDate as Date).getTime() - (b.startDate as Date).getTime();
    }) as EventType[];
  } catch (e) {
    throw new Error("There was an error with getting events at this moment");
  }
};
