import { Timestamp } from "firebase/firestore";

export interface JoinedType {
  companyId: string;
  companyName: string;
  companyPhotoUrl: string;
}
export type ProjectType = {
  creatorId: string;
  creatorName: string;
  creatorPhotoUrl: string;
  joined: JoinedType[];
  projectTitle: string;
  projectStart: Timestamp | Date;
  projectEnd: Timestamp | Date;
  projectDescription: string;
  projectAddress: string;
  projectSize: number;
  projectTag: string;
  projectImages: [];
  completed: boolean;
};

export const validateProject = (project: ProjectType) => {
  const {
    creatorId,
    creatorName,
    creatorPhotoUrl,
    joined,
    projectTitle,
    projectStart,
    projectEnd,
    projectDescription,
    projectAddress,
    projectSize,
    projectTag,
    projectImages,
    completed,
  } = project;
  if (
    !(
      creatorId &&
      creatorName &&
      creatorPhotoUrl &&
      projectTitle &&
      projectDescription &&
      projectAddress &&
      projectTag
    )
  )
    throw new Error("All text fields must be filled");
  if ((projectStart as Date).getTime() >= (projectEnd as Date).getTime())
    throw new Error("End Date must be later than Start Date");
};
