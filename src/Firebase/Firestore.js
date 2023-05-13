import { firestore } from "./Firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
export async function getWorkflows(userID) {
  return getDocs(
    collection(
      firestore,
      "users",
       userID,
      "workflows"
    )
  ).then((docs) => {
    let workflows = [];
    docs.forEach((doc) => {
        //add the doc id to the data
        let data=doc.data();
        data.id=doc.id;
      workflows.push(data);
    });
    return workflows;
  }).catch(
      (err)=>{
          console.log(err);
          alert("Error getting workflows");
      }
  );
}
