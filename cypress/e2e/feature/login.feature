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

  Scenario: Login com campos em branco
    Given que o usuário está na tela de login
    When deixa os campos em branco
    And clica em entrar
    Then o sistema não deve permitir o envio do formulário

  Scenario Outline: Login com email em formato inválido
    Given que o usuário está na tela de login
    When informa email com formato inválido "<email>"
    And clica em entrar
    Then o sistema não deve permitir o envio do formulário

    Examples:
      | email        |
      | semArroba    |
      | @semnome.com |
      | email@       |

  Scenario: Login com senha incorreta para email válido
    Given que o usuário possui uma conta cadastrada
    When informa email correto e senha incorreta
    And clica em entrar
    Then o sistema deve exibir mensagem de erro
