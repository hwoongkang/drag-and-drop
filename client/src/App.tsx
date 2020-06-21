import React from "react";
import { RecoilRoot } from "recoil";

import "./App.css";
import ImageContainer from "./components/ImageContainer";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <ImageContainer />
      </div>
    </RecoilRoot>
  );
}

export default App;
