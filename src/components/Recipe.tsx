import React from "react";
import {
  Box,
  Heading,
  OrderedList,
  List,
  Text,
  ListItem,
} from "@chakra-ui/react";
import { Recipe as RecipeType } from "../types/recipe";

function Recipe({ title, description, ingredients, method }: RecipeType) {
  return (
    <Box w="100%" boxShadow="base" rounded="md">
      <Heading size="lg">{title}</Heading>
      {description ? <Text>{description}</Text> : null}
      <Heading as="h3" size="md">
        Ingredients
      </Heading>
      <List>
        {ingredients.map((li) => (
          <ListItem>{li}</ListItem>
        ))}
      </List>
      <Heading as="h3" size="md">
        Method
      </Heading>
      <OrderedList>
        {method.map((li) => (
          <ListItem>{li}</ListItem>
        ))}
      </OrderedList>
    </Box>
  );
}

export default Recipe;
