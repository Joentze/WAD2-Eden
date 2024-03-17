import { update } from "firebase/database";
import { collection, addDoc } from "firebase/firestore";

import { db } from "../firebase";
export enum PromptStatus {
  PROCESSING = "PROCESSING",
  COMPLETE = "COMPLETE",
  ERROR = "ERROR",
}

export interface PromptType {
  input: string;
  output: string;
  status: PromptStatus;
}
export const createNewPrompt = async (data: PromptType): Promise<string> => {
  try {
    console.log("creating new prompt");
    const { id } = await addDoc(collection(db, "prompts"), data);
    return id as string;
  } catch (e) {
    throw new Error("Error with creating new prompt");
  }
};
