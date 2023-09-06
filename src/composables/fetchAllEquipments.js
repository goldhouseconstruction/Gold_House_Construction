import db from "@/firebase/init";
import { collection, getDocs } from "firebase/firestore";
import { ref } from "vue";

let fetchAllEquipments = async (collectionName) => {
  let allDatas = ref([]);
  const querySnapshot = await getDocs(collection(db, collectionName));
  querySnapshot.forEach((doc) => {
    const EquipmentData = { id: doc.id, ...doc.data() };
    allDatas.value.push(EquipmentData);
  });
  return allDatas.value;
};

export default fetchAllEquipments;
