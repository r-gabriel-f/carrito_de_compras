import React from "react";
import { DataCarrito } from "../Data/DataCarrito";

export const Modal = ({ platos, cantidadporCompras }) => {
  const productosSeleccionados = DataCarrito.filter((product) =>
    platos.includes(product.id)
  );
  let totalGeneral = 0;
  return (
    <div className="m-10 w-min">
      <div className="rounded-lg border-2 border-[#000]  p-4">
        <table className="text-[#000] w-full border-collapse">
          <thead className="bg-[#000] text-white">
            <tr>
              <th className="py-2 px-4 text-center border">Plato</th>
              <th className="py-2 px-4 text-center border">Cantidad</th>
              <th className="py-2 px-4 text-center border ">Precio (Bs.)</th>
              <th className="py-2 px-4 text-center border">Total (Bs.)</th>
            </tr>
          </thead>
          <tbody>
            {productosSeleccionados.map((product) => {
              const cantidad = cantidadporCompras[product.id];
              const total = cantidad * product.price;
              totalGeneral += total;

              return (
                <tr key={product.id}>
                  <td className="py-2 px-4 text-center ">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-10 h-10 rounded-full border-2 border-black mx-auto"
                    />
                    <p>{product.name}</p>
                  </td>
                  <td className="py-2 px-4 text-center ">{cantidad}</td>
                  <td className="py-2 px-4 text-center">
                    {product.price}
                  </td>
                  <td className="py-2 px-4 text-center">{total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="m-5 text-center">
          <strong>Total General:</strong> {totalGeneral} Bs.
        </div>
      </div>
    </div>
  );
};
