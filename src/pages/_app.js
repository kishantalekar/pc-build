import Footer from "@/components/UI/Footer";
import Navbar from "@/components/UI/Navbar";
import { store } from "@/redux/store";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { DataProvider } from "@/store/GlobalState";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";

const clerkFrontendApi = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider
      frontendApi={clerkFrontendApi}
      publishableKey={clerkFrontendApi}
    >
      <DataProvider>
        <Provider store={store}>
          <SessionProvider session={pageProps.session}>
            <Navbar />
            <div>
              <Component {...pageProps} />
              <Toaster />
            </div>
            {/* <Footer /> */}
          </SessionProvider>
        </Provider>
      </DataProvider>
    </ClerkProvider>
  );
}
