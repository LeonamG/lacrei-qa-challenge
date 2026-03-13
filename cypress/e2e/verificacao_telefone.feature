Feature: Verificação de telefone

  Scenario: Salvar número de telefone do usuário
    Given que o usuário está autenticado na plataforma
    When clica em agendar consulta e exibir contato
    And insere o telefone "71999999999" e submete o formulário
    Then o sistema deveria salvar o número para futuras consultas

  Scenario: Número não é salvo entre sessões
    Given que o usuário está autenticado na plataforma
    When clica em agendar consulta e exibir contato
    And insere o telefone "71999999999" e submete o formulário
    Then o sistema solicita novamente o número
    And o telefone não está salvo no perfil

  Scenario: Corrigir número informado incorretamente
    Given que o usuário está autenticado na plataforma
    When clica em agendar consulta e exibir contato
    And corrige o número antes da verificação
    And solicita o envio do SMS novamente
    Then o sistema deveria enviar o código para o novo número

  Scenario: SMS não chega após correção
    Given que o usuário está autenticado na plataforma
    When clica em agendar consulta e exibir contato
    And corrige o número antes da verificação
    And solicita o envio do código novamente
    Then o SMS não é recebido no telefone informado
