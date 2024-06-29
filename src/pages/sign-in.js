import { SignIn } from "@clerk/clerk-react";
import styled from "styled-components";

const Background = styled.div`
  background-image: url("./login_background.jpeg");
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.h2`
  color: white;
`;

const SignInPage = () => (
  <Background>
    <Text>Hello</Text>
    <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
  </Background>
);

export default SignInPage;
