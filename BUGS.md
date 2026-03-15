# 🐛 Registro de Bugs — Lacrei Saúde

> Ambiente: Staging  
> Data: 13/03/2026  
> Testador: Leonam Galvão  

---

## BUG-001 — Resultados inconsistentes na pesquisa

- **Impacto:** 🟡 Médio
- **Tela:** Pesquisa de profissionais
- **URL:** https://paciente-staging.lacreisaude.com.br/saude/paciente/profissional/busca/
- **Evidência:** https://github.com/LeonamG/lacrei-qa-challenge/issues/3

**Descrição:**  
Ao clicar na lupa e realizar uma pesquisa, alguns resultados são exibidos. Porém, ao voltar e realizar a mesma pesquisa novamente, os resultados não aparecem.

**Passos para reprodução:**
1. Acessar a tela de pesquisa
2. Digitar um termo e clicar na lupa
3. Visualizar os resultados
4. Clicar em voltar
5. Digitar o mesmo termo e clicar na lupa novamente
6. Resultados não são exibidos

**Esperado:** Os mesmos resultados devem ser exibidos para a mesma pesquisa  
**Atual:** Resultados desaparecem na segunda busca  

---

## BUG-002 — Layout desconfigurado no mobile após pesquisa

- **Impacto:** 🟡 Médio
- **Tela:** Resultados da pesquisa
- **URL:** https://paciente-staging.lacreisaude.com.br/saude/paciente/profissional/busca/
- **Evidência:** https://github.com/LeonamG/lacrei-qa-challenge/issues/1

**Descrição:**  
Ao clicar na lupa e carregar os resultados da pesquisa, o layout dos cards de profissionais aparece totalmente desconfigurado em dispositivos móveis.

**Passos para reprodução:**
1. Acessar a plataforma pelo celular
2. Realizar uma pesquisa
3. Clicar na lupa
4. Visualizar os resultados com layout quebrado

**Esperado:** Layout responsivo e organizado  
**Atual:** Elementos sobrepostos ou desalinhados no mobile  

---

## BUG-003 — Logo "Lacrei Saúde" não navega para a tela de pesquisa

- **Impacto:** 🟡 Médio
- **Tela:** Resultados da pesquisa
- **URL:** https://paciente-staging.lacreisaude.com.br/saude/paciente/profissional/busca/
- **Plataformas:** Web e Mobile
- **Evidência:** https://github.com/LeonamG/lacrei-qa-challenge/issues/4

**Descrição:**  
Ao clicar no logo "Lacrei Saúde" no topo da tela de resultados, o comportamento esperado seria retornar à tela de pesquisa, porém nada acontece.

**Passos para reprodução:**
1. Realizar uma pesquisa
2. Na tela de resultados, clicar no logo "Lacrei Saúde" no topo
3. Nada acontece

**Esperado:** Navegar de volta para a tela de pesquisa  
**Atual:** Nenhuma ação é executada  

---

## BUG-004 — Verificação de telefone interrompe fluxo de agendamento

- **Impacto:** 🔴 Crítico
- **Tela:** Contatar profissional
- **URL:** https://paciente-staging.lacreisaude.com.br/saude/paciente/profissional/contatar/fe8e578c/?category=presencial
- **Evidência:** https://github.com/LeonamG/lacrei-qa-challenge/issues/5

**Descrição:**  
Ao tentar agendar uma consulta, o sistema solicita o número de celular e envia o código SMS. Após inserir o código corretamente e validar, nenhuma ação ocorre — o sistema não avança no fluxo.

**Passos para reprodução:**
1. Acessar a tela de pesquisa
2. Pesquisar um profissional e clicar na lupa
3. Clicar em "Agendar Consulta"
4. Clicar em "Exibir agenda"
5. Inserir o número de celular e submeter
6. Receber e inserir o código SMS
7. Nenhuma ação ocorre após a verificação

**Esperado:** Sistema deve continuar o fluxo de agendamento após validação  
**Atual:** Tela congela sem feedback ao usuário  

---

## BUG-005 — Número de celular não é salvo entre sessões

- **Impacto:** 🟡 Médio
- **Tela:** Contatar profissional
- **URL:** https://paciente-staging.lacreisaude.com.br/saude/paciente/profissional/contatar/fe8e578c/?category=presencial
- **Evidência:** https://github.com/LeonamG/lacrei-qa-challenge/issues/6

**Descrição:**  
Após informar o número de celular durante o agendamento, o sistema não salva esse dado. A cada novo agendamento, o usuário precisa informar o número novamente.

**Passos para reprodução:**
1. Realizar um agendamento e informar o número de celular
2. Iniciar um novo agendamento com outro profissional
3. Sistema solicita o número novamente

**Esperado:** Número salvo no perfil para uso em futuros agendamentos  
**Atual:** Número não é persistido entre sessões  

---

## BUG-006 — Ausência de botão de Logout

- **Impacto:** 🟠 Alto
- **Tela:** Perfil do usuário
- **URL:** https://paciente-staging.lacreisaude.com.br/perfil/
- **Evidência:** https://github.com/LeonamG/lacrei-qa-challenge/issues/7

**Descrição:**  
Não existe um botão ou opção visível para realizar o logout da plataforma. O usuário não consegue encerrar a sessão de forma explícita.

**Passos para reprodução:**
1. Fazer login na plataforma
2. Acessar o perfil
3. Procurar opção de logout — não encontrada

**Esperado:** Botão de logout visível e acessível no perfil  
**Atual:** Nenhuma opção de logout disponível  

