import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useEffect, useRef, useState } from "react";

function App() {
  const [mylist, setMylist] = useState<number[]>([]);

  useEffect(() => {
    console.log("mylist");
  }, [2]);

  function change() {
    mylist.push(2);
    setMylist([...mylist]);
  }

  return (
    <div>
      <button onClick={change}>Click</button>
    </div>
  );
}

export default App;
