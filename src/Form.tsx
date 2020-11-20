import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useColorMode,
} from "@chakra-ui/react";
import { useFormik } from "formik";
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
  }, []);

  const form = useFormik(
    React.useMemo(
      () => ({
        initialValues,
        validationSchema,
        onSubmit: console.log,
      }),
      []
    )
  );

  const { onBlur, ...jmbgProps } = form.getFieldProps("jmbg");
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
            {...jmbgProps}
            onBlur={React.useCallback(
              (e) => {
                onBlur(e);

                validateJmbg((error) => form.setFieldError("jmbg", error))(
                  e.target.value
                );
              },
              [onBlur]
            )}
            placeholder="1234567890123"
          />
          <FormErrorMessage>{form.errors.jmbg}</FormErrorMessage>
        </FormControl>
        <Button type="submit" onClick={form.submitForm}>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Form;
