const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
// const AppError = require('../utils/appError');

// Public :  pk_test_51HkqyVEQVhqPzS3qZYAxknHkxS1LETg0kBebbjCwRmlE3eRmUrkEc1b6h7bVDphYloaTkBiEc1Dd93MQL1etTy3P00fRiQwnWs
// Secret :  sk_test_51HkqyVEQVhqPzS3qwGNNRr0NgYg0cjnfqZaa2bYKrG3pPaBhAbSHFzeazSNimsQQUpgorFJMjIe0IUnte6BWWNkd00sz88QEXn
// STRIPE_SECRET_KEY

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // Get the currently booked tour
  const tour = await Tour.findById(req.params.tourId);

  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/?tour=${
      req.params.tourId
    }&user=${req.user.id}&price=${tour.price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        name: `${tour.name} Tour`,
        description: tour.summary,
        images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
        amount: tour.price * 100,
        currency: 'usd',
        quantity: 1,
      },
    ],
  });

  // Create session as response
  res.status(200).json({
    status: 'success',
    session,
  });
});

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  // This is only Temporary, becausae it is unsecured. Everyone can make bookings without paying
  const { tour, user, price } = req.query;

  if (!tour && !user && !price) return next();
  await Booking.create({ tour, user, price });

  res.redirect(req.originalUrl.split('?')[0]);
});

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBooking = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
