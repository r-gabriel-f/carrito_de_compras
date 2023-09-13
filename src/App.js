import { useState } from "react";
import Container from "./components/Container";
import { Navbar } from "./components/Navbar";
import { Modal } from "./components/Modal";

function App() {
  const [cantidadCompras, setCantidadCompras] = useState(0);
  const [cantidadporCompras, setCantidadporCompras] = useState([]);
  const [platos, setPlatos] = useState([]);

  const addCantidad = (nuevaCantidad) => {
    setCantidadCompras(nuevaCantidad);
  };

  const addplatos = (nuevoPlato) => {
    setPlatos(nuevoPlato);
  };
  const addporplato = (porplato) => {
    setCantidadporCompras(porplato);
   
  };
  
  return (
    <>
      <Navbar cantidadCompras={cantidadCompras} />
      <br />
      <Modal platos={platos} cantidadporCompras={cantidadporCompras}/>
      <Container
        addCantidad={addCantidad}
        addplatos={addplatos}
        addporplato={addporplato}
      />
    </>
  );
}

export default App;
