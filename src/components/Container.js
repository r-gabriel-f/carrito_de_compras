import React from "react";
import { DataCarrito } from "../Data/DataCarrito";

const Container = () => {
  return (
    <div className="grid grid-cols-3 gap-4 m-20">
      {DataCarrito.map((product, i) => (
        <div
          key={i}
          className="flex flex-col items-center border-2 border-black rounded-lg p-4"
        >
          <img
            src={product.img}
            alt={product.name}
            className="w-80 h-60  rounded-full border-2 border-black"
          />
          <div className="text-center p-4">
            <p>Plato: {product.name}</p>
            <p>Precio: {product.price} Bs.</p>
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full p-4">
            Comprar
          </button>
        </div>
      ))}
    </div>
  );
};

export default Container;
