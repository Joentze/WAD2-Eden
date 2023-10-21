// import { JoinedType } from "@/firebaseHelpers/projectHelpers";
import { Timestamp } from "firebase/firestore";
// import { MediaPostType } from "../firebaseHelpers/mediaHelpers";
interface JoinedType {
  companyId: string;
  companyName: string;
  companyPhotoUrl: string;
}
interface MediaPostType {
  postDescription: string;
  postMentions?: JoinedType[];
  postImages: string[];
  postTag?: string;
  createdBy: string;
  creatorId: string;
  creatorPhotoUrl: string;
  createdOn: Date | Timestamp;
}

export const validateMediaPost = (data: MediaPostType): void => {
  let pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  const { postDescription, postImages, createdBy, creatorId, createdOn } = data;
  if (!(postDescription && createdBy && creatorId && createdOn))
    throw new Error("All text fields must be filled");
  if (!postImages.every((item) => pattern.test(item)))
    throw new Error("Images must have valid source");
};
