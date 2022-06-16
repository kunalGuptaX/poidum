import { extendTheme, theme as chakraTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    //   primary: {
    //     main: "rgb(26, 137, 23)",
    //   },
    //   secondary: {
    //     main: "#FFC017",
    //   },
    green: {
      500: "rgb(26, 137, 23)",
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: "green",
      },
    },
  },
  // colors: {
  //   brand: {
  //     100: "#f7fafc",
  //     // ...
  //     900: "#1a202c",
  //   },
  // },
} as typeof chakraTheme);
