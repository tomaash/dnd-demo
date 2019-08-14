import React from "react";
import ReactDOM from "react-dom";
import { Example } from "./example";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import * as serviceWorker from "./serviceWorker";
import { StoreProvider } from "./store";

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <DndProvider backend={HTML5Backend}>
          <Example />
        </DndProvider>
      </StoreProvider>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
