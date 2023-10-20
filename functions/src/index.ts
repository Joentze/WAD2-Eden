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
  projectTitle: string;
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
    // console.log(projectId, companyId, companyName, companyPhotoUrl);
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
          const { projectStart, projectEnd, projectTag, joined, projectTitle } =
            response.data() as ProjectType;
          await admin.firestore().collection("events").add({
            projectTitle,
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
exports.onProjectCompleted = functions.firestore
  .document("/projects/{projectId}")
  .onUpdate(async (snap, context) => {
    const completedBefore = snap.before.data().completed;
    const completedAfter = snap.after.data().completed;
    const projectId = snap.after.id;
    if (completedBefore === false && completedAfter === true) {
      await admin
        .firestore()
        .collection("events")
        .where("projectId", "==", projectId)
        .get()
        .then(async (querySnapshot) => {
          querySnapshot.forEach(async (doc) => {
            admin
              .firestore()
              .collection("events")
              .doc(doc.id)
              .update({ completed: true });
          });
        });
    }
  });
