import {
    Flex,
    Modal as ChakraModal,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useMediaQuery,
    ModalProps,
  } from "@chakra-ui/react";
  import React from "react";
  
  interface Props extends ModalProps {
    header: string;
  }
  
  export const Modal = ({ children, header, ...props }: Props) => {
    const [isSmallerThan728] = useMediaQuery("(max-width: 728px)", {
      ssr: true,
    });
  
    const [isSmallerThan904] = useMediaQuery("(max-width: 904px)", {
      ssr: true,
    });
  
    const containerHeight = isSmallerThan904 ? "100vh" : "695px";
    const containerWidth = isSmallerThan904
      ? isSmallerThan728
        ? "100vw"
        : "600px"
      : "678px";
    return (
      <ChakraModal {...props}>
        <ModalOverlay backgroundColor="rgba(255, 255, 255, 0.95)" />
        <ModalContent
          margin="auto 0"
          boxShadow="rgb(0 0 0 / 15%) 0px 2px 10px"
          borderRadius="0"
          maxWidth="100%"
          width="fit-content"
        >
          <ModalCloseButton color="rgba(117, 117, 117, 1)" />
  
          <Flex
            direction="column"
            margin="auto"
            width={containerWidth}
            height={containerHeight}
            justifyContent="center"
          >
            <ModalHeader
              fontFamily="charter"
              fontSize="28px"
              fontWeight={400}
              textAlign="center"
              marginBottom="24px"
            >
              {header}
            </ModalHeader>
            {children}
          </Flex>
        </ModalContent>
      </ChakraModal>
    );
  };

  