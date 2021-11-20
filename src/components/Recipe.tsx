import React, { useContext } from "react";
import {
  Box,
  Heading,
  List,
  Text,
  ListItem,
  Image,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  IconButton,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { Recipe as RecipeType } from "../types/recipe";
import { RecipeContext } from "App";
import { Link, useParams } from "react-router-dom";

import ImgPlaceholderSvg from "../assets/img_placeholder.svg";

function Recipe({ title, description, ingredients, method }: RecipeType) {
  const { recipes } = useContext(RecipeContext);

  const { recipeId } = useParams();

  const recipe = recipes.find(
    (recipe: { id: string | undefined }) => recipe.id === recipeId
  );

  return recipe ? (
    <>
      <Breadcrumb boxShadow="base" rounded="md" p="5" my="5">
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/">
            Recipes
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>{recipe.title}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Box w="100%" boxShadow="base" rounded="md" px="5">
        <Box
          display="flex"
          flexDirection={["column", null, "row"]}
          justifyContent="space-between"
          py={5}
        >
          <Image
            boxSize={["100%", null, "50%"]}
            src={ImgPlaceholderSvg}
            alt="placeholder image"
          />
          <Box pl={[0, null, 3]}>
            <Heading size="lg" py={10}>
              {recipe.title}
            </Heading>
            {description ? <Text>{recipe.description}</Text> : null}
            <Box py={10}>
              <IconButton
                variant="ghost"
                colorScheme="red"
                aria-label="Delete recipe"
                icon={<EditIcon />}
                onClick={() => {}}
              />
            </Box>
          </Box>
        </Box>
        <Box py={5}>
          <Heading as="h3" size="md">
            Ingredients
          </Heading>
          <List>
            {recipe.ingredients.map((li: string) => (
              <ListItem>{li}</ListItem>
            ))}
          </List>
        </Box>

        <Box py={5}>
          <Heading as="h3" size="md">
            Method
          </Heading>
          <List>
            {recipe.method.map((li: string) => (
              <ListItem>{li}</ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </>
  ) : (
    <Box>NADA</Box>
  );
}

export default Recipe;
