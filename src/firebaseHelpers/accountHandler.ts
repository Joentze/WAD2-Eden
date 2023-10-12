import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, collection, doc, Timestamp, getDoc } from "firebase/firestore";
import { useFirebaseAuth } from "vuefire";
import { db } from "../firebase";
export interface Account {
  email: string;
  companyDescription: string;
  companyName: string;
  siteUrl: string;
  phoneNo: string;
  accountType: "corporation" | "enterprise";
  photoUrl: string;
  createdOn?: Timestamp | Date;
}

export interface AccountSignUp extends Account {
  password: string;
}
const auth = useFirebaseAuth();
export const createNewAccount = async (
  account: AccountSignUp
): Promise<void> => {
  const {
    email,
    password,
    companyDescription,
    companyName,
    siteUrl,
    phoneNo,
    accountType,
    photoUrl,
  } = account;

  createUserWithEmailAndPassword(auth!, email, password)
    .then(async (response) => {
      try {
        await postNewAccount(response.user.uid, {
          email,
          companyDescription,
          companyName,
          siteUrl,
          phoneNo,
          accountType,
          photoUrl,
        });
      } catch (e) {
        console.error(e);
        throw new Error("There was something wrong with Firestore");
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export const postNewAccount = async (
  id: string,
  account: Account
): Promise<void> => {
  try {
    await setDoc(doc(db, "account", id), { ...account, createdOn: new Date() });
  } catch (e) {
    throw new Error(e as string);
  }
};

export const getAccountData = async (uid: string): Promise<Account> => {
  try {
    console.log(uid);
    const response = await getDoc(doc(db, "account", uid));
    console.log(response);
    return response.data() as unknown as Account;
  } catch (e) {
    throw new Error("There was an error getting account data!");
  }
};
