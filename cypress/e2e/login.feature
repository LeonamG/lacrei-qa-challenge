Feature: Login de usuário

  Scenario: Login com credenciais válidas
    Given que o usuário possui uma conta cadastrada
    When informa email e senha corretos
    And clica em entrar
    Then o sistema deve permitir acesso à plataforma
    And redirecionar para a tela de pesquisa

  Scenario: Login com credenciais inválidas
    Given que o usuário possui uma conta cadastrada
    When informa email e senha incorretos
    And clica em entrar
    Then o sistema deve exibir mensagem de erro
