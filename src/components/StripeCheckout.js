import React, { useState, useEffect } from 'react';
import { 
  PaymentElement,
  useStripe, 
  useElements,
  Elements
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const PaymentForm = ({ amount, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.href,
        },
        redirect: 'if_required',
      });

      if (result.error) {
        setError(`Pago fallido: ${result.error.message}`);
        setProcessing(false);
      } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
        onSuccess();
      } else {
        setError('El pago está pendiente de confirmación.');
        setProcessing(false);
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <PaymentElement 
        options={{
          layout: 'tabs',
          fields: {
            billingDetails: {
              name: 'auto',
              email: 'auto'
            }
          }
        }}
      />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
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
  );
};

const StripeCheckout = ({ amount, onSuccess, onCancel }) => {
  const [clientSecret, setClientSecret] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const totalAmount = Math.round(amount * 100);
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.post('http://localhost:3001/stripe/payment', {
          amount: totalAmount,
          currency: 'bob',
          productId: 'prod_S2DF21h1TNksTS',
          productName: 'platostotal'
        });
        
        setClientSecret(data.client_secret);
      } catch (err) {
        setError(`Error al inicializar el pago: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    createPaymentIntent();
  }, [totalAmount]);

  const handlePaymentSuccess = () => {
    setSucceeded(true);
    onSuccess();
  };
  return (
    <Box sx={{ mt: 3 }}>
      {succeeded ? (
        <Alert severity="success" sx={{ mb: 2 }}>
          ¡Pago completado con éxito!
        </Alert>
      ) : isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm 
            amount={amount}
            onSuccess={handlePaymentSuccess}
            onCancel={onCancel}
          />
        </Elements>
      ) : (
        <Alert severity="error">No se pudo cargar el formulario de pago</Alert>
      )}
    </Box>
  );
};

export default StripeCheckout;
