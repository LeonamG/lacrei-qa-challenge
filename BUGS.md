# 🐛 Registro de Bugs — Lacrei Saúde

> **Data dos testes:** 13/03/2026
> **Testador:** Leonam Galvão
> **Ambiente:** Staging — https://paciente-staging.lacreisaude.com.br

---

## Ambientes de Teste

| Tipo | Dispositivo | Navegador | Sistema Operacional |
|---|---|---|---|
| Web (Desktop) | PC | Google Chrome | Windows 11 |
| Mobile | Samsung Galaxy S24 Ultra | Samsung Internet | Android |

---

## BUG-001 — Resultados inconsistentes na pesquisa

| Campo | Detalhe |
|---|---|
| **Impacto** | 🟡 Médio |
| **Ambiente** | Staging |
| **Dispositivos** | Desktop (Chrome) e Mobile (Samsung Galaxy S24 Ultra / Samsung Internet) |
| **Tela** | Pesquisa de profissionais |
| **URL** | https://paciente-staging.lacreisaude.com.br/saude/paciente/profissional/busca/ |

**Descrição:**
Ao realizar uma pesquisa, alguns resultados são exibidos. Ao voltar e realizar a mesma pesquisa novamente, os resultados não aparecem.

**Passos para reprodução:**
1. Fazer login na plataforma
2. Acessar a tela de pesquisa
3. Digitar um termo válido (ex: "são paulo") e clicar na lupa
4. Visualizar os resultados exibidos
5. Clicar em voltar
6. Digitar o mesmo termo e clicar na lupa novamente

**Resultado esperado:** Os mesmos resultados devem ser exibidos para o mesmo termo de busca
**Resultado obtido:** Os resultados não são exibidos na segunda busca, a lista aparece vazia

---

## BUG-002 — Layout desconfigurado no mobile após pesquisa

| Campo | Detalhe |
|---|---|
| **Impacto** | 🟡 Médio |
| **Ambiente** | Staging |
| **Dispositivos** | Mobile (Samsung Galaxy S24 Ultra / Samsung Internet) |
| **Tela** | Resultados da pesquisa |
| **URL** | https://paciente-staging.lacreisaude.com.br/saude/paciente/profissional/busca/ |

**Descrição:**
Ao clicar na lupa e carregar os resultados, o layout dos cards de profissionais aparece totalmente desconfigurado em dispositivos móveis.

**Passos para reprodução:**
1. Acessar a plataforma pelo Samsung Galaxy S24 Ultra no Samsung Internet
2. Fazer login
3. Digitar um termo de pesquisa e clicar na lupa
4. Observar os resultados carregados

**Resultado esperado:** Cards de profissionais exibidos em layout responsivo e organizado
**Resultado obtido:** Elementos sobrepostos, desalinhados e fora do grid esperado no mobile

---

## BUG-003 — Logo "Lacrei Saúde" não navega para a tela de pesquisa

| Campo | Detalhe |
|---|---|
| **Impacto** | 🟡 Médio |
| **Ambiente** | Staging |
| **Dispositivos** | Desktop (Chrome) e Mobile (Samsung Galaxy S24 Ultra / Samsung Internet) |
| **Tela** | Resultados da pesquisa |
| **URL** | https://paciente-staging.lacreisaude.com.br/saude/paciente/profissional/busca/ |

**Descrição:**
Ao clicar no logo "Lacrei Saúde" no topo da tela de resultados, nenhuma ação ocorre. O comportamento esperado seria retornar à tela de pesquisa.

**Passos para reprodução:**
1. Fazer login
2. Realizar uma pesquisa e visualizar os resultados
3. Clicar no logo "Lacrei Saúde" no topo da página

**Resultado esperado:** Navegar de volta para a tela de pesquisa
**Resultado obtido:** Nenhuma ação é executada, a página permanece na mesma tela

---

## BUG-004 — Verificação de telefone interrompe fluxo de agendamento

| Campo | Detalhe |
|---|---|
| **Impacto** | 🔴 Crítico |
| **Ambiente** | Staging |
| **Dispositivos** | Desktop (Chrome) e Mobile (Samsung Galaxy S24 Ultra / Samsung Internet) |
| **Tela** | Contatar profissional |
| **URL** | https://paciente-staging.lacreisaude.com.br/saude/paciente/profissional/contatar/fe8e578c/?category=presencial |

**Descrição:**
Ao tentar agendar uma consulta, o sistema solicita o número de celular e envia o código SMS corretamente. Porém, após inserir e validar o código, nenhuma ação ocorre e o fluxo não avança.

**Passos para reprodução:**
1. Fazer login
2. Pesquisar um profissional e clicar na lupa
3. Clicar em "Agendar Consulta" e depois em "Exibir agenda"
4. Inserir o número de celular e submeter
5. Receber o SMS e inserir o código de verificação
6. Confirmar o código

**Resultado esperado:** Sistema avança para a próxima etapa do agendamento após validação do código
**Resultado obtido:** A tela congela sem nenhum feedback ao usuário, o fluxo não continua

---

## BUG-005 — Número de celular não é salvo entre sessões

| Campo | Detalhe |
|---|---|
| **Impacto** | 🟡 Médio |
| **Ambiente** | Staging |
| **Dispositivos** | Desktop (Chrome) e Mobile (Samsung Galaxy S24 Ultra / Samsung Internet) |
| **Tela** | Contatar profissional |
| **URL** | https://paciente-staging.lacreisaude.com.br/saude/paciente/profissional/contatar/fe8e578c/?category=presencial |

