import React, { useContext } from "react";

import {
  Box,
  Heading,
  Text,
  IconButton,
  Tag,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

import { RecipeContext } from "App";
import RecipeForm from "./RecipeForm";

import { fetchRecipes } from "../utils/utils";

interface IRecipeCardProps {
  id: string;
  title: string;
  url: string;
  tags: string[];
}

function RecipeCard({ id, title, url, tags }: IRecipeCardProps) {
  const { setRecipes } = useContext(RecipeContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  async function deleteRecipe(recipeIdToDelete: string) {
    try {
      const response = await fetch(`/api/recipes/${recipeIdToDelete}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setRecipes(await fetchRecipes());
      }
    } catch (error: any) {
      toast({
        title: "Failed to delete recipe.",
        description: "Please try again.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  return (
    <>
      <Box boxShadow="base" rounded="md">
        <Box m="2">
          <Heading size="md" mb="3" noOfLines={1}>
            {title}
          </Heading>
          <Text fontSize="sm" color="gray.500" mb="3" noOfLines={2}>
            <a href={url}>{url}</a>
          </Text>
          {tags.map((tag, index) => (
            <Tag key={tag + index} mr="1">
              {tag}
            </Tag>
          ))}
        </Box>
        <IconButton
          variant="ghost"
          colorScheme="blue"
          aria-label="Edit recipe"
          icon={<EditIcon />}
          onClick={onOpen}
        />
        <IconButton
          variant="ghost"
          colorScheme="red"
          aria-label="Delete recipe"
          icon={<DeleteIcon />}
          onClick={() => {
            deleteRecipe(id);
          }}
        />
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit recipe</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RecipeForm
              onClose={onClose}
              deleteRecipe={deleteRecipe}
              recipe={{ id, title, url, tags }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RecipeCard;
