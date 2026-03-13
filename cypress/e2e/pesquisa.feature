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
