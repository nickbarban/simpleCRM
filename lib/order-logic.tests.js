import { mocha } from 'meteor/avital:mocha';
import { chai, assert } from "meteor/practicalmeteor:chai";
import { lineValue, recalculateOrderTotals } from './order-logic'

//// This is what breaks it for me
////const { describe, it } = mocha;

describe('order-logic.js', () => {

    describe('lineValue', () => {
        it('calculates value correctly when quantity is zero', () => {
            const orderLine = {quantity: 0, unitPrice: 3};
            expect(lineValue(orderLine)).to.equal(0);
        });

        it('calculates unit price correctly when values set', () => {
            const orderLine = {quantity: 4, unitPrice: 5};
            expect(lineValue(orderLine)).to.equal(20);
        });
    });


    describe('recalculateOrderTotals', () => {
        it('calculates value correctly for no lines', () => {
            const order = {orderLines: []};

            const result = recalculateOrderTotals(order);

            expect(result.totalValue).to.equal(0);
        });

        it('calculates value correctly for one line', () => {
            const orderLine1 = {quantity: 2, unitPrice: 3};
            const order = {orderLines: [orderLine1]};

            const result = recalculateOrderTotals(order);

            expect(result.totalValue).to.equal(6);
        });

        it('calculates value correctly for two lines', () => {
            const orderLine1 = {quantity: 2, unitPrice: 3};
            const orderLine2 = {quantity: 6, unitPrice: 4};
            const order = {orderLines: [orderLine1, orderLine2]};

            const result = recalculateOrderTotals(order);

            expect(result.totalValue).to.equal(30);
        });
    })

})