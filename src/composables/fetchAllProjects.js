import db from "@/firebase/init";
import { collection, getDocs, orderBy } from "firebase/firestore";
import timeStamptoSting from "./timeStamptoString";
import { ref } from "vue";

let fetchAllProjects = async (collectionName) => {
  let allDatas = ref([]);
  const querySnapshot = await getDocs(
    collection(db, collectionName),
    orderBy("completed_date", "desc")
  );
  querySnapshot.forEach((doc) => {
    const completedDateTimestamp = doc.data().completed_date;
    const completedDate = completedDateTimestamp.toDate();
    let formattedDate = timeStamptoSting(completedDate);

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
