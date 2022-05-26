# _Call Stack_ e _Memory Heap_

* **O que é _Call Stack_**? <br>
    _Call stack_ nada mais é do que uma pilha de ação aonde um programa vai executar linha por linha.
    O _Call stack_ é usado para armazenar execuções futuras de execução do nosso programa seguindo o padrão pilha, usando a estrutura _FIFO(first in first out)_.
    Assim, ele adiciona a chamada da função no topo da pilha, a executa e então remove logo depois que todo o código foi executado.

* **O que é _Memory Heap_**? <br>
    A _Memory Heap_ ou Pilha de memória é o lugar aonde é armazenado os endereços de memória que podem ser apontados pelo _Call Stack_ pra trabalhar os valores de variáveis, funções, objetos, _arrays_ e etc..
    A grande diferença entre um e outro, no ponto de vista de armazenamento é que, o _Call Stack_ guarda dados de tipos primitivos enquanto o _Memory Heap_ guarda dados de referência que podem crescer dinamicamente, como funções _arrays_ e outros.
    
* **Resumo** 
  - _Call Stack_ é a pilha de execução de funções e o _Memory Heap_ é a pilha de memória para guardar dados do tipo de referência.

Links de referência:
 - https://levelup.gitconnected.com/understanding-call-stack-and-heap-memory-in-js-e34bf8d3c3a4
 - https://medium.com/@allansendagi/javascript-fundamentals-call-stack-and-memory-heap-401eb8713204
 - https://www.mattzeunert.com/2017/03/29/v8-object-size.html
 - https://developer.mozilla.org/en-US/docs/Glossary/Primitive