import React, { useContext, useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Button,
  Container,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { AddIcon, SearchIcon } from "@chakra-ui/icons";

import RecipeCard from "components/RecipeCard";
import RecipeForm from "components/RecipeForm";
import { RecipeContext } from "AuthenticatedApp";
import { Recipe } from "types/recipe";
import { useAuth } from "../context/authContext";
function Recipes() {
  const { recipes } = useContext(RecipeContext);
  const { logout } = useAuth();

  const [searchInput, setSearchInput] = useState<string>("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleSearchInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(event.target.value);
  }

  return (
    <>
      <Box
        width="100vw"
        height="25vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-around"
        bg="gray.100"
        mb="5"
      >
        <Box display="flex" justifyContent="flex-end" width="100vw">
          <Button
            size="sm"
            onClick={logout}
            colorScheme="blue"
            alignSelf="left"
            mx="6"
          >
            Logout
          </Button>
        </Box>
        <InputGroup spacing="3" maxW={["90vw", "70vw", "50vw"]}>
          <Input
            size="md"
            bg="white"
            placeholder="Search by Recipe Title or Tag"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
          <InputRightElement
            height="100%"
            children={<SearchIcon color="grey.500" />}
          />
        </InputGroup>
        <Button
          size="lg"
          leftIcon={<AddIcon />}
          onClick={onOpen}
          colorScheme="blue"
        >
          New Recipe
        </Button>
      </Box>
      <Container
        maxW={{ sm: "container.sm", md: "container.md", lg: "container.lg" }}
      >
        <VStack align="stretch">
          {recipes
            .filter((recipe: Recipe) => {
              return (
                recipe.title.includes(searchInput.toLowerCase()) ||
                recipe.tags.some((tag) => {
                  return tag.includes(searchInput.toLowerCase());
                })
              );
            })
            .map((recipe: any) => (
              <RecipeCard key={recipe.id} {...recipe} />
            ))}
        </VStack>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add new recipe</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <RecipeForm onClose={onClose} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
    </>
  );
}

export default Recipes;
