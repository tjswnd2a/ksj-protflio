import { firestore } from "../db/firebase";
import { getDocs, collection } from "firebase/firestore";

export function FireStore_DocLoad(): any {
  const getUser = async () => {
    const querySnapshot = await getDocs(collection(firestore, "user"));
    return querySnapshot;
  }
  getUser();
}