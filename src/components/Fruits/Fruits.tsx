import { Button, CircularProgress, TextField } from "@mui/material";
import { api } from "app/api";
import React, { useEffect, useState } from "react";
import { Fruit as FruitType } from "types/Fruit";
import { EditOrCreateDialog } from "./EditOrCreateDialog";
import { Fruit } from "./Fruit";

const NewFruit = { name: "", description: "", tags: [], id: "" };

export const Fruits = (props: FruitsProps) => {
  const { isAdmin = false } = props;

  const {
    data: fruits = [] as FruitType[],
    error,
    isLoading,
  } = api.useGetFruitsQuery();
  const [addFruit, { isLoading: isAddLoading }] = api.useAddFruitMutation();
  const [updateFruit, { isLoading: isUpdateLoading }] =
    api.useUpdateFruitMutation();

  const [fruitToEdit, setFruitToEdit] = useState<FruitType | null>(null);
  const [search, setSearch] = useState<string>("");

  const handleStartEdit = (id: string) => {
    setFruitToEdit(fruits.find((fruit) => fruit.id === id) || null);
  };

  const handleSaveFruit = () => {
    if (fruitToEdit?.id) {
      updateFruit(fruitToEdit);
    } else {
      const fruitToAdd = { ...(fruitToEdit as FruitType) };
      // @ts-ignore
      delete fruitToAdd.id;
      addFruit(fruitToAdd);
    }
  };

  useEffect(() => {
    if (!isAddLoading && !isUpdateLoading) {
      setFruitToEdit(null);
    }
  }, [isAddLoading, isUpdateLoading]);

  const filteredFruits = fruits.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-fruits">
      <h1>Fruits</h1>
      <TextField
        label="search"
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />
      {isAdmin && (
        <Button variant="contained" onClick={() => setFruitToEdit(NewFruit)}>
          Add Fruit
        </Button>
      )}

      {isLoading && <CircularProgress />}

      {filteredFruits.map((fruit) => (
        <Fruit
          key={fruit.id}
          fruit={fruit}
          isAdmin={isAdmin}
          onUpdate={handleStartEdit}
        />
      ))}

      <EditOrCreateDialog
        entity={fruitToEdit}
        entityType="Fruit"
        tags={[]}
        setEntity={setFruitToEdit}
        saveEntity={handleSaveFruit}
        isLoading={isAddLoading || isUpdateLoading}
      />
    </div>
  );
};

interface FruitsProps {
  isAdmin?: boolean;
}
