const { Project, User, Country, Category } = require('../../db')

const stripe = require('stripe')('sk_test_51Mk4HfG6CreG8V9N5nKgDAm4wc1uwltulf3qMyrjgKL9a36y6rOhUpe3mIH6SnF1ImzSt4Dli2JPf2aSOMHfZ9by00FprIxbkZ');

  async function checkoutHl(req, res) {

  if (req.method === 'POST') {
    console.log(req.body)
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
                currency: 'usd',
                unit_amount_decimal: req.body.amount * 100,
                product_data: {
                  name: req.body.name,
                  description: req.body.description,
                  images:[req.body.image],
                },
              },
              quantity:1
          },
        ],
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/detailUser/${req.body.userId}/${req.body.id}/?success=true`,
        cancel_url: `${process.env.FRONTEND_URL}/detailUser/${req.body.userId}/${req.body.id}/?canceled=true`,
      });

      res.redirect(303, session.url);
    const project = await Project.findByPk(req.body.id)
    
    const collectedAmount = parseInt(project.amount_collected);
    const paymentAmount = parseInt(req.body.amount);
    const totalAmount = collectedAmount + paymentAmount;
    project.amount_collected = totalAmount.toString();
    await project.save();
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