import firebase from 'firebase/app'
import 'firebase/auth'
import database from 'firebase/database'
import Rebase from 're-base'



let app = firebase.initializeApp({
    apiKey: "AIzaSyCm0jK5vNR0ReGioasbburhDboFMqoVvM0",
    authDomain: "viswakarta-chat.firebaseapp.com",
    databaseURL: "https://viswakarta-chat.firebaseio.com",
    projectId: "viswakarta-chat",
    storageBucket: "viswakarta-chat.appspot.com",
    messagingSenderId: "373273139171"
});

export const auth = firebase.auth;

let db = firebase.database(app);
export let base = Rebase.createClass(db);





