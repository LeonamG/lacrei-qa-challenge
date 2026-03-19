# 🐛 Registro de Bugs — Lacrei Saúde

**Data dos testes:** 13/03/2026  
**Testador:** Leonam Galvão  
**Ambiente:** Staging — https://paciente-staging.lacreisaude.com.br  

---

## Ambientes de Teste

| Tipo | Dispositivo | Navegador | Sistema Operacional |
|---|---|---|---|
| Web (Desktop) | PC | Google Chrome | Windows 11 |
| Mobile | Dispositivo Móvel | Samsung Internet | Android |

---

## BUG-001 — Resultados inconsistentes na pesquisa

**Caminho:** Tela de Pesquisa → Lupa de Pesquisa → Voltar → Lupa de Pesquisa

---

**Formulário/Aba:** Pesquisa de Profissionais

---

**Descrição:**
- Ao realizar uma pesquisa e clicar na lupa, resultados são exibidos corretamente.
- Ao retornar para a tela de pesquisa e repetir o mesmo termo, os resultados não são exibidos.
- O comportamento é inconsistente para o mesmo termo de busca na mesma sessão.

---

**Passo a Passo para Reprodução:**
1. Fazer login na plataforma
2. Acessar a tela de pesquisa
3. Digitar um termo válido (ex: "são paulo") e clicar na lupa
4. Visualizar os resultados exibidos
5. Clicar em voltar
6. Digitar o mesmo termo e clicar na lupa novamente
7. Observar que os resultados não são exibidos

---

**Ambiente Utilizado:**
- **Navegador:** Google Chrome | Samsung Internet
- **Dispositivo:** Desktop | Dispositivo Móvel
- **Ambiente:** Staging
- **Data e Hora:** 13/03/2026

---

**Critérios de Aceite:**
- **Dado que** o usuário realiza uma busca por um termo válido,
- **Quando** retorna à tela de pesquisa e realiza a mesma busca novamente,
- **Então** o sistema deve exibir os mesmos resultados da busca anterior.

---

## BUG-002 — Layout desconfigurado no mobile após pesquisa

**Caminho:** Tela de Pesquisa → Lupa de Pesquisa

---

**Formulário/Aba:** Resultados da Pesquisa

---

**Descrição:**
- Ao clicar na lupa e carregar os resultados da pesquisa, o layout dos cards de profissionais aparece totalmente desconfigurado em dispositivos móveis.
- Elementos são exibidos sobrepostos, desalinhados e fora do grid esperado.

---

**Passo a Passo para Reprodução:**
1. Acessar a plataforma pelo Dispositivo Móvel no Samsung Internet
2. Fazer login
3. Digitar um termo de pesquisa
4. Clicar na lupa
5. Observar o layout dos resultados exibidos

---

**Ambiente Utilizado:**
- **Navegador:** Samsung Internet
- **Dispositivo:** Dispositivo Móvel
- **Ambiente:** Staging
- **Data e Hora:** 13/03/2026

---

**Critérios de Aceite:**
- **Dado que** o usuário realiza uma busca em dispositivo móvel,
- **Quando** os resultados são carregados,
- **Então** o sistema deve exibir os cards de profissionais em layout responsivo e organizado.

---

## BUG-003 — Logo "Lacrei Saúde" não navega para a tela de pesquisa

**Caminho:** Tela de Pesquisa → Lupa de Pesquisa → Clicar no Logo "Lacrei Saúde"

---

**Formulário/Aba:** Resultados da Pesquisa

---

**Descrição:**
- Ao clicar no logo "Lacrei Saúde" no topo da tela de resultados, nenhuma ação ocorre.
- O comportamento esperado seria retornar à tela de pesquisa.
- O problema ocorre tanto em Web quanto em Mobile.

---

**Passo a Passo para Reprodução:**
1. Fazer login na plataforma
2. Realizar uma pesquisa e visualizar os resultados
3. Clicar no logo "Lacrei Saúde" no topo da página
4. Observar que nenhuma navegação ocorre

---

**Ambiente Utilizado:**
- **Navegador:** Google Chrome | Samsung Internet
- **Dispositivo:** Desktop | Dispositivo Móvel
- **Ambiente:** Staging
- **Data e Hora:** 13/03/2026

