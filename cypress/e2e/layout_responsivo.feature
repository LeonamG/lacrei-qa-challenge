Feature: Layout responsivo

  Scenario: Visualizar resultados no mobile
    Given que o usuário acessa a plataforma em um dispositivo móvel
    When realiza uma pesquisa
    Then os resultados deveriam ser exibidos em layout responsivo

  Scenario: Layout quebrado no mobile
    Given que o usuário acessa a plataforma pelo celular
    When visualiza os resultados da pesquisa
    Then alguns elementos aparecem desalinhados ou sobrepostos
