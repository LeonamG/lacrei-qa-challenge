Feature: Salvamento de número

  Scenario: Salvar número de telefone do usuário
    Given que o usuário informa seu número ao agendar uma consulta
    When conclui a verificação por SMS
    Then o sistema deveria salvar o número para futuras consultas

  Scenario: Número não é salvo
    Given que o usuário já informou seu número anteriormente
    When tenta agendar outra consulta
    Then o sistema solicita novamente o número
    And o telefone não está salvo no perfil