---

**Critérios de Aceite:**
- **Dado que** o usuário está na tela de resultados da pesquisa,
- **Quando** clica no logo "Lacrei Saúde" no topo da página,
- **Então** o sistema deve navegar de volta para a tela de pesquisa.

---

## BUG-004 — Verificação de telefone interrompe fluxo de agendamento

**Caminho:** Tela de Pesquisa → Lupa de Pesquisa → Agendar Consulta → Exibir Agenda → Inserir Telefone → Verificar Código SMS

---

**Formulário/Aba:** Contatar Profissional

---

**Descrição:**
- Ao tentar agendar uma consulta, o sistema solicita o número de celular e envia o código SMS corretamente.
- Após inserir e validar o código recebido, nenhuma ação ocorre e o fluxo não avança.
- A tela congela sem nenhum feedback ao usuário.

---

**Passo a Passo para Reprodução:**
1. Fazer login na plataforma
2. Pesquisar um profissional e clicar na lupa
3. Clicar em "Agendar Consulta"
4. Clicar em "Exibir Agenda"
5. Inserir o número de celular e submeter
6. Receber o SMS e inserir o código de verificação
7. Confirmar o código
8. Observar que o sistema não avança para a próxima etapa

---

**Ambiente Utilizado:**
- **Navegador:** Google Chrome | Samsung Internet
- **Dispositivo:** Desktop | Dispositivo Móvel
- **Ambiente:** Staging
- **Data e Hora:** 13/03/2026

---

**Critérios de Aceite:**
- **Dado que** o usuário inseriu e validou o código SMS corretamente,
- **Quando** a verificação é concluída,
- **Então** o sistema deve avançar para a próxima etapa do fluxo de agendamento.

---

## BUG-005 — Número de celular não é salvo entre sessões

**Caminho:** Tela de Pesquisa → Lupa de Pesquisa → Agendar Consulta → Exibir Agenda

---

**Formulário/Aba:** Contatar Profissional

---

**Descrição:**
- Após informar o número de celular durante o agendamento, o sistema não persiste esse dado no perfil do usuário.
- A cada novo agendamento o campo de telefone aparece vazio, exigindo nova digitação.

---

**Passo a Passo para Reprodução:**
1. Fazer login na plataforma
2. Realizar um agendamento e informar o número de celular
3. Finalizar ou sair da tela
4. Iniciar um novo agendamento com outro profissional
5. Observar que o campo de telefone está vazio novamente

---

**Ambiente Utilizado:**
- **Navegador:** Google Chrome | Samsung Internet
- **Dispositivo:** Desktop | Dispositivo Móvel
- **Ambiente:** Staging
- **Data e Hora:** 13/03/2026

---

**Critérios de Aceite:**
- **Dado que** o usuário informou seu número de celular durante um agendamento,
- **Quando** inicia um novo agendamento,
- **Então** o sistema deve preencher automaticamente o campo de telefone com o número já cadastrado.

---

## BUG-006 — Ausência de botão de Logout

**Caminho:** Tela de Pesquisa → Perfil

---

**Formulário/Aba:** Perfil do Usuário

---

**Descrição:**
- Não existe nenhum botão ou opção visível para realizar o logout da plataforma.
- O usuário não consegue encerrar a sessão de forma explícita em nenhuma área da aplicação.

---

**Passo a Passo para Reprodução:**
1. Fazer login na plataforma
2. Acessar o menu de perfil
3. Procurar por opção de logout ou encerrar sessão
4. Observar que nenhuma opção está disponível

---

**Ambiente Utilizado:**
- **Navegador:** Google Chrome | Samsung Internet
- **Dispositivo:** Desktop | Dispositivo Móvel
- **Ambiente:** Staging
- **Data e Hora:** 13/03/2026

---

**Critérios de Aceite:**
- **Dado que** o usuário está autenticado na plataforma,
- **Quando** acessa a tela de perfil,
- **Então** o sistema deve exibir um botão de logout visível e funcional.

---

## BUG-007 — Tela de perfil não permite edição de dados

**Caminho:** Tela de Pesquisa → Perfil → Editar Dados

---

**Formulário/Aba:** Perfil do Usuário

---

