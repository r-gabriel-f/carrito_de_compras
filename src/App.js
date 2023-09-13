import { useState } from "react";
import Container from "./components/Container";
import { Navbar } from "./components/Navbar";
import { Modal } from "./components/Modal";

function App() {
  const [cantidadCompras, setCantidadCompras] = useState(0);
  const [cantidadporCompras, setCantidadporCompras] = useState([]);
  const [platos, setPlatos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);


  const addCantidad = (nuevaCantidad) => {
    setCantidadCompras(nuevaCantidad);
  };

  const addplatos = (nuevoPlato) => {
    setPlatos(nuevoPlato);
  };
  const addporplato = (porplato) => {
    setCantidadporCompras(porplato);
  };
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const pagar = () => {
    window.location.reload(true);
  };
  return (
    <>
      <Navbar cantidadCompras={cantidadCompras} toggleModal={toggleModal} />
      <br />
      {modalVisible && (
        <Modal
          platos={platos}
          cantidadporCompras={cantidadporCompras}
          toggleModal={toggleModal}
          pagar={pagar}
 
        />
      )}
      <Container
        addCantidad={addCantidad}
        addplatos={addplatos}
        addporplato={addporplato}

      />
    </>
  );
}

export default App;
