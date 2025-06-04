# **Brain Agriculture - Teste Técnico v2**

## MER

Para resolver o teste criei o seguinte Modelo de Entidade Relacional

![Texto Alternativo](Docs/MER.svg)

## Instalação

####  Baixa o repositório :
```bash
$ git clone git@github.com:fernandohcorrea/trabalhe-conosco-verx.git verx
$ cd verx
```
####  Dependências do Dev-Kit :
```bash
$ npm install
```
####  Usar o Quimera para Instalar Projetos:

- Aqui no dev-kit vc vai ser questionado sobre o uso de npm ou yarn (1 para npm);
- Aqui no dev-kit vc vai ser questionado sobre a criação do .env (1 para sim);

```bash
$ ./quimera install
```

### Subir o Docker
```bash
$ docker compose up --build
```

### Popular o banco com dados de desenvolvimento
- Abra outro terminal no mesmo diretório da onde foi clonado o projeto
```bash
$ docker exec -it <nome-container-api> npm run populate
```


## **O que você precisa desenvolver?**

A proposta é criar uma aplicação para gerenciar o cadastro de produtores rurais, com os seguintes dados:

- [🌟] CPF ou CNPJ
- [🌟]Nome do produtor
- [🌟]Nome da fazenda (propriedade)
- [🌟]Cidade
- [🌟]Estado
- [🌟]Área total da fazenda (em hectares)
- [🌟]Área agricultável (em hectares)
- [❌]Área de vegetação (em hectares)
- [🌟]Safras (ex: Safra 2021, Safra 2022)
- [🌟]Culturas plantadas (ex.: Soja na Safra 2021, Milho na Safra 2021, Café na Safra 2022)

### **Requisitos de negócio**

1. [🌟] Permitir o cadastro, edição e exclusão de produtores rurais.
2. [🌟] Validar o CPF ou CNPJ fornecido pelo usuário.
3. [🌟]Garantir que a soma das áreas agricultável e de vegetação não ultrapasse a área total da fazenda.
4. [🌟] Permitir o registro de várias culturas plantadas por fazenda do produtor.
5. [🌟] Um produtor pode estar associado a 0, 1 ou mais propriedades rurais.
6. [🌟] Uma propriedade rural pode ter 0, 1 ou mais culturas plantadas por safra.
7. [🌟] Exibir um dashboard com:
   - Total de fazendas cadastradas (quantidade).
   - Total de hectares registrados (área total).
   - Gráficos de pizza:
     - Por estado.
     - Por cultura plantada.
     - Por uso do solo (área agricultável e vegetação).

---


### **Se você for desenvolvedor BACKEND:**

- [🌟] Desenvolva uma **API REST**.
- [🌟] Utilize **Docker** para distribuir a aplicação.
- [🌟] Utilize **Postgres** como banco de dados.
- [🌟] Crie os endpoints necessários para atender os requisitos de negócio.
- [❌] Desenvolva testes unitários e integrados.
- [🌟] Estruture dados "mockados" para testes.
- [🌟] Inclua logs para garantir a observabilidade do sistema, facilitando o monitoramento e a identificação de possíveis problemas.
- [🌟] Utilize um framework de ORM.

#### **Se você for desenvolvedor BACKEND Node:**

- [🌟] Utilize **TypeScript**.
- [🌟] Utilize **NestJS**