**Descrição:**
- Ao clicar em "Editar dados" na tela de perfil, nenhum campo editável é exibido e nenhuma ação ocorre.
- Não é possível adicionar ou atualizar informações como número de celular, por exemplo.

---

**Passo a Passo para Reprodução:**
1. Fazer login na plataforma
2. Acessar a tela de perfil
3. Clicar em "Editar dados"
4. Observar que nenhum campo editável é exibido

---

**Ambiente Utilizado:**
- **Navegador:** Google Chrome | Samsung Internet
- **Dispositivo:** Desktop | Dispositivo Móvel
- **Ambiente:** Staging
- **Data e Hora:** 13/03/2026

---

**Critérios de Aceite:**
- **Dado que** o usuário acessa a tela de perfil,
- **Quando** clica em "Editar dados",
- **Então** o sistema deve exibir um formulário com os campos editáveis do perfil.

---

## BUG-008 — Layout com áreas brancas/pretas no perfil no mobile

**Caminho:** Tela de Pesquisa → Perfil

---

**Formulário/Aba:** Perfil do Usuário

---

**Descrição:**
- Em dispositivos móveis, a tela de perfil exibe áreas com fundo branco ou preto que variam conforme o tema do dispositivo (claro ou escuro).
- Indica falta de suporte adequado a temas no mobile.

---

**Passo a Passo para Reprodução:**
1. Acessar a plataforma pelo Dispositivo Móvel no Samsung Internet
2. Fazer login
3. Navegar até a tela de perfil
4. Observar áreas com fundo branco ou preto mal posicionadas

---

**Ambiente Utilizado:**
- **Navegador:** Samsung Internet
- **Dispositivo:** Dispositivo Móvel
- **Ambiente:** Staging
- **Data e Hora:** 13/03/2026

---

**Critérios de Aceite:**
- **Dado que** o usuário acessa a tela de perfil em dispositivo móvel,
- **Quando** o dispositivo está configurado com tema claro ou escuro,
- **Então** o sistema deve exibir o layout corretamente estilizado independente do tema do sistema.

---

## BUG-009 — "Esqueci a senha" retorna para a tela de login

**Caminho:** Tela de Login → Esqueci a Senha

---

**Formulário/Aba:** Login

---

**Descrição:**
- Ao clicar em "Esqueci a senha", o sistema faz uma transição visual como se fosse abrir uma nova tela.
- Porém, redireciona de volta para a própria tela de login sem nenhuma ação efetiva.
- O usuário fica impossibilitado de recuperar sua senha.

---

**Passo a Passo para Reprodução:**
1. Acessar a tela de login
2. Clicar em "Esqueci a senha"
3. Observar que o sistema retorna para a tela de login

---

**Ambiente Utilizado:**
- **Navegador:** Google Chrome | Samsung Internet
- **Dispositivo:** Desktop | Dispositivo Móvel
- **Ambiente:** Staging
- **Data e Hora:** 13/03/2026

---

**Critérios de Aceite:**
- **Dado que** o usuário está na tela de login,
- **Quando** clica em "Esqueci a senha",
- **Então** o sistema deve redirecionar para a tela de recuperação de senha com campo para informar o e-mail cadastrado.

---

## Resumo

| Bug | Caminho | Impacto | Dispositivo |
|---|---|---|---|
| BUG-001 | Pesquisa → Lupa → Voltar → Lupa | 🟡 Médio | Web e Mobile |
| BUG-002 | Pesquisa → Lupa | 🟡 Médio | Mobile |
| BUG-003 | Pesquisa → Lupa → Logo Lacrei | 🟡 Médio | Web e Mobile |
| BUG-004 | Pesquisa → Agendar → Telefone → SMS | 🔴 Crítico | Web e Mobile |
| BUG-005 | Pesquisa → Agendar → Telefone | 🟡 Médio | Web e Mobile |
| BUG-006 | Perfil → Logout | 🟠 Alto | Web e Mobile |
| BUG-007 | Perfil → Editar Dados | 🟠 Alto | Web e Mobile |
| BUG-008 | Perfil → Layout Mobile | 🟡 Médio | Mobile |
| BUG-009 | Login → Esqueci a Senha | 🔴 Crítico | Web e Mobile |
