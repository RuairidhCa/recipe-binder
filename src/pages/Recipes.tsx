import React, { useContext } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import RecipeCard from "components/RecipeCard";
import RecipeForm from "components/RecipeForm";
import { RecipeContext } from "App";
function Recipes() {
  const { recipes } = useContext(RecipeContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        size="lg"
        leftIcon={<AddIcon />}
        onClick={onOpen}
        colorScheme="blue"
      >
        New Recipe
      </Button>

      <VStack align="stretch">
        {recipes.map((recipe: any) => (
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
    </>
  );
}

export default Recipes;
