import { TextField } from "@mui/material";
import React from "react";
import { Fruit } from "types/Fruit";

export const Cart = (props: CartProps) => {
  const { cart, setCart, fruits = [] } = props;

  const handleUpdateItem = (id: string, amount: number) => {
    const tempCart = { ...cart };
    if (amount <= 0) {
      delete tempCart[id];
    } else {
      tempCart[id] = amount;
    }

    setCart(tempCart);
  };

  return (
    <div className="cart-wrapper">
      {Object.keys(cart).map((itemId) => (
        <Item
          key={itemId}
          item={fruits.find((f) => f.id === itemId)}
          itemNum={cart[itemId]}
          updateItem={handleUpdateItem}
        />
      ))}
    </div>
  );
};

const Item = (props: ItemProps) => {
  const { item, itemNum, updateItem } = props;

  if (!item) {
    return <></>;
  }
  return (
    <div className="cart-item">
      <h3>{item.name}</h3>
      <TextField
        type="number"
        value={itemNum}
        onChange={(e) => updateItem(item.id, parseInt(e.currentTarget.value))}
      />
    </div>
  );
};

interface CartProps {
  cart: { [id: string]: number };
  setCart: (obj: { [id: string]: number }) => void;
  fruits?: Fruit[];
}

interface ItemProps {
  item?: Fruit;
  itemNum: number;
  updateItem: (id: string, amount: number) => void;
}
