import React from "react";

export const Navbar = ({ cantidadCompras, toggleModal }) => {
  return (
    <div className="flex fixed w-full  bg-cyan-900 font-serif text-[#ffff] z-50">
      <div className="flex items-center text-2xl ml-10 p-4 md:text-3xl">
        <h2>Carrito de Compras</h2>
      </div>
      <p className="flex items-center justify-center absolute right-10 border-2 border-black rounded-full text-xl text-white bg-[#000] w-8 h-8 z-10">
        {cantidadCompras}
      </p>
      <div className=" flex items-center absolute inset-y-0 right-0 mr-10">
        <ion-icon
          name="cart-outline"
          class="w-20 h-10 cursor-pointer"
          onClick={toggleModal}
        ></ion-icon>
      </div>
    </div>
  );
};
