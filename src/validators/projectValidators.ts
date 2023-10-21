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
  let pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  if (
    !(
      creatorId &&
      creatorName &&
      projectTitle &&
      projectDescription &&
      projectAddress &&
      projectTag
    )
  )
    throw new Error("All text fields must be filled");
  if ((projectStart as Date).getTime() >= (projectEnd as Date).getTime())
    throw new Error("End Date must be later than Start Date");
  if (projectImages.length === 0)
    throw new Error("Your project must have at least 1 image");
  if (!projectImages.every((image) => pattern.test(image)))
    throw new Error("Image src has a problem");
};
