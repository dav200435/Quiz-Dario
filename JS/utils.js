import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBBgEi69uoQg1ej3IPRBSBOZxkeMWl6PZo",
  authDomain: "quiz-v3-7bd31.firebaseapp.com",
  projectId: "quiz-v3-7bd31",
  storageBucket: "quiz-v3-7bd31.appspot.com",
  messagingSenderId: "336623719831",
  appId: "1:336623719831:web:0ee8f133929c264ed7e0d2"
};


// Guardamos en constantes las tablas Users, Ranking y Quiz de nuestra de datos firebase.
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const Users = await getDocs(collection(db, "Users"));
const Ranking = await getDocs(collection(db, "Ranking"));
const Quiz = await getDocs(collection(db, "Preguntas"));


// Este ejemplo vale para las tres funciones get.
// Al utilizar la funcion sacara una lista con [id, usuario, contraseña], teniendo distintos id en distintas listas.
export function getUsers() {

  var users = []
  Users.forEach((doc) => {
    var id = doc.id;
    var usuario = doc.data()["Users"];
    var contraseña = doc.data()["contraseña"];
    users.push([id, usuario, contraseña]);
  });
  return users;
}

export function getRanking() {

  var userAciertos = [];
  Ranking.forEach((doc) => {
    var id = doc.id;
    var aciertos = doc.data()["aciertos"];
    var userId = doc.data()["usuario"]["id"];
    Users.forEach((doc) => {
      doc.id == userId ? userId = doc.data()["Users"]: userId = userId;
    });
    userAciertos.push([id, userId, aciertos]);
  });
  return userAciertos;
}

export function getPreguntas() {
  var id = [];
  var quiz = [];
  Quiz.forEach((doc) => {
    id.push(doc.id);
    var categoria = doc.data()["category"];
    var correcta = doc.data()["correct_answer"];
    var dificultad = doc.data()["difficulty"];
    var incorrectas = doc.data()["incorrect_answers"];
    var preguntas = doc.data()["question"];
    var tipoPregunta = doc.data()["type"];
    quiz.push([categoria, correcta, dificultad, incorrectas, preguntas, tipoPregunta]);
  });
  return quiz;
}


// Este ejemplo vale para las funciones asicronas, las cules crean a los nuevos usuarios y sus posiciones en el ranking
export async function registro(username, password, id) {
  await setDoc(doc(db, "Users", id), {Users: username, contraseña: password});
}

export async function ranking(usernameId, idranking, points=0) {
  const userDocRef = doc(db, "Users", usernameId);
  await setDoc(doc(db, "Ranking", idranking), {usuario: userDocRef, aciertos: points})
}