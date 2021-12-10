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
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

import RecipeForm from "./RecipeForm";

import useCrud from "hooks/useCrud";
import { useAuth } from "context/authContext";

interface IRecipeCardProps {
  id: string;
  title: string;
  url: string;
  tags: string[];
  user_id: number;
}

function RecipeCard({
  id,
  title,
  url,
  tags,
  user_id: recipeOwnerId,
}: IRecipeCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteRecipe } = useCrud();

  const { user } = useAuth();

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
        {recipeOwnerId === user?.id && (
          <>
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
          </>
        )}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit recipe</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RecipeForm onClose={onClose} recipe={{ id, title, url, tags }} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RecipeCard;
