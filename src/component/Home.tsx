import "./Home.scss";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from "../db/firebase";

export default function Home() {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);


  return (
    <div className="home">
      <div>User Logged In:</div>
      <div>{user?.email}</div>
    </div>
  )
}