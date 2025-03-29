import { useState } from "react";
import Container from "./components/Container";
import Navbar from "./components/Navbar";

function App() {
  const [compras, setCompras] = useState(0);
  const [contadorPorPlato, setContadorPorPlato] = useState({});

  return (
    <>
      <Navbar compras={compras} contadorPorPlato={contadorPorPlato} />
      <Container
        compras={compras}
        setCompras={setCompras}
        contadorPorPlato={contadorPorPlato}
        setContadorPorPlato={setContadorPorPlato}
      />
    </>
  );
}

export default App;
