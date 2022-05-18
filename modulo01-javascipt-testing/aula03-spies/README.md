## O que é spies?

Os fakes permitem substituir uma dependência por algo customizado, mas não possibilitam saber, por exemplo, saber quantas vezes uma função foi chamada, quais parâmetros ela recebeu e quais resultados foram retornados. Para isso existem os spies, eles gravam informações sobre o comportamento do que está sendo “espionado”.

## Porque utilizar stubs?

Imagine o seguinte cenário: 
  O código foi testado, deu tudo como o esperado, todos os testes passaram e então você decide fazer deploy em no seu código e algo estranho começou a acontecer. O sistema ta em loop infinito batendo na API no cliente. Mas como? Sendo que todos os testes passaram?
  Aí que tá! não é por que o valor retornou conforme o esperado que a função se comporta da forma com que você planejou.

  Spies é extremamente util em cenários em que você cria funções recursivas ou depende de uma lógica complexa para um termo de parada.