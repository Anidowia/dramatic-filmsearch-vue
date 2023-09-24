import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, onSnapshot  } from 'firebase/firestore';
import {ref, onUnmounted} from 'vue'
const config = {
    apiKey: "AIzaSyAgNwqeM1TQtRye3OsFHx77Gd1xe9qVjOI",
    authDomain: "vue-proj-a5b1d.firebaseapp.com",
    projectId: "vue-proj-a5b1d",
    storageBucket: "vue-proj-a5b1d.appspot.com",
    messagingSenderId: "486253531102",
    appId: "1:486253531102:web:c8abfe31d098338f6ed74f",
    measurementId: "G-GTB0ZG6EEM"
}
const firebaseApp = initializeApp(config)
const db = getFirestore(firebaseApp)
const userCollection = collection(db, 'users')
const auth = getAuth(firebaseApp);

export { firebaseApp, db, auth };

export const createUser = async (user) => {
    try {
      const docRef = await addDoc(userCollection, user);
      return docRef.id;
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
};

export const getUser = async id => {
    const user = await userCollection.doc(id).get()
    return user.exists ? user.data(): null
}

export const updateUser = (id, user) => {
    return userCollection.doc(id).update(user)
}

export const deleteUser = id => {
    return userCollection.doc(id).delete()
}

export const useLoadUsers = () => {
    const users = ref([]);
    const q = query(userCollection); 
    const close = onSnapshot(q, (snapshot) => {
      users.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    });
    onUnmounted(close);
    return users;
};

export const loginUser = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true; 
  } catch (error) {
    console.error("Error signing in: ", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return true; 
  } catch (error) {
    console.error("Error signing out: ", error);
    throw error;
  }
};

export default firebaseApp;
