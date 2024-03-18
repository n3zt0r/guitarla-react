import { useState } from "react";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { db } from "./data/db";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState(db);
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id);
    if (itemExist >= 0) {
      const updatedCart = [...cart];
      updatedCart[itemExist].quantity++;
      setCart(updatedCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((guitar) => id !== guitar.id));
  };

  const incraseQuantity = (id) => {
    const itemExist = cart.findIndex((guitar) => guitar.id === id);
    const updatedCart = [...cart];
    updatedCart[itemExist].quantity++;
    setCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const itemExist = cart.findIndex((guitar) => guitar.id === id);
    const updatedCart = [...cart];
    const quantity = (updatedCart[itemExist].quantity -= 1);
    if (quantity < 1) {
      removeFromCart(id);
    } else {
      setCart(updatedCart);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        incraseQuantity={incraseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar key={guitar.id} guitar={guitar} addToCart={addToCart} />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
