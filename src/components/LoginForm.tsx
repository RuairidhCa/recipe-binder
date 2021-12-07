import React from "react";
import validator from "validator";

import {
  Alert,
  AlertIcon,
  AlertDescription,
  Button,
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { useAuth } from "../context/authContext";

function LoginForm(props: any) {
  const { login, isLoading, error } = useAuth();
  const [show, setShow] = React.useState(false);

  const [formErrors, setFormErrors] = React.useState<{
    [key: string]: boolean;
  }>({});

  const handleClick = () => setShow(!show);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (Object.values(formErrors).every((value) => !value)) {
      const { username, password } = event.target.elements;
      login({ username: username.value, password: password.value });
    } else {
      alert("Error Submitting Form");
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    // if (event.target.id === "email") {
    //   setFormErrors({
    //     ...formErrors,
    //     email: !validator.isEmail(event.target.value),
    //   });
    // }
    if (event.target.id === "password") {
      setFormErrors({
        ...formErrors,
        password: validator.isEmpty(event.target.value),
      });
    }
  };

  return (
    <VStack
      as="form"
      onSubmit={handleSubmit}
      w="100%"
      spacing={5}
      p="6"
      {...props}
    >
      {error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      ) : null}
      <FormControl
        w="100%"
        id="username"
        isRequired
        isInvalid={!!formErrors.email}
      >
        <Input placeholder="Username" onBlur={handleBlur} />
        <FormErrorMessage>
          {formErrors.email && "Please enter a valid email address"}
        </FormErrorMessage>
      </FormControl>
      <FormControl id="password" isRequired isInvalid={!!formErrors.password}>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter password"
            onBlur={handleBlur}
          />
          <InputRightElement>
            <IconButton
              size="sm"
              onClick={handleClick}
              aria-label="Show password"
              variant="ghost"
              icon={show ? <ViewOffIcon /> : <ViewIcon />}
            />
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>
          {formErrors.password && "Please enter a valid password"}
        </FormErrorMessage>
      </FormControl>
      <Button type="submit" w="100%" colorScheme="blue" isLoading={isLoading}>
        Login
      </Button>
    </VStack>
  );
}

export default LoginForm;
