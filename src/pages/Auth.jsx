import { useState } from "react";
import styled from "styled-components";
import SignUpForm from "../components/SignUpForm";
import SignInForm from "../components/SignInForm";

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
`;

const SignUpAndSignIn = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  width: 40%;
  font-size: 1.6rem;
  border-radius: 1rem;
  padding-bottom: 4rem;

  @media screen and (max-width: 1300px) {
    width: 50%;
  }

  @media screen and (max-width: 1060px) {
    width: 60%;
  }

  @media screen and (max-width: 780px) {
    width: 80%;
  }

  @media screen and (max-width: 550px) {
    width: 98%;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const SignInSpan = styled.span`
  letter-spacing: 3px;
  background-color: ${({ toggle }) => (toggle ? "#7474cb" : "#9191e8")};
  flex: 1;
  text-align: center;
  padding: 2rem 0;
  cursor: pointer;
  border-top-right-radius: 1rem;
`;
const SignUpSpan = styled.span`
  cursor: pointer;
  border-top-left-radius: 1rem;
  background-color: ${({ toggle }) => (toggle ? "#9191e8" : "#7474cb")};
  text-align: center;
  letter-spacing: 3px;
  padding: 2rem 0;
  flex: 1;
`;

const Auth = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <Container>
      <SignUpAndSignIn>
        <BtnContainer>
          <SignUpSpan toggle={toggle} onClick={() => setToggle(false)}>
            Sign Up
          </SignUpSpan>
          <SignInSpan toggle={toggle} onClick={() => setToggle(true)}>
            Sign In
          </SignInSpan>
        </BtnContainer>
        {toggle ? <SignInForm /> : <SignUpForm />}
      </SignUpAndSignIn>
    </Container>
  );
};

export default Auth;
