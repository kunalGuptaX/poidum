import React, { useContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

const AuthContext = React.createContext({
  openSignUpModal: () => {},
  openSignInModal: () => {},
  openEmailSignIn: () => {},
  openEmailSignUp: () => {},
  closeAuthenticationModal: () => {},
  signUpOpen: false,
  signInOpen: false,
  emailSignInOpen: false,
  emailSignUpOpen: false,
});

enum AuthTypes {
  SIGNIN = "SignIn",
  SIGNUP = "SignUp",
  EMAIL_SIGNIN = "EmailSignIn",
  EMAIL_SIGNUP = "EmailSignUp",
}

const AuthProvider = ({ children }: Props) => {
  const [authType, setAuthType] = useState<AuthTypes | null>(null);

  const openSignUpModal = () => {
    setAuthType(AuthTypes.SIGNUP);
  };

  const openSignInModal = () => {
    setAuthType(AuthTypes.SIGNIN);
  };

  const openEmailSignIn = () => {
    setAuthType(AuthTypes.EMAIL_SIGNIN);
  };

  const openEmailSignUp = () => {
    setAuthType(AuthTypes.EMAIL_SIGNUP);
  };

  const closeAuthenticationModal = () => {
    setAuthType(null);
  };

  return (
    <AuthContext.Provider
      value={{
        openSignUpModal,
        openSignInModal,
        openEmailSignIn,
        openEmailSignUp,
        signInOpen: authType === AuthTypes.SIGNIN,
        signUpOpen: authType === AuthTypes.SIGNUP,
        emailSignInOpen: authType === AuthTypes.EMAIL_SIGNIN,
        emailSignUpOpen: authType === AuthTypes.EMAIL_SIGNUP,
        closeAuthenticationModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
