Feature: Pesquisa de profissionais

  Scenario: Buscar profissionais com termo válido
    Given que o usuário está autenticado na plataforma
    When digita um termo de pesquisa
    And clica na lupa
    Then o sistema deve exibir profissionais relacionados à busca

  Scenario: Resultados inconsistentes na pesquisa
    Given que o usuário está autenticado na plataforma
    When realiza uma busca por "psicologa"
    Then o sistema não deveria exibir resultados
    But alguns resultados não são exibidos

  Scenario: Busca com campo vazio exibe todos os profissionais
    Given que o usuário está autenticado na plataforma
    When clica na lupa sem digitar nada
    Then o sistema deve exibir profissionais relacionados à busca

  Scenario: Busca com caracteres especiais
    Given que o usuário está autenticado na plataforma
    When realiza uma busca por "@#$%"
    Then o sistema não deve exibir resultados para busca inválida

  Scenario: Manter resultados ao voltar e repetir busca
    Given que o usuário está autenticado na plataforma
    When realiza uma busca com resultados por "são paulo"
    Then o sistema deve exibir profissionais relacionados à busca
    When retorna e busca novamente por "são paulo"
    Then o sistema deveria apresentar os mesmos resultados
