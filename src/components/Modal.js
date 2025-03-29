import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import { DataCarrito } from "../Data/DataCarrito";
import { useStore } from "../stores/Bay"; // Asegúrate de que la ruta sea correcta

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalCarrito({ open, handleClose, contadorPorPlato }) {
  const [openBay, setOpenBay] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [messageAlert, setMessageAlert] = React.useState("");
  const rest = useStore((state) => state.rest);

  const dataPlatoSelected = () => {
    return DataCarrito.filter((item) => contadorPorPlato[item.id]).map(
      (item) => ({
        ...item,
        amount: contadorPorPlato[item.id],
        total: item.price * contadorPorPlato[item.id],
      })
    );
  };

  const selectPlato = dataPlatoSelected();

  const buyPlato = () => {
    if (selectPlato.length > 0) {
      setMessage("¡Compra realizada con éxito!");
      setMessageAlert("success");
    } else {
      setMessage("No tienes nada que comprar");
      setMessageAlert("error");
    }
    setOpenBay(true);
  };

  const handleCloseBay = () => {
    if (selectPlato.length > 0) {
      rest();
      handleClose();
    }
    setOpenBay(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" className="text-center my-5">
          Carrito de compras
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Plato</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Precio (Bs.)</TableCell>
                <TableCell>Total (Bs.)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectPlato.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>
                    <img src={row.img} alt={row.name} className="w-12 h-12" />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex justify-center mt-4">
          <Button variant="contained" color="success" onClick={buyPlato}>
            Comprar
          </Button>
        </div>
        <Snackbar
          open={openBay}
          autoHideDuration={1500}
          onClose={handleCloseBay}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseBay}
            severity={messageAlert}
            variant="filled"
          >
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </Modal>
  );
}