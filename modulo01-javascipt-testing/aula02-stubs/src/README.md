## O que é stubs?

Fakes e Stubs alteram o comportamento padrão de uma função e substitui a dependência real.
Quando usamos stubs, podemos descrever o comportamento esperado de uma função, dessa maneira testes de unidade mapeiam a saída sem internet ou serviços de terceiros, elas focam no output e no processamento lógico do código.

## Porque utilizar stubs?

Imagine o seguinte cenário: 
  O seu serviço tem várias regras de negócio que dependem de uma API externa de CEP.
  Em um belo dia a API de CEP por algum motivo sai do ar, de repente, todos os testes param de passar pois dependem da API para funcionar e nem uma nova alteração será aprovada pois os testes não estão passando. O que fazer?

  Aí ta a importância de utilizar as stubs.
