// API domain settings
const REMOTE_SERVER = (process.env.NODE_ENV === 'development')
  ? (process.env.REACT_APP_API_DOMAIN || 'localhost')
  : (process.env.REACT_APP_API_STAGING_DOMAIN || 'localhost');
  
const REMOTE_SERVER_URL = `${window.location.protocol}//${REMOTE_SERVER}`;

if (window.location.protocol === 'https' && process.env.NODE_ENV === 'development') {
  throw new Error('Please use http in development');
}

// Firebase config settings
const FIREBASE_SETTINGS = {
  production: {
    apiKey: process.env.REACT_APP_FB_API_KEY,
    authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FB_DATABASE_URL,
    projectId: process.env.REACT_APP_FB_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FB_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_FB_APP_ID,
    measurementId: process.env.REACT_APP_FB_MEASUREMENT_ID
  }
  
  //old DFAC credentials, hardcoded previously
  /*production: {
    apiKey: 'AIzaSyCe4BWm9kbjXFwlZcmq4x8DvLD3TDoinhA',
    authDomain: 'crosswordsio.firebaseapp.com',
    databaseURL: 'https://crosswordsio.firebaseio.com',
    projectId: 'crosswordsio',
    storageBucket: 'crosswordsio.appspot.com',
    messagingSenderId: '1021412055058',
  },
    development: {
    apiKey: 'AIzaSyC4Er27aLKgSK4u2Z8aRfD6mr8AvLPA8tA',
    authDomain: 'dfac-fa059.firebaseapp.com',
    databaseURL: 'https://dfac-fa059.firebaseio.com',
    projectId: 'dfac-fa059',
    storageBucket: 'dfac-fa059.appspot.com',
    messagingSenderId: '132564774895',
    appId: '1:132564774895:web:a3bf48cd38c4df81e8901a',
  },*/
}

export const SERVER_URL = process.env.REACT_APP_USE_LOCAL_SERVER
  ? 'http://localhost:3021'
  : REMOTE_SERVER_URL;

// socket.io server is same as api server
export const SOCKET_HOST = SERVER_URL;

export const FIREBASE_CONFIG = FIREBASE_SETTINGS;