---

## BUG-007 — Tela de perfil não permite edição de dados

- **Impacto:** 🟠 Alto
- **Tela:** Perfil do usuário
- **URL:** https://paciente-staging.lacreisaude.com.br/perfil/
- **Evidência:** https://github.com/LeonamG/lacrei-qa-challenge/issues/8

**Descrição:**  
Ao clicar em "Editar dados" na tela de perfil, o sistema não exibe os campos editáveis nem permite qualquer alteração. Não é possível, por exemplo, adicionar ou atualizar o número de celular.

**Passos para reprodução:**
1. Acessar o perfil
2. Clicar em "Editar dados"
3. Nenhum campo editável é exibido

**Esperado:** Formulário de edição com campos preenchíveis  
**Atual:** Nenhuma ação ocorre ao clicar em "Editar dados"  

---

## BUG-008 — Layout com áreas brancas/pretas no perfil no mobile

- **Impacto:** 🟡 Médio
- **Tela:** Perfil do usuário
- **URL:** https://paciente-staging.lacreisaude.com.br/perfil/
- **Evidência:** https://github.com/LeonamG/lacrei-qa-challenge/issues/2

**Descrição:**  
Em dispositivos móveis, a tela de perfil apresenta áreas brancas ou pretas que variam conforme o tema do dispositivo (claro ou escuro), indicando problema de responsividade e suporte a temas.

**Passos para reprodução:**
1. Acessar a plataforma pelo celular
2. Navegar até o perfil
3. Observar áreas com fundo branco ou preto mal posicionadas

**Esperado:** Layout consistente independente do tema do dispositivo  
**Atual:** Layout quebrado com áreas sem estilização adequada  

---

## BUG-009 — "Esqueci a senha" retorna para a tela de login

- **Impacto:** 🔴 Crítico
- **Tela:** Login
- **URL:** https://paciente-staging.lacreisaude.com.br/
- **Evidência:** https://github.com/LeonamG/lacrei-qa-challenge/issues/9

**Descrição:**  
Ao clicar em "Esqueci a senha", o sistema faz uma transição como se fosse abrir uma nova tela, mas redireciona de volta para a própria tela de login, impedindo o usuário de recuperar a senha.

**Passos para reprodução:**
1. Acessar a tela de login
2. Clicar em "Esqueci a senha"
3. Sistema retorna para a tela de login

**Esperado:** Redirecionar para a tela de recuperação de senha  
**Atual:** Retorna para a tela de login sem ação efetiva  

---

## Resumo

| Bug | Descrição | Impacto | Issue |
|---|---|---|---|
| BUG-001 | Resultados inconsistentes na pesquisa | 🟡 Médio | [#3](https://github.com/LeonamG/lacrei-qa-challenge/issues/3) |
| BUG-002 | Layout quebrado no mobile após pesquisa | 🟡 Médio | [#1](https://github.com/LeonamG/lacrei-qa-challenge/issues/1) |
| BUG-003 | Logo não navega para tela de pesquisa | 🟡 Médio | [#4](https://github.com/LeonamG/lacrei-qa-challenge/issues/4) |
| BUG-004 | Verificação de telefone trava o agendamento | 🔴 Crítico | [#5](https://github.com/LeonamG/lacrei-qa-challenge/issues/5) |
| BUG-005 | Número de celular não salvo entre sessões | 🟡 Médio | [#6](https://github.com/LeonamG/lacrei-qa-challenge/issues/6) |
| BUG-006 | Ausência de botão de logout | 🟠 Alto | [#7](https://github.com/LeonamG/lacrei-qa-challenge/issues/7) |
| BUG-007 | Edição de perfil não funciona | 🟠 Alto | [#8](https://github.com/LeonamG/lacrei-qa-challenge/issues/8) |
| BUG-008 | Layout com áreas brancas/pretas no mobile | 🟡 Médio | [#2](https://github.com/LeonamG/lacrei-qa-challenge/issues/2) |
| BUG-009 | "Esqueci a senha" retorna para login | 🔴 Crítico | [#9](https://github.com/LeonamG/lacrei-qa-challenge/issues/9) |

---

## BUG-010 — Servidor instável sob carga simultânea de usuários

- **Impacto:** 🔴 Crítico
- **Tela:** Pesquisa de profissionais
- **URL:** https://paciente-staging.lacreisaude.com.br/saude/paciente/profissional/busca/

**Descrição:**  
Durante teste de carga com 5 usuários simultâneos, o servidor apresentou instabilidade severa. 3 de 5 usuários falharam na primeira tentativa e 1 de 5 falhou mesmo com retry, indicando que a aplicação não suporta concorrência mínima de usuários.

**Passos para reprodução:**
1. Executar `node load-test.js` com 5 ou mais usuários simultâneos
2. Observar falhas de timeout no seletor `#atendimentos > .sc-bbSZdi`
3. Observar degradação no tempo de submit do login (~5.5s sob carga vs ~2.5s isolado)

**Resultados do teste (5 usuários simultâneos):**

| Métrica | Valor |
|---|---|
| Taxa de sucesso | 80% (4/5) |
| Falhas na 1ª tentativa | 3/5 (60%) |
| Média submit sob carga | ~5528ms |
| Média submit isolado | ~2500ms |
| Degradação | ~120% mais lento |

**Esperado:** Servidor deve suportar pelo menos 10 usuários simultâneos sem falhas  
**Atual:** Falhas com apenas 5 usuários simultâneos, timeout no carregamento de resultados
