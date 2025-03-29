
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
    apiKey: 'AIzaSyDr7cyqjWqviTju8pOg6SGGVHPlYnp1X3A',
    authDomain: 'trustgraph-demo.firebaseapp.com'
}

export const app = initializeApp(firebaseConfig);

