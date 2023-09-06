import db from "@/firebase/init";
import {
  collection,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import timeStamptoString from "./timeStamptoString";
import { ref } from "vue";

let fetchAllProjects = async (collectionName) => {
  let allDatas = ref([]);
  const q = query(
    collection(db, collectionName),
    orderBy("completed_date", "desc")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const completedDateTimestamp = doc.data().completed_date;
    const completedDate = completedDateTimestamp.toDate();
    let formattedDate = timeStamptoString(completedDate);

    const ProjectData = {
      id: doc.id,
      ...doc.data(),
      completed_date: formattedDate,
    };

    allDatas.value.push(ProjectData);
  });

  return allDatas.value;
};

export default fetchAllProjects;
