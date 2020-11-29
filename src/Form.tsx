import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useColorMode,
} from "@chakra-ui/react";
import { FormikErrors, useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { Person } from "./models";
import { validateJmbg } from "./utils";

export interface FormProps {}

const initialValues: Person = {
  firstName: "",
  lastName: "",
  jmbg: "",
};

const validationSchema = yup.object().required().shape<Person>({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  jmbg: yup.string().required(),
});

const Form: React.FC<FormProps> = () => {
  const { toggleColorMode } = useColorMode();
  React.useEffect(() => {
    toggleColorMode();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const form = useFormik({
    initialValues,
    onSubmit: ({ jmbg, ...values }: Person) => {
      console.table({ ...values, jmbg: validateJmbg(jmbg) });
    },
    validate: (person): Promise<FormikErrors<Person>> => {
      return Promise.allSettled(
        Object.keys(person).map((key) => {
          return validationSchema.validateAt(key, person).then(() => key);
        })
      ).then((results) => {
        const errors = Object.fromEntries(
          results
            .filter(
              (result): result is PromiseRejectedResult =>
                result.status === "rejected"
            )
            .map((result) => {
              const error: yup.ValidationError = result.reason;
              return [error.path, error.errors[0]];
            })
        );
        if (errors.jmbg) {
          return errors;
        } else {
          const error = validateJmbg(person.jmbg);
          if (error instanceof Error) {
            return { ...errors, jmbg: error.message };
          } else {
            return errors;
          }
        }
      });
    },
  });

  return (
    <Container height="100%" display="grid" alignItems="center">
      <form onSubmit={form.handleSubmit}>
        <FormControl
          mb={5}
          isInvalid={form.touched.firstName && !!form.errors.firstName}
        >
          <FormLabel>First Name</FormLabel>
          <Input
            type="text"
            {...form.getFieldProps("firstName")}
            placeholder="Jane"
          />
          <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
        </FormControl>
        <FormControl
          mb={5}
          isInvalid={form.touched.lastName && !!form.errors.lastName}
        >
          <FormLabel>Last Name</FormLabel>
          <Input
            type="text"
            {...form.getFieldProps("lastName")}
            placeholder="Doe"
          />
          <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
        </FormControl>
        <FormControl mb={5} isInvalid={form.touched.jmbg && !!form.errors.jmbg}>
          <FormLabel>JMBG</FormLabel>
          <Input
            type="text"
            {...form.getFieldProps("jmbg")}
            placeholder="1234567890123"
          />
          <FormErrorMessage>{form.errors.jmbg}</FormErrorMessage>
        </FormControl>
        <Button onClick={form.submitForm}>Submit</Button>
      </form>
    </Container>
  );
};

export default Form;
