Feature: Login de usuário

  Scenario: Login com credenciais válidas
    Given que o usuário acessa a tela de login
    When informa email e senha corretos
    And clica em entrar
    Then o sistema deve permitir acesso à plataforma
    And redirecionar para a tela de pesquisa