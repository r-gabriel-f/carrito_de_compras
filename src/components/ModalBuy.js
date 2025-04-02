import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxHeight: "80vh",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

export default function ModalBuy({ open, handleClose }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open) {
      fetchPayments();
    }
  }, [open]);

  const fetchPayments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/stripe/payments`
      );
      const uniquePayments = {};
      response.data.forEach(payment => {
        if (!uniquePayments[payment.id] || payment.created > uniquePayments[payment.id].created) {
          uniquePayments[payment.id] = payment;
        }
      });
      const filteredPayments = Object.values(uniquePayments)
        .filter(payment => payment.status === "succeeded")
      setPayments(filteredPayments);
    } catch (err) {
      console.error("Error fetching payments:", err);
      setError("Error loading payments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h6">Payment History</Typography>
          <Typography variant="caption" color="textSecondary">
            Showing latest status for each payment
          </Typography>
        </div>
        {loading && <Typography>Loading payments...</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        {!loading && !error && (
          <TableContainer
            component={Paper}
            sx={{ maxHeight: "60vh", overflow: "auto" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Product</b>
                  </TableCell>
                  <TableCell>
                    <b>Amount (BOB)</b>
                  </TableCell>
                  <TableCell>
                    <b>Status</b>
                  </TableCell>
                  <TableCell>
                    <b>Date</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payments.length > 0 ? (
                  payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>
                        {payment.metadata?.productName || "N/A"}
                      </TableCell>
                      <TableCell>
                        {(payment.amount / 100).toFixed(2)} BOB
                      </TableCell>
                      <TableCell>{payment.status}</TableCell>
                      <TableCell>
                        {new Date(payment.created * 1000).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No payments found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <div className="flex justify-end mt-4">
          <Button variant="contained" color="primary" onClick={handleClose}>
            Close
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
