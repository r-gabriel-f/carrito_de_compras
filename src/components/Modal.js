import React from "react";
import { DataCarrito } from "../Data/DataCarrito";
import Swal from "sweetalert2";
export const Modal = ({ platos, cantidadporCompras, toggleModal, pagar, togglevacio }) => {
  const productosSeleccionados = DataCarrito.filter((product) =>
    platos.includes(product.id)
  );
  let totalGeneral = 0;

  const handleCompraClick = () => {
    if (productosSeleccionados.length === 0) {
      // Verifica si el carrito está vacío antes de comprar
      Swal.fire({
        icon: "error",
        title: "El carrito está vacío",
        text: "Agrega productos al carrito antes de comprar.",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Tu compra se ha realizado con éxito",
        showConfirmButton: false,
        timer: 2500,
      });
      toggleModal();
      togglevacio(true);
      pagar();
    }
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-cyan-900 p-4 rounded shadow-lg ">
        <div className="flex justify-end">
          <button
            onClick={toggleModal}
            className="text-white  focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <h3 className=" text-center text-3xl font-serif mb-4 text-white">
          Compras
        </h3>
        <div className="h-32 overflow-y-auto">
          <table className="text-[#000] w-full border-collapse">
            <thead className="bg-[#000] text-white">
              <tr>
                <th className="py-2 px-4 text-center border">Plato</th>
                <th className="py-2 px-4 text-center border">Cantidad</th>
                <th className="py-2 px-4 text-center border">Precio (Bs.)</th>
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
                    <td className="py-2 px-4 text-center text-white">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-10 h-10 rounded-full border-2 border-black mx-auto"
                      />
                      <p>{product.name}</p>
                    </td>
                    <td className="py-2 px-4 text-center text-white ">
                      {cantidad}
                    </td>
                    <td className="py-2 px-4 text-center text-white">
                      {product.price}
                    </td>
                    <td className="py-2 px-4 text-center text-white">
                      {total}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="m-5 text-center text-white">
          <strong>Total General:</strong> {totalGeneral} Bs.
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full p-4 mr-4"
            onClick={handleCompraClick}
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};
