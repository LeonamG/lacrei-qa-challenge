Feature: Agendamento de consulta

  Scenario: Fluxo completo de agendamento até verificação de telefone
    Given que o usuário possui uma conta cadastrada
    When informa email e senha corretos
    And clica em entrar
    Then o sistema deve permitir acesso à plataforma
    When realiza uma busca com resultados por "são paulo"
    Then o sistema deve exibir profissionais relacionados à busca
    When clica em agendar consulta e exibir contato
    Then o sistema deve exibir a agenda disponível
    When insere o telefone "71999999999" e submete o formulário
    Then o sistema deveria continuar o fluxo de agendamento

  Scenario: Tentativa de agendamento com telefone inválido
    Given que o usuário está autenticado na plataforma
    When realiza uma busca com resultados por "são paulo"
    And clica em agendar consulta e exibir contato
    Then o sistema deve exibir a agenda disponível
    When insere o telefone "123" e submete o formulário
    Then o sistema deve exibir erro de telefone inválido

  Scenario: Tentativa de agendamento com campo de telefone vazio
    Given que o usuário está autenticado na plataforma
    When realiza uma busca com resultados por "são paulo"
    And clica em agendar consulta e exibir contato
    Then o sistema deve exibir a agenda disponível
    When submete o formulário sem preencher o telefone
    Then o sistema deve exibir erro de campo obrigatório
