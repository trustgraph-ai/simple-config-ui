
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
    apiKey: 'AIzaSyAQ9NXIjqpkUB8lWXlWblUYrDF7C4OcSTM',
    authDomain: 'trustgraph-demo.firebaseapp.com'
}

export const app = initializeApp(firebaseConfig);

