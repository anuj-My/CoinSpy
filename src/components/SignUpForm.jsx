import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import FormInput from "./FormInput";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../api/firebase";

const Container = styled.div``;
const Form = styled.form``;

const SignUpForm = () => {
  const defaultInput = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [inputFields, setInputFields] = useState(defaultInput);

  console.log(inputFields);
  const { displayName, email, password, confirmPassword } = inputFields;
  const ChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputFields({
      ...inputFields,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) alert("password does not match!");

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      createUserDocumentFromAuth(user, { displayName });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Container>
      <Form onSubmit={submitHandler}>
        <FormInput
          label="Full Name"
          type="text"
          name="displayName"
          value={displayName}
          onChange={ChangeHandler}
          required
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={ChangeHandler}
          required
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={ChangeHandler}
          required
        />
        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={ChangeHandler}
          required
        />

        <Button title="Sign Up" type="submit" />
      </Form>
    </Container>
  );
};

export default SignUpForm;
