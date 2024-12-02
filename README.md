# Projeto: Aplicação de Gestão de Vagas

## Descrição
Este projeto foi implementado como parte das atividades da ResTIC36, seguindo os requisitos propostos pelo professor Jeferson.

---

## Funcionalidades

1. **Autenticação e Controle de Acesso**  
   - Somente usuários autenticados podem acessar as funcionalidades da aplicação.

2. **Contexto para Usuário Autenticado**  
   - Implementação de um contexto para gerenciar e compartilhar os dados do usuário autenticado em toda a aplicação.

3. **Armazenamento Local dos Dados**  
   - Os dados do usuário autenticado são armazenados no navegador utilizando LocalStorage para manter a sessão ativa.

4. **Edição de Usuário**  
   - Implementação de uma interface para o usuário atualizar suas informações pessoais.

5. **Logout**  
   - Função para encerrar a sessão do usuário de forma segura.

---

## Tecnologias Utilizadas

- **Frontend:** React.js  
- **Backend:** Node.js  
- **Gerenciamento de Estado:** Context API  
- **Armazenamento Local:** LocalStorage  
- **Estilização:** CSS/TailwindCSS  
- **Autenticação:** JWT (JSON Web Token)

---

## Instalação e Configuração

1. **Clone o repositório**  
   - git clone https://github.com/cibellyhnb/projeto_vagas.git
   - cd projeto_vagas

2. **Instale as dependências**  
   - npm install

3. **Configure a URL da API no arquivo** api.js  
 
4. **Inicie a aplicação**  
   - npm start

---

## Como Usar

1. Acesse a aplicação e faça login com suas credenciais.

2. Edite suas informações na tela de perfil.

3. Faça logout para encerrar sua sessão.

---

## Estrutura do Projeto

```plaintext
/src
  /contexts
    AuthContext.tsx
  /types
    User.ts
