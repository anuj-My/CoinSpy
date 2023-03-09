import { useState } from "react";
import styled from "styled-components";
import FormInput from "./FormInput";
import Button from "./Button";
import { FcGoogle } from "react-icons/fc";

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
  display: flex;
  gap: 1rem;
`;

export const signInWithGoogle = async () => {
  const { user } = await googleSignInWithPopup();
  await createUserDocumentFromAuth(user);
};

const SignInForm = () => {
  const defaultInputs = {
    email: "",
    password: "",
  };

  const [inputFields, setInputFields] = useState(defaultInputs);

  const { email, password } = inputFields;

  const resetFormFields = () => {
    setInputFields(defaultInputs);
  };

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

  const signInWithEmailAndPassword = async () => {
    try {
      await SignInAuthWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        default:
          console.log(error);
      }
    }
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
          <Button
            title="SignIn With Google"
            icon={<FcGoogle />}
            style={{
              color: "black",
              backgroundColor: "white",
            }}
            type="button"
            onClick={signInWithGoogle}
          />
        </BtnContainer>
      </Form>
    </Container>
  );
};

export default SignInForm;
