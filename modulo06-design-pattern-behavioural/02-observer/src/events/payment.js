export default class Payment {
    constructor(paymentSubject){
        this.paymentSubject = paymentSubject
    }

    creditCard(paymentData) {
        console.log(`\nA payment ocurred from ${paymentData.userName}`)
        this.paymentSubject.notify(paymentData)
    }
}