import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import StripeCheckout from "./StripeCheckout";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PaymentModal = ({ open, handleClose, amount, onSuccess, items }) => {
  const handlePaymentSuccess = () => {
    onSuccess();
    handleClose();
  };

  const handlePaymentCancel = () => {
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" className="text-center mb-4">
          Pago con Tarjeta de Crédito
        </Typography>
        
        <StripeCheckout 
          amount={amount} 
          onSuccess={handlePaymentSuccess} 
          onCancel={handlePaymentCancel}
          items={items}
        />
      </Box>
    </Modal>
  );
};

export default PaymentModal;
