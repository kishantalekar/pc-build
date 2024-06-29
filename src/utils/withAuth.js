// utils/withAuth.js
import { useRouter } from "next/router";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

const withAuth = (Component) => {
  return (props) => {
    const router = useRouter();

    return (
      <>
        <SignedIn>
          <Component {...props} />
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn redirectUrl={router.pathname} />
        </SignedOut>
      </>
    );
  };
};

export default withAuth;
