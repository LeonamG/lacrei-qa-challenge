Feature: Recuperação de senha

  Scenario: Solicitar recuperação de senha com sucesso
    Given que o usuário está na tela de login
    When clica em "Esqueci a senha"
    Then o sistema deveria redirecionar para a tela de recuperação de senha

  Scenario: Falha ao abrir tela de recuperação
    Given que o usuário está na tela de login
    When clica em "Esqueci a senha"
    Then o sistema retorna para a tela de login
    And não apresenta a tela de recuperação de senha
