import { useFormik } from 'formik';
import React from 'react';
import { hot } from 'react-hot-loader';
import * as yup from 'yup';

interface Person {
  firstName: string
  lastName: string
  jmbg: string
}

const initialValues: Person = {
  firstName: '',
  lastName: '',
  jmbg: '',
} 

const validationSchema = yup.object().required().shape<Person>({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  jmbg: yup.string().required(),
})

function App() {
  const form  = useFormik(React.useMemo(() => ({
    initialValues,
    validationSchema,
    onSubmit: console.log,
  }), []))
  
  return (
    <div>
      <form onSubmit={form.handleSubmit}>
        <label >
          Name
          <input {...form.getFieldProps('name')} placeholder="Jane" />
        </label>
        <label >
          Last Name
          <input {...form.getFieldProps('lastName')} placeholder="Doe" />
        </label>
        <label >
          JMBG
          <input {...form.getFieldProps('jmbg')} placeholder="2008998715084" />
        </label>
        <button type="submit" onClick={form.submitForm}>Submit</button>
      </form>
    </div>
  );
}

export default hot(module)(App);
