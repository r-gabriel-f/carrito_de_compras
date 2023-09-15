import React, { useState, useEffect } from "react";
import { DataCarrito } from "../Data/DataCarrito";

const Container = ({ addCantidad, addplatos, addporplato, togglevacio }) => {
  const [Compras, setcompras] = useState(0);
  const [contadorPorPlato, setContadorPorPlato] = useState([]);
  const [platos, setPlatos] = useState([]);


  useEffect(() => {
    if (togglevacio) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 3000); 
  
      return () => clearTimeout(timer);
    }
  }, [togglevacio]);

  const incrementarCantidad = (id) => {
    setContadorPorPlato((prevContador) => ({
      ...prevContador,
      [id]: (prevContador[id] || 0) + 1,
    }));
    setcompras(Compras + 1);
    addCantidad(Compras + 1);
  };

  const restarCantidad = (id) => {
    if (contadorPorPlato[id] && contadorPorPlato[id] > 0) {
      setContadorPorPlato((prevContador) => ({
        ...prevContador,
        [id]: prevContador[id] - 1,
      }));
      setcompras(Compras - 1);
      addCantidad(Compras - 1);
    }
  };

  useEffect(() => {
    addporplato(contadorPorPlato);
  }, [contadorPorPlato, addporplato]);

  const ColocarPlatos = (id) => {
    if (!platos.includes(id)) {
      const nuevosPlatos = [...platos, id];
      setPlatos(nuevosPlatos);
      addplatos(nuevosPlatos);
    }
  };

  const RestarPlato = (id) => {
    if (contadorPorPlato[id] === 1) {
      const restar = platos.filter((platoId) => platoId !== id);
      setPlatos(restar);
      addplatos(restar);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-fondo bg-cover bg-center bg-fixed mt-10">
      {DataCarrito.map((product, i) => (
        <div
          key={i}
          className="flex flex-col items-center border-2 border-black rounded-lg p-4 m-10 backdrop-blur"
        >
          <img
            src={product.img}
            alt={product.name}
            className="w-80 h-60 rounded-full border-2 border-black"
          />

          <div className="text-center p-4 text-white h-30 w-30">
            <p>Plato: {product.name}</p>
            <p>Precio: {product.price} Bs.</p>
            <p>Cantidad: {contadorPorPlato[product.id] || 0}</p>
          </div>
          <div className="flex justify-center items-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full p-4 mr-4"
              onClick={() => {
                incrementarCantidad(product.id);
                ColocarPlatos(product.id);
              }}
            >
              Comprar
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full p-4"
              onClick={() => {
                restarCantidad(product.id);
                RestarPlato(product.id);
              }}
            >
              Restar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Container;
