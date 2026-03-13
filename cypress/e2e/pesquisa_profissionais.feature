Feature: Pesquisa de profissionais

  Scenario: Buscar profissionais
    Given que o usuário está na tela de pesquisa
    When digita um termo de pesquisa
    And clica na lupa
    Then o sistema deve exibir profissionais relacionados à busca

  Scenario: Resultados inconsistentes na pesquisa
    Given que o usuário realizou uma pesquisa
    When retorna para a tela anterior
    And realiza novamente a mesma pesquisa
    Then o sistema deveria apresentar os mesmos resultados
    But alguns resultados não são exibidos
