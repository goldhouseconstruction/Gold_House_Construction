import db from "@/firebase/init";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";

let addNewEqp = async (newEqpData) => {
  const docRef = await addDoc(collection(db, "equipments"), newEqpData);
  // Fetch the newly added equipment from Firestore using the docRef
  const equipmentSnapshot = await getDoc(doc(db, "equipments", docRef.id));
  const newEquipment = { id: docRef.id, ...equipmentSnapshot.data() };

  // Update the local array currentEquipment with the new equipment
  return newEquipment;
};

export default addNewEqp;
