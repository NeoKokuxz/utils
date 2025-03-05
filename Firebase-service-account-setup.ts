import {
  initializeApp,
  ServiceAccount,
  cert,
  getApp,
  getApps,
} from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";
import { getAuth } from "firebase-admin/auth";
import { secrets } from "./secrets";

export type AppName = "production" | "staging";
export const googleServiceAccount: ServiceAccount = {
  privateKey: secrets.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY,
  clientEmail:
    "google.iam.gserviceaccount.com",
  projectId: "neo-playground",
};

if (!getApps().length) {
  initializeApp(
    {
      credential: cert(googleServiceAccount),
      databaseURL: `https://neo-playground.firebaseio.com`,
    },
    "production"
  );

  initializeApp(
    {
      credential: cert(googleServiceAccount),
      databaseURL: `https://neo-playground-dev.firebaseio.com`,
    },
    "staging"
  );
}

export function databaseFromAppName(appName: AppName) {
  return getDatabase(getApp(appName));
}

export const auth = getAuth(getApp("production"));

// secrets.ts file
interface Secret {
  FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY: string;
}
// injected from parameter store -> amplify build -> next.config.mjs
if (!process.env.secrets) {
  throw Error("missing process.env.secrets");
}

export const secrets: Secret = JSON.parse(process.env.secrets);
