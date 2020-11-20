import { Form } from "formik";
import React from "react";
import Provider from "./Provider";

function App() {
  return (
    <Provider>
      <Form />
    </Provider>
  );
}

export default App;
