import React from "react";

export const Navbar = ({ cantidadCompras }) => {
  return (
    <>
    <div className="flex fixed w-full h-10 bg-[#000] text-[#ffff]">
      <div className="flex items-center text-3xl ml-10">
        <h2>Carrito de Compras</h2>
      </div>
      <div className="absolute inset-y-0 right-0 mr-10 bg-[#5589]">
        <p className="absolute right-0 border border-sky-500 rounded-full bg-[#f8fafc] text-xl text-red-500">
          {cantidadCompras}
        </p>
        <ion-icon name="cart-outline" class="w-20 h-10"></ion-icon>
      </div>
    </div>

    
    </>
    
  );
};
