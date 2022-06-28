import { Box } from "@chakra-ui/react";
import React from "react";
import MobileNavbarItems from "./Partials/MobileNavbarItems";
import MobileTopNav from "./Partials/MobileTopNav";

type Props = {
  middleContent: React.ReactNode;
};

const MobileVerticalLayout = ({ middleContent }: Props) => {
  return (
    <div style={{ maxWidth: "1504px", margin: "auto", position: "relative" }}>
      <MobileTopNav />
      <Box marginTop="56px" marginBottom="56px" height="100vh" overflow="auto" width="100%" padding="24px">
        {middleContent}
      </Box>
      <MobileNavbarItems />
    </div>
  );
};

export default MobileVerticalLayout;
