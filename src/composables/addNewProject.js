import db from "@/firebase/init";
import timeStamptoString from "./timeStamptoString";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";

let addNewProject = async (newProjectData) => {
  const docRef = await addDoc(
    collection(db, "completed_projects"),
    newProjectData
  );
  // Fetch the newly added equipment from Firestore using the docRef
  const projectSnapshot = await getDoc(
    doc(db, "completed_projects", docRef.id)
  );
  const completedDateTimestamp = projectSnapshot.data().completed_date;
  const completedDate = completedDateTimestamp.toDate();
  let formattedDate = timeStamptoString(completedDate);
  const newProject = {
    id: docRef.id,
    ...projectSnapshot.data(),
    completed_date: formattedDate,
  };

  // Update the local array currentProject with the new equipment
  return newProject;
};

export default addNewProject;
