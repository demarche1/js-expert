import {expect, describe, test, jest} from "@jest/globals"
import Payment from "../src/events/payment.js"
import Marketing from "../src/observers/marketing.js"
import Shipment from "../src/observers/shipment.js"
import PaymentSubject from '../src/subjects/paymentSubject.js'

describe('Test suite for Observer Pattern', () => {
    test('#PaymentObserver should notify observers', () => {
        const subject = new PaymentSubject()
        const observer = {
            update: jest.fn()
        }

        const data = 'Hello World'
        const expected = data

        subject.subscribe(observer)
        subject.notify(data)
        expect(observer.update).toBeCalledWith(expected)
    })
    test('#PaymentObserver should unsubscribe from observers', () => {
        const subject = new PaymentSubject()
        const observer = {
            update: jest.fn()
        }

        const data = 'Hello World'

        subject.subscribe(observer)
        subject.unsubscribe(observer)
        subject.notify(data)
        expect(observer.update).not.toHaveBeenCalled()
    })
    test('#PaymentObserver should notify observers after a credit card transaction', () => {
        const subject = new PaymentSubject()
        const payment = new Payment(subject)

        const paymentSubjectNotifierSpy = jest.spyOn(subject, subject.notify.name)
        const data = { userName: 'John Doe', id: Date.now() }
    
        payment.creditCard(data)
        expect(paymentSubjectNotifierSpy).toHaveBeenCalledWith(data)
    })
    test('#All should notify subscribers after a credit card payment', () => {
        const subject = new PaymentSubject()
        const shipment = new Shipment()
        const marketing = new Marketing()

        subject.subscribe(shipment)
        subject.subscribe(marketing)

        const payment = new Payment(subject)

        const shipmentUpdateSpy = jest.spyOn(shipment, shipment.update.name)
        const marketingUpdateSpy = jest.spyOn(marketing, marketing.update.name)

        const data = { userName: 'John Doe', id: Date.now() }

        payment.creditCard(data)
        expect(shipmentUpdateSpy).toHaveBeenCalledWith(data)
        expect(marketingUpdateSpy).toHaveBeenCalledWith(data)
    })
})