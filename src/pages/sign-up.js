import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => (
  <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
);

export default SignUpPage;
