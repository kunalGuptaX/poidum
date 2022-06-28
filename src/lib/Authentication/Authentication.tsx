import { useRouter } from "next/router";
import React from "react";
import { Modal } from "../../atoms/Modal";
import { useAuth } from "./AuthProvider";
import Signin from "./Signin";
import SigninWithEmail from "./SignInWithEmail";
import Signup from "./Signup";
import SignUpWithEmail from "./SignUpWithEmail";

const Authentication = () => {
  const {
    signInOpen,
    signUpOpen,
    closeAuthenticationModal,
    emailSignInOpen,
    emailSignUpOpen,
  } = useAuth();

  if (emailSignInOpen || emailSignUpOpen) {
    return (
      <Modal
        isOpen={emailSignInOpen || emailSignUpOpen}
        header={emailSignInOpen ? "Sign in with email" : "Sign up with email"}
        onClose={closeAuthenticationModal}
      >
        {emailSignInOpen ? <SigninWithEmail /> : <SignUpWithEmail />}
      </Modal>
    );
  }
  return (
    <Modal
      isOpen={signInOpen || signUpOpen}
      header={signInOpen ? "Welcome back." : "Join Podium."}
      onClose={closeAuthenticationModal}
    >
      {signInOpen ? <Signin /> : <Signup />}
    </Modal>
  );
};

export default Authentication;
