import React from "react";

import { Box, Image, Heading, Text } from "@chakra-ui/react";
import { Recipe as RecipeType } from "../types/recipe";

import ImgPlaceholderSvg from "../assets/img_placeholder.svg";

function RecipeCard({ title, description, ingredients, method }: RecipeType) {
  return (
    <Box boxShadow="base" rounded="md">
      <Box>
        <Image src={ImgPlaceholderSvg} alt="placeholder image" />
      </Box>
      <Box>
        <Heading size="md" noOfLines={1}>
          {title}{" "}
        </Heading>
      </Box>
      <Box>
        <Text color="gray.500" noOfLines={3}>
          {description}
        </Text>
      </Box>
    </Box>
  );
}

export default RecipeCard;
