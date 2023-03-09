import { useState } from "react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import Button from "./Button";
import FormInput from "./FormInput";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../api/firebase";
import { signInWithGoogle } from "./SignInForm";

const Container = styled.div``;
const Form = styled.form`
  width: 90%;
  margin: auto;
`;

const BtnContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const SignUpForm = () => {
  const defaultInput = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [inputFields, setInputFields] = useState(defaultInput);

  const { displayName, email, password, confirmPassword } = inputFields;

  const resetFormFields = () => {
    setInputFields(defaultInput);
  };

  const changeHandler = (e) => {
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

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("cannot create user, email already in use");
      } else {
        console.log(`user creation encountered an error`, err);
      }
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
          onChange={changeHandler}
          required
        />
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
        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={changeHandler}
          required
        />
        <BtnContainer>
          <Button title="Sign Up" type="submit" />
          <Button
            title="SignIn with Google"
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

export default SignUpForm;
