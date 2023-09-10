// firebaseAuth.js (or any suitable file)

import { getAuth } from "firebase/auth";
import firebaseApp from "./firebase";

const auth = getAuth(firebaseApp);

export default auth;
