//firebase.js
import firebase from "firebase/compat/app"
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDb8Yva1u6Mpu-3PZieMnoJnBQJubsgfe0",
  authDomain: "testing-d22ba.firebaseapp.com",
  projectId: "testing-d22ba",
  storageBucket: "testing-d22ba.appspot.com",
  messagingSenderId: "257602635842",
  appId: "1:257602635842:web:78405544fa0c9494f605db",
  measurementId: "G-L76366N0VK"
};

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
export { firestore };