**Descrição:**
Após informar o número de celular durante o processo de agendamento, o sistema não persiste esse dado. A cada novo agendamento o usuário precisa informar o número novamente.

**Passos para reprodução:**
1. Realizar um agendamento e informar o número de celular
2. Finalizar ou sair da tela
3. Iniciar um novo agendamento com outro profissional
4. Observar que o campo de telefone está vazio novamente

**Resultado esperado:** Número de celular salvo no perfil do usuário para uso em futuros agendamentos
**Resultado obtido:** Campo de telefone vazio a cada novo agendamento, exigindo nova digitação

---

## BUG-006 — Ausência de botão de Logout

| Campo | Detalhe |
|---|---|
| **Impacto** | 🟠 Alto |
| **Ambiente** | Staging |
| **Dispositivos** | Desktop (Chrome) e Mobile (Samsung Galaxy S24 Ultra / Samsung Internet) |
| **Tela** | Perfil do usuário |
| **URL** | https://paciente-staging.lacreisaude.com.br/perfil/ |

**Descrição:**
Não existe nenhum botão ou opção visível para realizar o logout da plataforma. O usuário não consegue encerrar a sessão de forma explícita.

**Passos para reprodução:**
1. Fazer login na plataforma
2. Acessar o menu de perfil
3. Procurar por opção de logout ou encerrar sessão

**Resultado esperado:** Botão de logout visível e acessível na tela de perfil
**Resultado obtido:** Nenhuma opção de logout disponível em nenhuma área da plataforma

---

## BUG-007 — Tela de perfil não permite edição de dados

| Campo | Detalhe |
|---|---|
| **Impacto** | 🟠 Alto |
| **Ambiente** | Staging |
| **Dispositivos** | Desktop (Chrome) e Mobile (Samsung Galaxy S24 Ultra / Samsung Internet) |
| **Tela** | Perfil do usuário |
| **URL** | https://paciente-staging.lacreisaude.com.br/perfil/ |

**Descrição:**
Ao clicar em "Editar dados" na tela de perfil, nenhum campo editável é exibido e nenhuma ação ocorre. Não é possível, por exemplo, adicionar ou atualizar o número de celular.

**Passos para reprodução:**
1. Fazer login
2. Acessar a tela de perfil
3. Clicar em "Editar dados"

**Resultado esperado:** Formulário de edição com campos preenchíveis é exibido (nome, telefone, etc.)
**Resultado obtido:** Nenhuma ação ocorre ao clicar em "Editar dados", nenhum campo é exibido

---

## BUG-008 — Layout com áreas brancas/pretas no perfil no mobile

| Campo | Detalhe |
|---|---|
| **Impacto** | 🟡 Médio |
| **Ambiente** | Staging |
| **Dispositivos** | Mobile (Samsung Galaxy S24 Ultra / Samsung Internet) |
| **Tela** | Perfil do usuário |
| **URL** | https://paciente-staging.lacreisaude.com.br/perfil/ |

**Descrição:**
Em dispositivos móveis, a tela de perfil exibe áreas com fundo branco ou preto que variam conforme o tema do dispositivo (claro ou escuro), indicando falta de suporte adequado a temas no mobile.

**Passos para reprodução:**
1. Acessar a plataforma pelo Samsung Galaxy S24 Ultra no Samsung Internet
2. Fazer login
3. Navegar até a tela de perfil
4. Observar áreas com fundo incorreto

**Resultado esperado:** Layout consistente e estilizado independente do tema do dispositivo
**Resultado obtido:** Áreas sem estilização exibindo fundo branco ou preto conforme tema do sistema

---

## BUG-009 — "Esqueci a senha" retorna para a tela de login

| Campo | Detalhe |
|---|---|
| **Impacto** | 🔴 Crítico |
| **Ambiente** | Staging |
| **Dispositivos** | Desktop (Chrome) e Mobile (Samsung Galaxy S24 Ultra / Samsung Internet) |
| **Tela** | Login |
| **URL** | https://paciente-staging.lacreisaude.com.br/ |

**Descrição:**
Ao clicar em "Esqueci a senha", o sistema faz uma transição visual como se fosse abrir uma nova tela, mas redireciona de volta para a própria tela de login, impedindo o usuário de recuperar a senha.

**Passos para reprodução:**
1. Acessar a tela de login
2. Clicar em "Esqueci a senha"
3. Observar o comportamento da navegação

**Resultado esperado:** Redirecionar para a tela de recuperação de senha com campo para informar e-mail
**Resultado obtido:** Sistema retorna para a tela de login sem executar nenhuma ação efetiva

---

## Resumo

| Bug | Descrição | Impacto | Dispositivo |
|---|---|---|---|
| BUG-001 | Resultados inconsistentes na pesquisa | 🟡 Médio | Web e Mobile |
| BUG-002 | Layout quebrado no mobile após pesquisa | 🟡 Médio | Mobile |
| BUG-003 | Logo não navega para tela de pesquisa | 🟡 Médio | Web e Mobile |
| BUG-004 | Verificação de telefone trava o agendamento | 🔴 Crítico | Web e Mobile |
| BUG-005 | Número de celular não salvo entre sessões | 🟡 Médio | Web e Mobile |
| BUG-006 | Ausência de botão de logout | 🟠 Alto | Web e Mobile |
| BUG-007 | Edição de perfil não funciona | 🟠 Alto | Web e Mobile |
| BUG-008 | Layout com áreas brancas/pretas no mobile | 🟡 Médio | Mobile |
| BUG-009 | "Esqueci a senha" retorna para login | 🔴 Crítico | Web e Mobile |
