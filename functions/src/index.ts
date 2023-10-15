/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import * as functions from "firebase-functions";
import admin = require("firebase-admin");
import { Timestamp } from "firebase-admin/firestore";

admin.initializeApp();

enum ApplicationStatus {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  PENDING = "PENDING",
}
type JoinedType = {
  companyId: string;
  companyName: string;
  companyPhotoUrl: string;
};

type ProjectType = {
  creatorName: string;
  creatorPhotoUrl: string;
  joined: JoinedType[];
  projectStart: Timestamp;
  projectEnd: Timestamp;
  projectDescription: string;
  projectAddress: string;
  projectSize: number;
  projectTag: string;
};

// type ApplicationType = {
//   projectId: string;
//   companyId: string;
//   companyName: string;
//   companyPhotoUrl: string;
//   status: ApplicationStatus;
//   appliedOn: Timestamp;
//   enterpriseId: string;
//   projectName: string;
// };

exports.onApplicationApproved = functions.firestore
  .document("/applications/{appId}")
  .onUpdate(async (snap, context) => {
    const statusBefore = snap.before.data().status;
    const statusAfter = snap.after.data().status;
    const { projectId, companyId, companyName, companyPhotoUrl } =
      snap.after.data();
    console.log(projectId, companyId, companyName, companyPhotoUrl);
    if (
      statusBefore === ApplicationStatus.PENDING &&
      statusAfter === ApplicationStatus.APPROVED
    ) {
      await admin
        .firestore()
        .collection("projects")
        .doc(projectId)
        .get()
        .then(async (response) => {
          const { projectStart, projectEnd, projectTag, joined } =
            response.data() as ProjectType;
          await admin.firestore().collection("events").add({
            projectId,
            projectStart,
            projectEnd,
            companyId,
            projectTag,
            completed: false,
          });
          await admin
            .firestore()
            .collection("projects")
            .doc(projectId)
            .update({
              joined: [...joined, { companyId, companyName, companyPhotoUrl }],
            });
        });
    }
  });
