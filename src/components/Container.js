import React, { useState, useEffect } from "react";
import { DataCarrito } from "../Data/DataCarrito";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useStore, Counter } from "../stores/Bay";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Container = ({ addCantidad, addplatos, addporplato, togglevacio }) => {
  const [Compras, setcompras] = useState(0);
  const [contadorPorPlato, setContadorPorPlato] = useState([]);
  const [platos, setPlatos] = useState([]);

  const incrementGlobal = useStore((state) => state.inc);
  const decrementGlobal = useStore((state) => state.dec);

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
    incrementGlobal(); // Incrementar el contador global de Zustand
  };

  const restarCantidad = (id) => {
    if (contadorPorPlato[id] && contadorPorPlato[id] > 0) {
      setContadorPorPlato((prevContador) => ({
        ...prevContador,
        [id]: prevContador[id] - 1,
      }));
      setcompras(Compras - 1);
      addCantidad(Compras - 1);
      decrementGlobal(); // Decrementar el contador global de Zustand
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
    <div className="bg-fondo bg-cover bg-center h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {DataCarrito.map((product, i) => (
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia sx={{ height: 140 }} image={product.img} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Precio: {product.price} Bs
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Cantidad: {contadorPorPlato[product.id] || 0}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="contained"
                color="success"
                onClick={() => {
                  incrementarCantidad(product.id);
                  ColocarPlatos(product.id);
                }}
              >
                Comprar
              </Button>
              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={() => {
                  restarCantidad(product.id);
                  RestarPlato(product.id);
                }}
              >
                Restar
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Container;
