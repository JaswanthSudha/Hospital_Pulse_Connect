const subscriptionModel = require("../models/subscription")
const stripe = require("stripe")
const plans = {
    basic: {
        duration: 30,
        price: 1000,
        features: ['Feature1', 'Feature2'],
    },
    yearly: {
        duration: 365,
        price: 10000,
        features: ['Feature1', 'Feature2', 'Feature3'],
    },
};
// const createSubscription = async (req, res) => {

//     try {
//         const userId = req.body.user._id
//         const { planType } = req.body
//         console.log(userId)
//         console.log(planType)
//         if (!plans[planType]) {
//             return res.status(400).json({ message: 'Invalid plan type' });
//         }
//         const plan = plans[planType]
//         console.log(plan)
//         const paymentIntent = await stripe.paymentIntents.create({
//             amount: plan.price,
//             currency: 'usd',
//             metadata: { userId, planType },
//         });
//         // console.log(paymentIntent)
//         if (!paymentIntent) {
//             return res.json("Error in paymentIntent")
//         }
//         const endDate = new Date();
//         endDate.setDate(endDate.getDate() + plan.duration);
//         console.log(endDate)
//         const subscription = await subscriptionModel.create({ userId, plan: planType, features: plan.features, endDate })
//         if (!subscription) {
//             return res.status(500).json("Subsctption errror")
//         }
//         console.log(subscription)
//         res.status(201).json({ message: 'Subscription created successfully', subscription, clientSecret: paymentIntent.client_secret });
//     }
//     catch (error) {
//         res.status(500).json({ message: 'Error creating subscription', error });
//     }
// }
const createSubscription = async (req, res) => {
    try {
        const userId = req.body.user._id
        const { planType } = req.body
        if (!plans[planType]) {
            return res.status(400).json({ message: 'Invalid plan type' });
        }
        const plan = plans[planType]
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + plan.duration);
        const subscription = await subscriptionModel.create({ userId, plan: planType, features: plan.features, endDate })
        if (!subscription) {
            return res.status(500).json("Subscription Error")

        }
        console.log(subscription)

        res.status(200).json({ subscription })
    }
    catch (error) {
        res.status(500).json(error)

    }
}
const getSubscriptions = async (req, res) => {
    const userId = req.body.user._id
    try {
        const subscriptions = await subscriptionModel.find({ userId });
        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving subscriptions', error });
    }
};
module.exports = { createSubscription, getSubscriptions }
