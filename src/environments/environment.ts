export const environment = {
  production: false,
};

import { initializeApp } from 'firebase/app';
const firebaseConfig = {
  apiKey: 'AIzaSyD28ejFyr1UEj-vyRhON3xcKAkciBF4rfs',
  authDomain: 'mtec-movie-project.firebaseapp.com',
  projectId: 'mtec-movie-project',
  storageBucket: 'mtec-movie-project.appspot.com',
  messagingSenderId: '135893341618',
  appId: '1:135893341618:web:bc4bd5ef1cc49c9c1e00ab',
};

const app = initializeApp(firebaseConfig);
