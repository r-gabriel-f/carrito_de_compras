import React from "react";

export const Navbar = () => {
  return (
    <div className="flex w-full h-20 bg-[#000] text-[#ffff]">
      <div className="flex items-center text-4xl">
        <h2>Carrito de Compras</h2>
      </div>
      <div className="absolute inset-y-0 right-0">
        <ion-icon name="cart-outline" class="w-20 h-20"></ion-icon>
      </div>
    </div>
  );
};
