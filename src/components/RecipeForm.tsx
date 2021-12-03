import {
  Button,
  ButtonGroup,
  Textarea,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

import { Recipe } from "../types/recipe";
import { prepareTags, prepareUrl } from "../utils/utils";
import useCrud from "hooks/useCrud";

interface IRecipeFormProps {
  onClose: () => void;
  recipe?: Recipe;
}

function RecipeForm({ onClose, recipe }: IRecipeFormProps) {
  const { saveOrEditRecipe, deleteRecipe } = useCrud();

  function handleSubmit(event: any) {
    event.preventDefault();

    const { title, url, tags } = event.target.elements;

    saveOrEditRecipe({
      id: recipe?.id,
      title: title.value.trim(),
      url: prepareUrl(url.value),
      tags: prepareTags(tags.value),
    });
    onClose();
  }

  function handleDeleteClick() {
    if (deleteRecipe && recipe?.id) {
      deleteRecipe(recipe.id);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <FormControl id="title" isRequired>
        <FormLabel>Title</FormLabel>
        <Input placeholder="Recipe Title" defaultValue={recipe?.title} />
      </FormControl>
      <FormControl id="url" isRequired>
        <FormLabel>URL</FormLabel>
        <Input
          placeholder="Link to Recipe"
          defaultValue={recipe?.url || undefined}
        />
      </FormControl>
      <FormControl id="tags">
        <FormLabel>Tags</FormLabel>
        <Textarea defaultValue={recipe?.tags.join("\r\n")} />
      </FormControl>
      <ButtonGroup>
        <Button colorScheme="blue" type="submit" mt="3">
          Save
        </Button>
        {recipe?.id ? (
          <Button colorScheme="red" onClick={handleDeleteClick} mt="3">
            Delete
          </Button>
        ) : null}
      </ButtonGroup>
    </form>
  );
}

export default RecipeForm;
