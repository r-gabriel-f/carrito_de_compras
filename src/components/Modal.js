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
import { DataCarrito } from "../Data/DataCarrito";

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
  const dataPlatoSelected = () => {
    const data = DataCarrito.filter((item) => contadorPorPlato[item.id]).map(
      (item) => ({
        ...item,
        amount: contadorPorPlato[item.id],
        total: item.price * contadorPorPlato[item.id],
      })
    );
    return data;
  };
  const selectPlato = dataPlatoSelected();
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className="text-center my-5"
        >
          Carrito de compras
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
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
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img src={row.img} alt="" className="w-12 h-12" />
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
          <Button variant="contained" color="success" onClick={handleClose}>
            Comprar
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
