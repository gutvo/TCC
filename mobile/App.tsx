import React from "react";
import { NativeBaseProvider, Box, Center, extendTheme, Button } from "native-base";

const newColorTheme = {
  brand: {
    900: "#8287af",
    800: "#7c83db",
    700: "#b3bef6",
  },
};
const theme = extendTheme({ colors: newColorTheme });

export default function App() {
  return (
    <NativeBaseProvider theme={theme} >
      <Center>
        <Box color=''>Hello world</Box>
        <Button>teste</Button>
      </Center>
    </NativeBaseProvider>
  );
}