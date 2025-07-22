const axios = require('axios');

const PAYPAL_CLIENT = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_BASE = process.env.PAYPAL_MODE === 'live'
  ? 'https://api.paypal.com'
  : 'https://api.sandbox.paypal.com';

async function getAccessToken() {
  const response = await axios({
    url: `${PAYPAL_BASE}/v1/oauth2/token`,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    auth: {
      username: PAYPAL_CLIENT,
      password: PAYPAL_SECRET,
    },
    data: 'grant_type=client_credentials',
  });
  return response.data.access_token;
}

async function createOrder(cartItems, totalAmount, returnUrl, cancelUrl) {
  const accessToken = await getAccessToken();
  const response = await axios({
    url: `${PAYPAL_BASE}/v2/checkout/orders`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    data: {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: totalAmount.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: totalAmount.toFixed(2),
              },
            },
          },
          items: cartItems.map(item => ({
            name: item.title.substring(0, 127), 
            unit_amount: {
              currency_code: 'USD',
              value: item.price.toFixed(2),
            },
            quantity: item.quantity.toString(),
            sku: item.productId,
          })),
        },
      ],
      application_context: {
        return_url: returnUrl,
        cancel_url: cancelUrl,
      },
    },
  });
  return response.data;
}

async function captureOrder(orderId) {
  const accessToken = await getAccessToken();
  const response = await axios({
    url: `${PAYPAL_BASE}/v2/checkout/orders/${orderId}/capture`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  return response.data;
}

module.exports = {
  createOrder,
  captureOrder,
};