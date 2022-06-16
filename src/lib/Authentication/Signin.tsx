import {
    Box,
    Button,
    Stack,
  } from "@chakra-ui/react";
  import React from "react";
  import { AiOutlineMail } from "react-icons/ai";
  import { FcGoogle } from "react-icons/fc";
  import { GrFacebook } from "react-icons/gr";
  import { SecondaryButton } from "../../components/Button";
  import Modal from "../../components/Modal";
import { useAuth } from "./AuthProvider";

  
  const Signin = () => {
  const { openSignUpModal, openEmailSignIn } = useAuth();

    return (
      <>
        <Stack spacing={3} width="fit-content" margin="0 auto" marginTop="50px">
          <SecondaryButton display="flex" justifyContent="flex-start">
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="start"
            >
              <FcGoogle size={20} />
              <span>Sign in with Google</span>
            </Stack>
          </SecondaryButton>
          <SecondaryButton display="flex" justifyContent="flex-start">
            <Stack direction="row" spacing={2} alignItems="center">
              <GrFacebook size={18} color="#3e5b97" />
              <span>Sign in with Facebook</span>
            </Stack>
          </SecondaryButton>
          <SecondaryButton display="flex" justifyContent="flex-start" onClick={openEmailSignIn}>
            <Stack direction="row" spacing={2} alignItems="center">
              <AiOutlineMail size={18} color="#000" />
              <span>Sign in with Email</span>
            </Stack>
          </SecondaryButton>
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          margin="auto"
          alignItems="center"
          justifyContent="center"
          marginTop="40px"
          marginBottom="100px"
        >
          <span>No account?</span>
          <Button variant="link" fontWeight="bold" onClick={openSignUpModal}>
            Create one
          </Button>
        </Stack>
        <Box
          color="rgba(117, 117, 117, 1)"
          fontSize="13px"
          textAlign="center"
          width="450px"
          margin="0 auto"
        >
          Click “Sign Up” to agree to Medium’s Terms of Service and acknowledge
          that Medium’s Privacy Policy applies to you.
        </Box>
      </>
    );
  };
  
  export default Signin;
  