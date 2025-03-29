import React, { useEffect } from "react";
import { DataCarrito } from "../Data/DataCarrito";
import { useStore } from "../stores/Bay";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Container = ({
  compras,
  setCompras,
  contadorPorPlato,
  setContadorPorPlato,
}) => {
  const incrementGlobal = useStore((state) => state.inc);
  const decrementGlobal = useStore((state) => state.dec);
  const count = useStore((state) => state.count);

  const incrementarCantidad = (id) => {
    setContadorPorPlato((prevContador) => ({
      ...prevContador,
      [id]: (prevContador[id] || 0) + 1,
    }));
    setCompras(compras + 1);
    incrementGlobal();
  };

  const restarCantidad = (id) => {
    if (contadorPorPlato[id] && contadorPorPlato[id] > 0) {
      setContadorPorPlato((prevContador) => ({
        ...prevContador,
        [id]: prevContador[id] - 1,
      }));
      setCompras(compras - 1);
      decrementGlobal();
    }
  };
  useEffect(() => {
    if (count === 0) {
      setCompras(0);
      setContadorPorPlato({});
    }
  }, [count, setCompras, setContadorPorPlato]);

 

  return (
    <div className="bg-fondo bg-cover bg-center h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {DataCarrito.map((product) => (
          <div className="mt-5" key={product.id}>
            <Card
              sx={{
                maxWidth: 345,
                mx: "auto",
                my: "auto",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(5px)",
              }}
            >
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
                  onClick={() => incrementarCantidad(product.id)}
                >
                  Comprar
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() => restarCantidad(product.id)}
                >
                  Restar
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Container;
