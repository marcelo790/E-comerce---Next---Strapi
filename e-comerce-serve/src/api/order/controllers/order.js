'use strict';
// @ts-ignore
const stripe = require("stripe")("sk_test_51OtBhOBW7a3BidVemWReboJFVcQ450lRxNfrTeAcg9KO77gU82FKKTtq34owDGm8yVfpuuJL5OBr8xY9JEuqogU300ZZsTVmWX");

function calcDiscountPrice(price, discount){
    if(!discount) return price;

    const discountAmount = (price * discount) / 100;
    const result = price - discountAmount;

    return result.toFixed(2);
}

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// @ts-ignore
module.exports = createCoreController('api::order.order', ({strapi}) => ({
    async paymentOrder(ctx) {
        // @ts-ignore
        const {token, products, idUser, addressShipping} = ctx.request.body;
        let totalPayment = 0;
        products.forEach((product) => {
            const priceTemp = calcDiscountPrice(product.attributes.price, product.attributes.discount);
            totalPayment += Number(priceTemp) * product.quantity;
        });

        const charge = await stripe.charges.create({
            amount: Math.round(totalPayment * 100),
            currency: "eur",
            source: token.id,
            description: `User ID: ${idUser}`
        });

        const data = {
            products,
            user: idUser,
            totalPayment,
            idPayment: charge.id,
            addressShipping
        }

        const model = strapi.contentTypes["api::order.order"];

        const validData = await strapi.entityValidator.validateEntityCreation(
            model, 
            // @ts-ignore
            data
        );

        const entry = await strapi.db
        .query("api::order.order")
        .create({data: validData});

        return entry;
    }
}));
