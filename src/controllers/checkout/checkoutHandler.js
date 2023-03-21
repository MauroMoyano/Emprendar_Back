const { Project, User, Country, Category } = require("../../db");

const stripe = require("stripe")(
  "sk_test_51Mk4HfG6CreG8V9N5nKgDAm4wc1uwltulf3qMyrjgKL9a36y6rOhUpe3mIH6SnF1ImzSt4Dli2JPf2aSOMHfZ9by00FprIxbkZ"
);

async function checkoutHl(req, res) {
  if (req.method === "POST") {
    console.log(req.body);
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "usd",
              unit_amount_decimal: req.body.amount * 100,
              product_data: {
                name: req.body.name,
                description: req.body.description,
                images: [req.body.image],
              },
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.FRONTEND_URL}/detailUser/${req.body.userId}/${req.body.id}/?success=true`,
        cancel_url: `${process.env.FRONTEND_URL}/detailUser/${req.body.userId}/${req.body.id}/?canceled=true`,
      })

      // Redirect the user to the payment page.
      res.redirect(303, session.url);

      // Set up a webhook handler to listen for the `checkout.session.completed` event.
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
      const webhookHandler = stripe.webhooks.constructEvent(
        req.body,
        req.headers["stripe-signature"],
        webhookSecret
      );

      if (webhookHandler.type === "checkout.session.completed") {
        const paymentIntent = webhookHandler.data.object.payment_intent;
        const payment = await stripe.paymentIntents.retrieve(paymentIntent);
        
        // Check if payment was successful.
        if (payment.status === "succeeded") {
          const project = await Project.findByPk(req.body.id);
          const collectedAmount = parseInt(project.amount_collected);
          const paymentAmount = parseInt(req.body.amount);
          const totalAmount = collectedAmount + paymentAmount;
          project.amount_collected = totalAmount.toString();
          await project.save();
        }
      }
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

module.exports = {
  checkoutHl,
};
