import React from "react";
import StoreProvider from "./components/StoreProvider";
import Form from "./components/Form";
import List from "./components/List";
import "./index.css";

function App() {
  return (
    <StoreProvider>
      <div className="divForm">
        <div className="divh3">
          <h3 id="h3todo">To-Do List</h3>
        </div>
        <Form />
      </div>
      <List />
    </StoreProvider>
  );
}
export default App;
