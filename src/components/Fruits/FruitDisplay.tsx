import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { Fruit } from "types/Fruit";

export const FruitDisplay = (props: FruitProps) => {
  const { addToCart, isLoading, fruits = [] } = props;

  const [fruitId, setFruitId] = useState<string>("");

  useEffect(() => {
    setFruitId(window.location.pathname.split("/")[1]);
  }, []);

  const fruit = fruits.find((f) => f.id === fruitId);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!fruit) {
    return <h2>Select A Fruit</h2>;
  }

  return (
    <div className="fruit-wrapper">
      <h3>{fruit.name}</h3>
      <p>{fruit.description}</p>
      <Button
        onClick={() => addToCart(fruitId)}
        variant="contained"
        color="secondary"
      >
        Add to cart
      </Button>
    </div>
  );
};

interface FruitProps {
  fruits?: Fruit[];
  isLoading: boolean;
  addToCart: (id: string) => void;
}
