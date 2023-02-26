import styled from "styled-components";
import SignUpForm from "../components/SignUpForm";
import SignInForm from "../components/SignInForm";

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const SignUpAndSignIn = styled.div`
  background-color: red;
  padding: 2rem;
  font-size: 1.6rem;
`;

const SignUpPage = () => {
  return (
    <Container>
      <SignUpAndSignIn>
        <SignInForm />
        <SignUpForm />
      </SignUpAndSignIn>
    </Container>
  );
};

export default SignUpPage;
