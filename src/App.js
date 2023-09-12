import { useState } from "react";
import Container from "./components/Container";
import { Navbar } from "./components/Navbar";
import { Modal } from "./components/Modal";

function App() {
  const [cantidadCompras, setCantidadCompras] = useState(0);
  const [platos, setPlatos] = useState([]);

  const addCantidad = (nuevaCantidad) => {
    setCantidadCompras(nuevaCantidad);
  };

  const addplatos = (nuevoPlato) => {
    setPlatos(nuevoPlato);
  };

  return (
    <>
      <Navbar cantidadCompras={cantidadCompras} />
      <br />
      <Modal platos={platos} />
      <Container
        addCantidad={addCantidad}
        addplatos={addplatos}
  

      />
    </>
  );
}

export default App;
