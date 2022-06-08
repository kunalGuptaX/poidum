import { Box, chakra, Flex, Heading, Stack } from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button, SmallPrimaryButton } from "../components/Button";
import DisplayPicture from "../components/DisplayPicture";
import { LabeledInput } from "../components/Input/LabeledInput";
import Router from "next/router";

type Props = {
  session: Session;
};

const StyledHeading = chakra(Heading, {
  baseStyle: {
    fontFamily: "'New York', serif",
    fontWeight: 800,
    textAlign: "center",
  },
});

const Profile = ({ session }: Props) => {
  const [uploadedImage, setUploadedImage] = useState<File>();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png", ".jpeg", ".jpg"],
    },
    maxFiles: 1,
  });

  const formikPicture = useFormik({
    initialValues: {
      displayPicture: session.displayPicture,
    },
    onSubmit: async (values) => {
      if (!uploadedImage) {
        return;
      }
      try {
        const formData = new FormData();
        const imageBuffer = await uploadedImage?.arrayBuffer()!;
        const imageBlob = new Blob([new Uint8Array(imageBuffer)], {
          type: uploadedImage?.type,
        });
        formData.append("image", imageBlob);

        const response = await axios.post(
          "http://localhost:4000/api/users/update/displayPicture",
          formData,
          {
            headers: {
              authorization: `Bearer ${session.accessToken}`,
            },
          }
        );

        Router.reload();
      } catch (Er) {
        console.log(Er);
      }
    },
  });

  const formikProfile = useFormik({
    initialValues: {
      firstName: (session.firstName as string) || "",
      lastName: (session.lastName as string) || "",
      email: (session.email as string) || "",
    },
    onSubmit: async (values) => {
      const response = await axios.post(
        "http://localhost:4000/api/users/update/profile",
        {
          firstName: values.firstName,
          lastName: values.lastName,
        },
        {
          headers: {
            authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      Router.reload();
    },
  });

  useEffect(() => {
    if (acceptedFiles?.[0]) {
      setUploadedImage(acceptedFiles[0]);
    }
  }, [acceptedFiles]);

  return (
    <Box padding="24px 20px">
      <Box maxWidth={700} margin="auto">
        <Stack spacing={6}>
          <StyledHeading>My Profile</StyledHeading>
          <Stack direction="row" spacing={10}>
            <form onSubmit={formikPicture.handleSubmit}>
              <Flex
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  width="fit-content"
                  cursor="pointer"
                  marginTop="20px"
                  marginBottom="20px"
                  {...getRootProps({ className: "dropzone" })}
                >
                  <input {...getInputProps()} />
                  <DisplayPicture size="2xl" override={uploadedImage as File} />
                </Box>
                <SmallPrimaryButton disabled={!uploadedImage} type="submit">
                  Update
                </SmallPrimaryButton>
              </Flex>
            </form>
            <form onSubmit={formikProfile.handleSubmit}>
              <Stack spacing={4}>
                <Stack direction="row" spacing={4}>
                  <LabeledInput
                    name="firstName"
                    value={formikProfile.values.firstName}
                    label="First Name"
                    onChange={formikProfile.handleChange}
                  />
                  <LabeledInput
                    name="lastName"
                    value={formikProfile.values.lastName}
                    label="Last Name"
                    onChange={formikProfile.handleChange}
                  />
                </Stack>
                <LabeledInput
                  name="email"
                  value={formikProfile.values.email}
                  label="Email address"
                  onChange={formikProfile.handleChange}
                  /**@ts-ignore */
                  disabled
                />
                <SmallPrimaryButton type="submit" variant="outline">
                  Update
                </SmallPrimaryButton>
              </Stack>
            </form>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Profile;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
      props: {},
    };
  }

  return {
    props: {
      session,
    },
  };
}
