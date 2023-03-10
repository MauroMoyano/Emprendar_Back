const stripe = require('stripe')('sk_test_51Mk4HfG6CreG8V9N5nKgDAm4wc1uwltulf3qMyrjgKL9a36y6rOhUpe3mIH6SnF1ImzSt4Dli2JPf2aSOMHfZ9by00FprIxbkZ');

  async function checkoutHl(req, res) {
    console.log(req.body)
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
                currency: 'usd',
                unit_amount_decimal: 2000,
                product_data: {
                  name: 'Donacion voluntaria',
                  description: 'Vas a hacer una donacion al proyecto',
                  images: ['https://example.com/t-shirt.png'],
                },
              },
              quantity:1
          },
        ],
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/checkout/?success=true`,
        cancel_url: `${process.env.FRONTEND_URL}/checkout/?canceled=true`,
      });
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

module.exports = {
    checkoutHl
}