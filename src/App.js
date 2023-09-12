import { useState } from "react";
import Container from "./components/Container";
import { Navbar } from "./components/Navbar";

function App() {
  const [cantidadCompras, setCantidadCompras] = useState(0);
  const addCantidad = (nuevaCantidad) => {
    setCantidadCompras(nuevaCantidad);
  };
  return (
    <>

      <Navbar cantidadCompras={cantidadCompras}/><br/>
      <Container addCantidad={addCantidad}/>
    </>
  );
}

export default App;
