import React from "react";

import { Box, Image, Heading, Text, IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import ImgPlaceholderSvg from "../assets/img_placeholder.svg";

interface IRecipeCardProps {
  id: string;
  title: string;
  description: string;
  deleteRecipe: (id: string) => void;
}

function RecipeCard({
  id,
  title,
  description,
  deleteRecipe,
}: IRecipeCardProps) {
  return (
    <Box boxShadow="base" rounded="md">
      <Box>
        <Image src={ImgPlaceholderSvg} alt="placeholder image" />
      </Box>
      <Box m="2">
        <Heading size="md" mb="3" noOfLines={1}>
          {title}
        </Heading>
        <Text color="gray.500" noOfLines={2}>
          {description}
        </Text>
      </Box>
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
  );
}

export default RecipeCard;
