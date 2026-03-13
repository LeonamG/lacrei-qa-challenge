Feature: Pesquisa de profissionais

  Scenario: Buscar profissionais com termo válido
    Given que o usuário está autenticado na plataforma
    When digita um termo de pesquisa
    And clica na lupa
    Then o sistema deve exibir profissionais relacionados à busca

  Scenario: Resultados inconsistentes na pesquisa
    Given que o usuário está autenticado na plataforma
    When digita um termo de pesquisa
    And clica na lupa
    Then o sistema deve exibir profissionais relacionados à busca
    When retorna para a tela anterior
    And digita um termo de pesquisa
    And clica na lupa
    Then o sistema deveria apresentar os mesmos resultados
