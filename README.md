# Find A Friend API

API RESTful para adoção de pets, permitindo o cadastro de organizações e pets, além da busca de pets por cidade.

## 🚀 Tecnologias

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Fastify](https://www.fastify.io/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Vitest](https://vitest.dev/)
- [Zod](https://zod.dev/)

## 📋 Pré-requisitos

- Node.js (v20 ou superior)
- PNPM
- PostgreSQL
- Docker (opcional)

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/marlisonmourao/find-a-friend-api-node.git
cd find-a-friend-api-node
```

2. Instale as dependências:

```bash
pnpm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

4. Execute as migrations:

```bash
pnpm prisma migrate dev
```

5. Inicie o servidor:

```bash
pnpm dev
```

## 🧪 Testes

### Testes Unitários

```bash
pnpm test
```

### Testes E2E

```bash
pnpm test:e2e
```

## 📚 Documentação da API

### Endpoints

#### Organizações

- `POST /organizations` - Criar uma nova organização
- `POST /sessions` - Autenticar organização

#### Pets

- `POST /pets` - Cadastrar um novo pet
- `GET /pets` - Listar pets por cidade
- `GET /pets/:id` - Buscar pet por ID

### Exemplos de Requisições

#### Criar Organização

```http
POST /organizations
Content-Type: application/json

{
  "name": "Pet Love",
  "email": "contato@petlove.org",
  "password": "123456",
  "phone": "11999999999",
  "address": "Rua das Flores, 123",
  "city": "São Paulo",
  "state": "SP"
}
```

#### Autenticar Organização

```http
POST /sessions
Content-Type: application/json

{
  "email": "contato@petlove.org",
  "password": "123456"
}
```

#### Cadastrar Pet

```http
POST /pets
Content-Type: application/json
Authorization: Bearer {token}

{
  "name": "Rex",
  "description": "Cachorro dócil e brincalhão",
  "age": "ADULT",
  "size": "MEDIUM",
  "energy": "HIGH",
  "independence": "LOW",
  "environment": "MEDIUM",
  "photos": ["url1", "url2"],
  "requirements": ["Espaço amplo", "Família com experiência"]
}
```

## 🚀 CI/CD

O projeto utiliza GitHub Actions para:

- Executar testes automaticamente em PRs
- Realizar deploy automático quando código é mergeado na main

## 📄 Licença

Este projeto está sob a licença ISC.
