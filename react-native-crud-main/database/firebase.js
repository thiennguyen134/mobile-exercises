import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

// Import controllers/secrets.js
import * as secret from '../controllers/secrets'

// const firebaseConfig = {
    // apiKey: secret.apiKey,
    // authDomain: secret.authDomain,
    // databaseURL: secret.databaseURL,
    // projectId: secret.projectId,
    // storageBucket: secret.storageBucket,
    // messagingSenderId: secret.messagingSenderId,
    // appId: secret.appId
// };

const firebaseConfig = secret.firebaseConfig;

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;