// O objetivo do FluentAPI é executar tarefas
// como um pipeline, step by step e no fim,
// chama o build. Muito similar ao pattern Builder.
// A diferença é que aqui é sobre processos, o Builder é sobre
// contrução de objetos
class TextProcessorFluentAPI {
  #content;
  constructor(content) {
    this.#content = content;
  }

  extractPeapleData() {
    // ?<= é um padrão que vai dar match em tudo que for afrente do grupo
    // [contratante|contratada] ou um ou outro, e tem a flag "i" que é para ficar case insensitive
    // :\s{1} vai procurar o caracter literal do dois pontos seguindo de 1 espaço
    // tudo fica dentro de "()" pra pegar tudo de for dentro dos "()" pra frente

    // (?!\s) negative look around, vai ignorar o que estiver nessa expressão, ou seja os espaços
    // .*\n vai buscar tudo até o primeiro \n
    // .*? non greety, nesse ? faz com que ele pare na primeira recorrencia, assim ele evita ficar em loop

    const matchPattern =
      /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gim;

    const peapleMatch = this.#content.match(matchPattern);
    this.#content = peapleMatch;
    return this;
  }

  build() {
    return this.#content;
  }
}

module.exports = TextProcessorFluentAPI;
