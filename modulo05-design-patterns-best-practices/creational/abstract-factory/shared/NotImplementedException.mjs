export default class NotImplementedException extends Error {
  constructor(fn) {
    super(`The "${fn}" function was not implmented`);
  }
}
