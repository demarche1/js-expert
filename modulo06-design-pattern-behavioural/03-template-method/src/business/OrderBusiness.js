import BaseBusiness from "./base/BaseBusiness";

export default class OrderBusiness extends BaseBusiness {
    #order = new Set()
    _validateRequiredFields(data) {
        return Boolean(data.amount && data.products.length)
    }

    _create(data) {
        this.#order.add(data)
        return true
    }
}