import {describe, test, jest, expect, beforeEach} from '@jest/globals'
import OrderBusiness from '../src/business/OrderBusiness.js'
import Order from '../src/entities/Order.js'

describe.only('OrderBusiness Suite Test', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    describe('#OrderBusiness', () => {
        test('Execute OrderBusiness without template method pattern', () => {
            const order = new Order({
                customerId: 1,
                amount: 100.000,
                products: [{ name: "Civic" }]
            })
            const orderBusiness = new OrderBusiness()
            
            const isValid = orderBusiness._validateRequiredFields(order)
            expect(isValid).toBeTruthy()

            const result = orderBusiness._create(order)
            expect(result).toBeTruthy()
        })
        test('Execute OrderBusiness with template method pattern', () => {
            const order = new Order({
                customerId: 1,
                amount: 100.000,
                products: [{ name: "Civic" }]
            })
            const orderBusiness = new OrderBusiness()
            const calledValidationSpy = jest.spyOn(orderBusiness, orderBusiness._validateRequiredFields.name)
            const calledCreateSpy = jest.spyOn(orderBusiness, orderBusiness._create.name)
            const result = orderBusiness.create(order)

            expect(result).toBeTruthy()
            expect(calledValidationSpy).toHaveBeenCalledWith(order)
            expect(calledCreateSpy).toHaveBeenCalledWith(order)
        })
    })
})