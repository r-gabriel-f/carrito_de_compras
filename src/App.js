import { useState } from "react";
import Container from "./components/Container";
import { Navbar } from "./components/Navbar";
import { Modal } from "./components/Modal";

function App() {
  const [cantidadCompras, setCantidadCompras] = useState(0);
  const [cantidadporCompras, setCantidadporCompras] = useState([]);
  const [platos, setPlatos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [vacio, setVacio] = useState(false);

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
 


  const togglevacio = (valor) => {
    setVacio(valor);

  };


  
  const pagar = () => {
    setCantidadporCompras([]);
    setCantidadCompras(0);
    setPlatos([]);
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
          togglevacio={togglevacio }
       
        />
      )}
      <Container
        addCantidad={addCantidad}
        addplatos={addplatos}
        addporplato={addporplato}
        togglevacio={vacio}

      />
    </>
  );
}

export default App;
