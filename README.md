# Project Bonsae (Backend)

> API REST desenvolvida com Node.js e MongoDB para importação e validação de dados educacionais, utilizada pelo projeto Bonsae.

---

## 📌 Sobre o Projeto

O backend do **Project Bonsae** é responsável por processar, validar, armazenar e retornar dados e erros recebidos por meio de arquivos CSV importados via interface frontend. Cada etapa do processo — como Período Letivo, Disciplinas, Turmas, Usuários e Vínculos — é tratada com regras específicas de validação antes da persistência no banco de dados, mas caso algo dê errado -> ROLLBACK <- !

Este projeto busca garantir a integridade dos dados, com feedback detalhado para cada importação realizada.

---

## 🔧 Tecnologias Utilizadas

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **Cors**
- **Nodemon**
- **Dotenv**

---

## ⚙️ Instalação & configuração

1. **Clone o repositório**
   git clone https://github.com/DaviiLim/bonsae_b.git

2. **Instale as dependências**
   npm install

3. **Configure as variáveis de ambiente**
   Crie um arquivo `.env` com as seguintes chaves:
   ```env
   # PostgreSQL
   DB_HOST=postgres
   DB_PORT=5432
   DB_USERNAME=postgres 
   DB_PASSWORD=admin   
   DB_DATABASE=bonsae_database

   # MongoDB
   MONGO_URI=mongodb://mongo:27017/bonsae_db
   ```

4. **Suba os containers**
  
   docker-compose up --build

---

## 🚀 Funcionalidades da API

