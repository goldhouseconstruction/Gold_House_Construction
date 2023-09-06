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

// while we use this composable function at some where, we have to assign this arrays object to variable directly like this
// allcompletedProjects.value = allDatas;
// because we returned whole array object(not like one per loop), so we can't use array push like this allcompletedProjects.value.push(allDatas)
