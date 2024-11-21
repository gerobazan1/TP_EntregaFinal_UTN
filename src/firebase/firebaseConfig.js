import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore"; 
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyAw3yM5izhHtSck5iUjcux6dWxXyj2QVW8",
  authDomain: "ecommerce-react-utn-ac7db.firebaseapp.com",
  projectId: "ecommerce-react-utn-ac7db",
  storageBucket: "ecommerce-react-utn-ac7db.firebasestorage.app",
  messagingSenderId: "927286669314",
  appId: "1:927286669314:web:a8c48b2349e25818ac371b",
  measurementId: "G-HDSSGHLFZ9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); 

export { app, db, auth };

export const getProducts = async () => {
  const productsCol = collection(db, 'products');
  const productSnapshot = await getDocs(productsCol);
  const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return productList;
};

export const getProductById = async (id) => {
  const productDoc = doc(db, 'products', id);
  const productSnapshot = await getDoc(productDoc);
  if (productSnapshot.exists()) {
    return { id: productSnapshot.id, ...productSnapshot.data() };
  } else {
    throw new Error('Producto no encontrado');
  }
};
