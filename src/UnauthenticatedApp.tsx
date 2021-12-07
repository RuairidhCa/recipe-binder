import * as React from "react";
import { Box, Container } from "@chakra-ui/react";
import LoginForm from "./components/LoginForm";
import { ReactComponent as Logo } from "./assets/loginIcon.svg";
function UnauthenticatedApp() {
  return (
    <Container
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        boxShadow="2xl"
        px="6"
        rounded="md"
        minH="50vh"
        minW="40vw"
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        alignContent="center"
      >
        <Logo
          fill="#3182CE"
          style={{ alignSelf: "center", height: "150px", width: "150px" }}
        />
        <LoginForm />
      </Box>
    </Container>
  );
}

export default UnauthenticatedApp;
