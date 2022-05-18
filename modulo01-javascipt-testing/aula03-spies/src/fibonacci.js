class Fibonnaci {
  *execute(input, current = 0, next = 1) {
    if (input === 0) {
      return 0;
    }
    // Retorna o valor de current para o yeild.
    yield current;
    // Usar "*" no yield delega a função, mas não retorna nenhum valor.
    yield* this.execute(input - 1, next, current + next);
  }
}

module.exports = Fibonnaci;
