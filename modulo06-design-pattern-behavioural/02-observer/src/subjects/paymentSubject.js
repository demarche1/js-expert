export default class PaymentSubject {
    #observer = new Set()

    notify(data) {
        this.#observer.forEach(observer => observer.update(data))
    }

    unsubscribe(observable) {
        this.#observer.delete(observable)
    }

    subscribe(observable) {
        this.#observer.add(observable)
    }
}