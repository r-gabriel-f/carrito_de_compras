import React from "react";

export const Navbar = ({cantidadCompras}) => {
  console.log("ya estoy nav", cantidadCompras)
  
  return (
    <div className="flex fixed w-full h-10 bg-[#000] text-[#ffff]">
      <div className="flex items-center text-3xl">
        <h2>Carrito de Compras</h2>
      </div>
      <div className="absolute inset-y-0 right-0 mr-10">

          <ion-icon name="cart-outline" class="w-20 h-10"></ion-icon>

      </div>
    </div>
  );
};
