import styled from "styled-components";
import { useState } from "react";
import FormInput from "./FormInput";
import Button from "./Button";
import {
  googleSignInWithPopup,
  createUserDocumentFromAuth,
  SignInAuthWithEmailAndPassword,
} from "../api/firebase";

const Container = styled.div``;
const Form = styled.form`
  width: 90%;
  margin: auto;
`;

const BtnContainer = styled.div`
  button:not(:last-child) {
    margin-right: 1rem;
  }
`;
const SignInForm = () => {
  const defaultInputs = {
    email: "",
    password: "",
  };

  const [inputFields, setInputFields] = useState(defaultInputs);

  console.log(inputFields);
  const { email, password } = inputFields;

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setInputFields({
      ...inputFields,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const signInWithGoogle = async () => {
    const { user } = await googleSignInWithPopup();
    console.log(user);

    createUserDocumentFromAuth(user);
  };

  const signInWithEmailAndPassword = async () => {
    const { user } = await SignInAuthWithEmailAndPassword(email, password);
    console.log(user);
  };

  return (
    <Container>
      <Form onSubmit={submitHandler}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={changeHandler}
          required
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={changeHandler}
          required
        />

        <BtnContainer>
          <Button
            title="Sign In"
            type="submit"
            onClick={signInWithEmailAndPassword}
          />
          <Button title="SignIn With Google" onClick={signInWithGoogle} />
        </BtnContainer>
      </Form>
    </Container>
  );
};

export default SignInForm;
