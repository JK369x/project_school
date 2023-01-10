import { db} from '../firebase/config_firebase';
import { collection, DocumentData } from "firebase/firestore";

const createCollection = (collectionName: string) => {
    return collection(db, collectionName);
};



export const CourseCollection = createCollection("Course");
export const AccountCollection = createCollection("Account");
export const CategoryCollection = createCollection("Category");
export const FavoriteCollection = createCollection("Favorite");