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
import { defineString } from "firebase-functions/params";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

admin.initializeApp();

enum ApplicationStatus {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  PENDING = "PENDING",
}

enum PromptStatus {
  PROCESSING = "PROCESSING",
  COMPLETE = "COMPLETE",
  ERROR = "ERROR",
}

type JoinedType = {
  companyId: string;
  companyName: string;
  companyPhotoUrl: string;
};

interface PromptType {
  input: string;
  output?: string;
  status: PromptStatus;
}

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

interface SupabaseDocType {
  original_text: string;
  embedding: number[];
}
interface OpenAIPrompt {
  role: string;
  content: string;
}
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
const OPENAI_API_KEY = defineString("OPENAI_API_KEY");
const SUPABASE_URL = defineString("SUPABASE_URL");
const SUPABASE_PASS = defineString("SUPABASE_PASS");

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
          const {
            projectStart,
            projectEnd,
            projectTag,
            joined,
            projectTitle,
            projectAddress,
          } = response.data() as ProjectType;
          await admin.firestore().collection("events").add({
            projectTitle,
            projectId,
            projectStart,
            projectEnd,
            companyId,
            projectTag,
            projectAddress,
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
exports.onProjectCreated = functions.firestore
  .document("/projects/{projectId}")
  .onCreate(async (snap, context) => {
    const projectData = snap.data() as ProjectType;
    console.log(projectData);
    const projectId = snap.id;
    const supabaseClient: SupabaseClient = createClient(
      SUPABASE_URL.value(),
      SUPABASE_PASS.value()
    );
    const { projectTitle, projectDescription, projectTag, projectAddress } =
      projectData;
    const projectCorpus = `
    Project ID: ${projectId},
    Project Title: ${projectTitle},
      Project Description: ${projectDescription},
       Project Tag: ${projectTag},
        Project Address ${projectAddress}`;
    console.log(projectCorpus);
    return await fetch("https://api.openai.com/v1/embeddings", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY.value()}`,
      },
      method: "POST",
      body: JSON.stringify({
        input: projectCorpus,
        model: "text-embedding-ada-002",
      }),
    })
      .then(async (response) => {
        const { data } = await response.json();
        console.log(data);
        const embedding: number[] = data[0].embedding;
        const supabaseResponse = await writeEmbeddings(supabaseClient, {
          original_text: projectCorpus,
          embedding: embedding,
        });
        console.log(supabaseResponse);
      })
      .catch((error) => {
        console.log(error);
      });
  });

exports.onPromptCreated = functions.firestore
  .document("/prompts/{promptId}")
  .onCreate(async (snap, context) => {
    const newPrompt = snap.data() as PromptType;
    const promptId = snap.id as string;
    const supabaseClient: SupabaseClient = createClient(
      SUPABASE_URL.value(),
      SUPABASE_PASS.value()
    );
    const { input } = newPrompt;
    return await new Promise(async () => {
      const similarDocuments = await getBestDocumentMatch(
        supabaseClient,
        input
      );
      const documents: object[] = [];
      for (let thisDocument of similarDocuments) {
        const { original_text } = thisDocument as any;
        documents.push(original_text);
      }
      const llmResponse = await getLLMCompletion(
        { role: "user", content: input },
        documents.join("\n")
      );
      await admin
        .firestore()
        .collection("prompts")
        .doc(promptId)
        .update({
          ...newPrompt,
          status: PromptStatus.COMPLETE,
          output: llmResponse["content"],
        });
    });
  });
const writeEmbeddings = async (
  supabase: SupabaseClient,
  embeddings: SupabaseDocType
): Promise<boolean> => {
  const { error } = await supabase.from("documents").insert(embeddings);
  return error ? false : true;
};

const getBestDocumentMatch = async (
  supabase: SupabaseClient,
  content: string
): Promise<object[]> => {
  const response = await fetch("https://api.openai.com/v1/embeddings", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY.value()}`,
    },
    method: "POST",
    body: JSON.stringify({
      input: content,
      model: "text-embedding-ada-002",
    }),
  });
  const responseData = ((await response.json()) as any)["data"];
  const embeddings: number[] = responseData[0].embedding;
  const { data, error } = await supabase.rpc("get_similar_document", {
    query_embedding: embeddings,
    threshold: 0.7,
    no_of_matches: 3,
  });
  return error ? error : data;
};
const getLLMCompletion = async (
  prompt: OpenAIPrompt,
  context: string
): Promise<OpenAIPrompt> => {
  try {
    const { content } = prompt;
    const chatResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY.value()}`,
        },
        method: "POST",
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
              role: "user",
              content: `You are a helpful assistant and you respond to the query based on the context below. If you do not know the answer, say you don't know
            
            context:
            ${context}

            query:
            ${content}

            response:`,
            },
          ],
        }),
      }
    );
    const gptResponse = await chatResponse.json();
    const completion = gptResponse["choices"][0]["message"];
    return completion as OpenAIPrompt;
  } catch (e) {
    throw new Error(e as string);
  }
};
