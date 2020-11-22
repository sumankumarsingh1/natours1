/* eslint-disable */

import { showAlert } from './alerts'

const stripe = Stripe('pk_test_51HkqyVEQVhqPzS3qZYAxknHkxS1LETg0kBebbjCwRmlE3eRmUrkEc1b6h7bVDphYloaTkBiEc1Dd93MQL1etTy3P00fRiQwnWs');

export const bookTour = async tourId => {
  try{
    // 1) Get Checkout Session from API
    const session = await axios(`/api/v1/booking/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create Checkout form + Charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });


  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }

}