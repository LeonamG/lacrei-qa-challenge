Feature: Cadastro de usuário

  Scenario: Realizar cadastro com dados válidos
    Given que o usuário acessa a tela de cadastro
    When preenche os campos obrigatórios corretamente
    And confirma o cadastro
    Then o sistema deve criar a conta com sucesso
    And redirecionar o usuário para a plataforma
