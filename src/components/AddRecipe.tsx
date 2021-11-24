import React from "react";
import { v4 as uuidv4 } from "uuid";

import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Button, Textarea } from "@chakra-ui/react";
import { Recipe } from "../types/recipe";

interface IAddRecipeProps {
  onSubmit: (data: Recipe) => void;
}
function AddRecipe({ onSubmit }: IAddRecipeProps) {
  function handleSubmit(event: any) {
    event.preventDefault();

    const { title, url, tags } = event.target.elements;

    onSubmit({
      id: uuidv4(),
      title: title.value,
      url: url.value,
      tags: tags.value.split(/\r?\n/),
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl id="title" isRequired>
        <FormLabel>Title</FormLabel>
        <Input placeholder="Recipe Title" />
      </FormControl>
      <FormControl id="url">
        <FormLabel>URL</FormLabel>
        <Input placeholder="Optional" />
      </FormControl>
      <FormControl id="tags" isRequired>
        <FormLabel>Tags</FormLabel>
        <Textarea />
      </FormControl>

      <Button colorScheme="blue" type="submit" mt="3">
        Save
      </Button>
    </form>
  );
}

export default AddRecipe;
