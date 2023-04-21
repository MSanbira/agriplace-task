import { Button } from "@mui/material";
import React from "react";
import { Fruit as FruitType } from "types/Fruit";

export const Fruit = (props: FruitProps) => {
  const {
    fruit: { name, description, tags, id },
    onUpdate,
    isAdmin
  } = props;

  const replaceToFruit = () => {
    window.location.replace('/' + id);
  }

  return (
    <div className="fruit-wrapper">
      <h3>{name}</h3>
      <p>{description}</p>
      {isAdmin && (
        <Button onClick={() => onUpdate(id)} variant="contained" color="secondary">
          Update
        </Button>
      )}
      {!isAdmin && (
        <Button onClick={replaceToFruit} variant="contained" color="secondary">
          show
        </Button>
      )}
    </div>
  );
};

interface FruitProps {
  fruit: FruitType;
  onUpdate: (id: string) => void;
  isAdmin: boolean;
}
