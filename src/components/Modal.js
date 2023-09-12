import React from "react";
import { DataCarrito } from "../Data/DataCarrito";

export const Modal = ({ platos }) => {
  const productosSeleccionados = DataCarrito.filter((product) =>
    platos.includes(product.id)
  );

  return (
    <div className="mt-20">
      <table className="text-[#000]">
        <thead>
          <tr>
            <th>Plato</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {productosSeleccionados.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>

              <td>{product.price} Bs.</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
