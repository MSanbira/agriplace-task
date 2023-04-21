import { api } from "app/api";
import { Fruits } from "components/Fruits";
import { FruitDisplay } from "components/Fruits/FruitDisplay";
import { useState } from "react";
import styled from "styled-components";
import { Cart } from "./Cart";

const App = styled.div`
  display: grid;
  grid-template:
    "products product-view cart" 50%
    "products product-view recent" 50%/ 300px 1fr 300px;
  height: 100vh;

  .products {
    grid-area: products;
    background-color: lightblue;
  }

  .product-view {
    grid-area: product-view;
  }

  .cart {
    grid-area: cart;
    background-color: lightgray;
  }

  .recent-products {
    grid-area: recent;
    background-color: lightgreen;
  }
`;

export const Main = () => {
  const { data: fruits = [], error, isLoading } = api.useGetFruitsQuery();

  // TODO add cart to localstorage
  const [cart, setCart] = useState<{ [id: string]: number }>({});

  const handleAddToCart = (id: string) => {
    const tempCart = { ...cart };
    tempCart[id] = (tempCart[id] || 0) + 1;
    setCart(tempCart);
  };

  return (
    <App>
      <div className="products">
        <Fruits />
      </div>
      <div className="product-view">
        <FruitDisplay
          addToCart={handleAddToCart}
          fruits={fruits}
          isLoading={isLoading}
        />
      </div>
      <div className="cart">
        <Cart fruits={fruits} cart={cart} setCart={setCart} />
      </div>
      <div className="recent-products"></div>
    </App>
  );
};
