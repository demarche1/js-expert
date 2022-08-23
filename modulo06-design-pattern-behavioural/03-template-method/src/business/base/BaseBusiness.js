import { NotImplementedException } from "../../util/exceptions.js"

export default class BaseBusiness {
    _validateRequiredFields(data) {
        throw new NotImplementedException('_validateRequiredFields')
    }

    _create(data) {
        throw new NotImplementedException('_create')
    }

    create(data) {
        const isValid = this._validateRequiredFields(data)

        if(!isValid) throw new Error('Invalid Fields')

        return this._create(data)
    }
}