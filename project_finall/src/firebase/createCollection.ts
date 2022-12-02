import { db} from '../firebase/config_firebase';
import { collection, DocumentData } from "firebase/firestore";

const createCollection = <T = DocumentData>(collectionName: string) => {
    return collection(db, collectionName);
};




export const AccountCollection = createCollection("Account");