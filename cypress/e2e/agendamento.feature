Feature: Agendamento de consulta

  Scenario: Fluxo completo de agendamento
    Given que o usuário possui uma conta cadastrada
    When informa email e senha corretos
    And clica em entrar
    Then o sistema deve permitir acesso à plataforma

    When realiza uma busca por "São Paulo"
    Then o sistema deve exibir profissionais relacionados à busca

    When clica em agendar consulta e exibir contato
    Then o sistema deve exibir a agenda disponível

    When insere o telefone "71999999999" e submete o formulário
    Then o sistema deveria continuar o fluxo de agendamento

  Scenario: Verificação de telefone interrompe fluxo
    Given que o usuário possui uma conta cadastrada
    When informa email e senha corretos
    And clica em entrar
    Then o sistema deve permitir acesso à plataforma

    When realiza uma busca por "São Paulo"
    And clica em agendar consulta e exibir contato
    And insere o telefone "71999999999" e submete o formulário
    Then o sistema deveria continuar o fluxo de agendamento
    But nenhuma ação ocorre após a verificação
