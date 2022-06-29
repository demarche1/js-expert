const TextProcessorFluentAPI = require("./TextProcessorFluentAPI");
/**
 * Padrão facade serve para abstrair a contrução de objetos complexos
 *
 * Nesse exemplo, se o a função getPeopleFromPDF fosse usada várias vezes no projeto
 * o programador teria que sempre lembrar que a ordem de criação do objeto textProcessorFluentAPI
 * segue aquele fluxo.
 * Com o facade essa complexidade é abstraida e centralizada na classe TextProcessorFacade.
 */
class TextProcessorFacade {
  #textProcessorFluentAPI;
  constructor(text) {
    this.#textProcessorFluentAPI = new TextProcessorFluentAPI(text);
  }

  getPeopleFromPDF() {
    return this.#textProcessorFluentAPI
      .extractPeopleData()
      .divideTextInColumns()
      .removeUnecessarySpaces()
      .mapPerson()
      .build();
  }
}

module.exports = TextProcessorFacade;