- faça o POST seguindo esse padrão:

  - Processo:
   {
    "identificacao": "processo-23"
   } 

  - Período Letivo:
  {  
  "processoID": "6843573a580535d8d8c2c9e1",
  "identificacao": "2025-1",
  "periodoLetivo": "SEMESTRE-1",
  "dataInicial": "2025-01-01T00:00:00.000Z",
  "dataFim": "2025-06-30T23:59:59.999Z"
}

  - Disciplinas:
  {
  "disciplinas": [
    {
      "periodoLetivoID": "6843581e580535d8d8c2c9e6",
      "processoID": "6843573a580535d8d8c2c9e1",
      "nome": "Anatomia Humana I",
      "codigo": "BIO101",
      "dataInicial": "2025-08-01",
      "dataFim": "2025-12-15",
      "categoria": "CURSO",
      "periodoCurricular": "1º semestre",
      "estado": "ATIVA",
      "campus": "Campus Norte"
    },
    {
      "periodoLetivoID": "6843581e580535d8d8c2c9e6",
      "processoID": "6843573a580535d8d8c2c9e1",
      "nome": "Fisiologia I",
      "codigo": "BIO102",
      "dataInicial": "2025-08-01",
      "dataFim": "2025-12-15",
      "categoria": "CURSO",
      "periodoCurricular": "1º semestre",
      "estado": "ATIVA",
      "campus": "Campus Norte"
    },
    {
      "periodoLetivoID": "6843581e580535d8d8c2c9e6",
      "processoID": "6843573a580535d8d8c2c9e1",
      "nome": "Histologia",
      "codigo": "BIO103",
      "dataInicial": "2025-08-01",
      "dataFim": "2025-12-15",
      "categoria": "CURSO",
      "periodoCurricular": "1º semestre",
      "estado": "ATIVA",
      "campus": "Campus Norte"
    },
    {
      "periodoLetivoID": "6843581e580535d8d8c2c9e6",
      "processoID": "6843573a580535d8d8c2c9e1",
      "nome": "Bioquímica",
      "codigo": "BIO104",
      "dataInicial": "2025-08-01",
      "dataFim": "2025-12-15",
      "categoria": "CURSO",
      "periodoCurricular": "2º semestre",
      "estado": "ATIVA",
      "campus": "Campus Norte"
    },
    {
      "periodoLetivoID": "6843581e580535d8d8c2c9e6",
      "processoID": "6843573a580535d8d8c2c9e1",
      "nome": "Genética Médica",
      "codigo": "BIO105",
      "dataInicial": "2025-08-01",
      "dataFim": "2025-12-15",
      "categoria": "CURSO",
      "periodoCurricular": "2º semestre",
      "estado": "ATIVA",
      "campus": "Campus Norte"
    },
    {
      "periodoLetivoID": "6843581e580535d8d8c2c9e6",
      "processoID": "6843573a580535d8d8c2c9e1",
      "nome": "Imunologia",
      "codigo": "BIO106",
      "dataInicial": "2025-08-01",
      "dataFim": "2025-12-15",
      "categoria": "CURSO",
      "periodoCurricular": "2º semestre",
      "estado": "ATIVA",
      "campus": "Campus Norte"
    }
  ]
}

  - Turmas:
  {
  "turmas": [
    {
      "disciplinaCodigo": "684358b4580535d8d8c2c9eb",
      "processoID": "6843573a580535d8d8c2c9e1",
      "turno": "MANHA",
      "turma": "Turma A",
      "codigo": 1001
    },
    {
      "disciplinaCodigo": "684358b4580535d8d8c2c9eb",
      "processoID": "6843573a580535d8d8c2c9e1",
      "turno": "NOITE",
      "turma": "Turma B",
      "codigo": 1002
    },
    {
      "disciplinaCodigo": "684358b4580535d8d8c2c9ec",
      "processoID": "6843573a580535d8d8c2c9e1",
      "turno": "MANHA",
      "turma": "Turma C",
      "codigo": 1003
    },
    {
      "disciplinaCodigo": "684358b4580535d8d8c2c9ec",
      "processoID": "6843573a580535d8d8c2c9e1",
      "turno": "NOITE",
      "turma": "Turma D",
      "codigo": 1004
    },
    {
      "disciplinaCodigo": "684358b4580535d8d8c2c9ed",
      "processoID": "6843573a580535d8d8c2c9e1",
      "turno": "MANHA",
      "turma": "Turma E",
      "codigo": 1005
    }
  ]
}

  - Usuários:
  {
  "usuarios": [
    {
      "perfil": "ALUNO",
      "processoID": "6843573a580535d8d8c2c9e1",
      "nome": "Maria Silva",
      "email": "maria.silva@example.com",
      "senha": "senha123",
      "cpf": "cpf1"
    },
    {
      "perfil": "PROFESSOR",
      "processoID": "6843573a580535d8d8c2c9e1",
      "nome": "João Pereira",
      "email": "joao.pereira@example.com",
      "senha": "senha123",
      "cpf": "cpf4"
    },
    {
      "perfil": "ALUNO",
      "processoID": "6843573a580535d8d8c2c9e1",
      "nome": "Ana Costa",
      "email": "ana.costa@example.com",
      "senha": "senha123",
      "cpf": "cpf2"
    },
    {
      "perfil": "ALUNO",
      "processoID": "6843573a580535d8d8c2c9e1",
      "nome": "Carlos Souza",
      "email": "carlos.souza@example.com",
      "senha": "senha123",
      "cpf": "cpf5"
    },
    {
      "perfil": "PROFESSOR",
      "processoID": "6843573a580535d8d8c2c9e1",
      "nome": "Fernanda Lima",
      "email": "fernanda.lima@example.com",
      "senha": "senha123",
      "cpf": "cpf3"
    }
  ]
}

  - Vínculos (Alunos e Professores):
  {  
    "processoID":"6843573a580535d8d8c2c9e1",
  "vinculos": [
    {
      "email": "ana.costa@example.com",
      "disciplinaID": "684358b4580535d8d8c2c9f0",
      "turmaID": "684359c0580535d8d8c2c9f9"
    },
    {
      "email": "joao.pereira@example.com",
      "disciplinaID": "684358b4580535d8d8c2c9f0",
      "turmaID": "684359c0580535d8d8c2c9f9"
    },
    {
      "email": "maria.silva@example.com",
      "disciplinaID": "684358b4580535d8d8c2c9f0",
      "turmaID": "684359c0580535d8d8c2c9f9"
    },
    {
      "email": "carlos.souza@example.com",
      "disciplinaID": "684358b4580535d8d8c2c9f0",
      "turmaID": "684359c0580535d8d8c2c9f9"
    },
    {
      "email": "fernanda.lima@example.com",
      "disciplinaID": "684358b4580535d8d8c2c9f0",
      "turmaID": "684359c0580535d8d8c2c9f9"
    }
  ]
}

- utilize esse ENDPOINT para MIGRA para o SQL:
http://localhost:3000/processos/684acf61fdca30777e12786b <- coloque seu processoID/migrar

Essa API possui:
- Suporte a status de importação (pendente, aprovado, rejeitado)
- Controle de erros e mensagens detalhadas para feedback no front

---

## 🧪 Testes

Atualmente o projeto não possui testes automatizados. Recomenda-se utilizar ferramentas como Postman para testar as rotas e verificar os retornos de validação.

---

## 📋 Checklist da execução

- [ ] Instalar dependências com o npm install
- [ ] Verificar conexão do DOCKER com os BANCOS e a API (MongoDb e Postgres)
- [ ] Fazer todos os POST´s
- [ ] Concluir com a migração para o POSTGRES

---

## 🤝 Equipe

- **Davi Lima** – Backend (autor do repositório)
- **Caio Jacinto** – Backend
- **Helena** – Backend 

---

## 🔜 Melhorias Futuras

- Autenticação e autorização (JWT)
- Testes automatizados (Jest, Supertest)