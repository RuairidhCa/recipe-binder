import React from "react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Container, Box, Button, Textarea } from "@chakra-ui/react";
import { Recipe } from "../types/recipe";

interface IAddRecipeProps {
  onSubmit: (data: Recipe) => void;
}
function AddRecipe({ onSubmit }: IAddRecipeProps) {
  function handleSubmit(event: any) {
    event.preventDefault();

    const { title, description, ingredients, method } = event.target.elements;

    onSubmit({
      title: title.value,
      description: description.value,
      ingredients: ingredients.value.split(/\r?\n/),
      method: method.value.split(/\r?\n/),
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl id="title" isRequired>
        <FormLabel>Title</FormLabel>
        <Input placeholder="Recipe Title" />
      </FormControl>
      <FormControl id="description">
        <FormLabel>Description</FormLabel>
        <Input placeholder="Optional" />
      </FormControl>
      <FormControl id="ingredients" isRequired>
        <FormLabel>Ingredients</FormLabel>
        <Textarea />
      </FormControl>
      <FormControl id="method" isRequired mt="1">
        <FormLabel>Method</FormLabel>
        <Textarea />
      </FormControl>
      <Button colorScheme="blue" type="submit" mt="3">
        Save
      </Button>
    </form>
  );
}

export default AddRecipe;
