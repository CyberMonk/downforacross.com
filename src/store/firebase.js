import {FIREBASE_CONFIG} from '../api/constants';

import firebase from 'firebase/app';
// eslint-disable-next-line import/no-duplicates
import 'firebase/database';
// eslint-disable-next-line import/no-duplicates
import 'firebase/auth';

const offline = false;
const config = FIREBASE_CONFIG.production;

firebase.initializeApp(config);
const db = firebase.database();

const SERVER_TIME = firebase.database.ServerValue.TIMESTAMP;

const offsetRef = firebase.database().ref('.info/serverTimeOffset');
let offset = 0;
offsetRef.once('value', (result) => {
  offset = result.val();
});

function getTime() {
  return new Date().getTime() + offset;
}
export {db, SERVER_TIME};

export {offline, getTime};

export default firebase;
