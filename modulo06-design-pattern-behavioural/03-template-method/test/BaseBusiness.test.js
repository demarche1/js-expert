import {describe, test, jest, expect, beforeEach} from '@jest/globals'
import BaseBusiness from "../src/business/base/BaseBusiness.js";
import {NotImplementedException} from "../src/util/exceptions.js";

describe('BaseBusiness Suite Test', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })
    test('Should throw NotImplementedException when _validateRequiredFields is not implemented', () => {
        class ConcreteClass extends BaseBusiness {}
        const concreteClass = new ConcreteClass();
        const expectedError = new NotImplementedException(ConcreteClass.prototype._validateRequiredFields.name);

        expect(() => {concreteClass.create({})}).toThrow(expectedError);
    })
    test('Should throw an Error if invalid fields are passed', () => {
        const INVALID_FIELDS_RETURN = false;
        class ConcreteClass extends BaseBusiness {
            _validateRequiredFields = jest.fn().mockReturnValue(INVALID_FIELDS_RETURN)
        }
        const concreteClass = new ConcreteClass();
        const expectedError = new Error('Invalid Fields');

        expect(() => {concreteClass.create({})}).toThrow(expectedError);
    })
    test('Should throw NotImplementedException when _create is not implemented', () => {
        const VALID_FIELDS_RETURN = true;
        class ConcreteClass extends BaseBusiness {
            _validateRequiredFields = jest.fn().mockReturnValue(VALID_FIELDS_RETURN)
        }
        const concreteClass = new ConcreteClass();
        const expectedError = new NotImplementedException(ConcreteClass.prototype._create.name);

        expect(() => {concreteClass.create({})}).toThrow(expectedError);
    })
    test('Should ensure all was called with the correct data', () => {
        const VALID_FIELDS_RETURN = true;
        const SUCCEEDED_CREATE_RETURN = true;

        class ConcreteClass extends BaseBusiness {
            _validateRequiredFields = jest.fn().mockReturnValue(VALID_FIELDS_RETURN)
            _create = jest.fn().mockReturnValue(SUCCEEDED_CREATE_RETURN)
        }

        const createFromBaseClassSpy = jest.spyOn(
            BaseBusiness.prototype,
            BaseBusiness.prototype.create.name
        )

        const concreteClass = new ConcreteClass();
        const result = concreteClass.create()

        expect(result).toBeTruthy()
        expect(createFromBaseClassSpy).toHaveBeenCalled()
        expect(concreteClass._create).toHaveBeenCalled()
        expect(concreteClass._validateRequiredFields).toHaveBeenCalled()
    })
})