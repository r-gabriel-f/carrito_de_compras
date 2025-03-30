import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const StripeCheckout = ({ amount, onSuccess, onCancel, items }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  // Calculate total amount in cents (Stripe requires amounts in cents)
  const totalAmount = Math.round(amount * 100);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    try {
      const { data } = await axios.post('http://localhost:3001/stripe/payment', {
        amount: totalAmount,
        currency: 'bob',
        productId: 'prod_S2DF21h1TNksTS',
        productName: 'platostotal'
      });
      
      console.log('Payment intent response:', data);

      const clientSecret = data.client_secret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'Customer Name',
          },
        }
      });

      if (result.error) {
        setError(`Payment failed: ${result.error.message}`);
        setProcessing(false);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          setError(null);
          setSucceeded(true);
          setProcessing(false);
          onSuccess();
        }
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
      setProcessing(false);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Pago con Tarjeta
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {succeeded ? (
        <Alert severity="success" sx={{ mb: 2 }}>
          ¡Pago completado con éxito!
        </Alert>
      ) : (
        <form onSubmit={handleSubmit}>
          <Box sx={{ border: '1px solid #e0e0e0', p: 2, borderRadius: 1, mb: 2 }}>
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button 
              variant="outlined" 
              color="error" 
              onClick={onCancel}
              disabled={processing}
            >
              Cancelar
            </Button>
            
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              disabled={!stripe || processing}
            >
              {processing ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                `Pagar Bs. ${amount}`
              )}
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default StripeCheckout;
