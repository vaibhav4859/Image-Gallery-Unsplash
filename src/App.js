import { useState } from "react";
import './App.css';
import NavBar from './components/Navbar';
import Image from "./components/Image";
import ImageLists from "./components/ImageLists";

function App() {
  const [mode, setMode] = useState("light"); // state for light mode and dark mode
  const [searchText, setSearchText] = useState(""); // state for entered text according to which images will be shown from unspash api
  const [tags, setTags] = useState([]); // state for showing tags related to image searched

  const changeMode = () => setMode(mode === "light" ? "dark" : "light");
  const searchHandler = (text) => setSearchText(text);
  const tagHandler = (tag) => setTags(tag);


  return (
    <div className={`App ${mode === "dark" ? "dark" : "light"}`}>
      <NavBar changeMode={changeMode} mode={mode} onChange={searchHandler} />
      <Image mode={mode} onChange={searchHandler} searchText={searchText} tags={tags} />
      <ImageLists mode={mode} searchText={searchText} tagHandler={tagHandler} onChange={searchHandler} />
    </div>
  );
}

export default App;
