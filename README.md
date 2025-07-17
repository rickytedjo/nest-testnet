<br />
<div>
  <h3>Nest Testnet</h3>

  <p>
    <strong>Sepolia testing app running on NestJS</strong>
    <br /><br />
  </p>
</div>

## Stacks
<div>
<a href="https://nestjs.com/">

![Node.js Badge](https://img.shields.io/badge/Node.js-5FA04E?logo=nodedotjs&logoColor=fff&style=for-the-badge)

</a>

<a href="https://nestjs.com/">

![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white&style=for-the-badge)

</a>

<a href="https://www.postgresql.org/">

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white&style=for-the-badge)

</a>

<a href="https://supabase.com">

![Supabase](https://img.shields.io/badge/Supabase-000000?logo=supabase&logoColor=3ECF8E&style=for-the-badge)

</a>

<a href="https://ethers.org/">

![Ethers Badge](https://img.shields.io/badge/Ethers-2535A0?logo=ethers&logoColor=fff&style=for-the-badge)

</a>

<a href="https://ethereum.org">

![Ethereum Badge](https://img.shields.io/badge/Ethereum-3C3C3D?logo=ethereum&logoColor=fff&style=for-the-badge)

</a>

<a href="https://ethereum.org">

![Solidity Badge](https://img.shields.io/badge/Solidity-363636?logo=solidity&logoColor=fff&style=for-the-badge)

</a>

</div>

## Prerequisites

Ensure you have the following installed:

1. **Node.js** (v18 or higher) - [Download Node.js](https://nodejs.org/)
2. **npm** (bundled with Node.js) or **Yarn** (latest version)
3. **PostgreSQL Database** (v13 or higher) - [Download PostgreSQL](https://www.postgresql.org/) or [Host It On Supabase](https://supabase.com/)
4. **Git** - [Download Git](https://git-scm.com/)
5. **Infura Provider** - (https://www.infura.io/)
6. **Metamask Account** - (https://www.metamask.io/)


## 🚦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/rickytedjo/nest-testnet
cd nest-testnet
```
--- 
### 2. Install Dependencies

Run the following command to install required packages:

```bash
npm install
```

or if using Yarn:

```bash
yarn install
```

---
### 3. Environment Setup

Create a `.env` file in the root directory. Use the `.env.example` file as a template:

```bash
cp .env.example .env
```

Fill in the necessary environment variables in the `.env` file. For example:

```env
## SEPOLIA PROVIDER
INFURIA_SEPOLIA_PROVIDER= # Your Infuria provider connection string.
WALLET_KEY = # Your account's private key

## DATABASE
DATABASE_URL= # Database connection string, format: postgresql://user:password@host:port/dbname

# CORS
PORT = 3000 # The port this app runs on. Customizable to your needs.
FRONTEND_URL="http://localhost:8000" # URL of the frontend application, used for CORS and redirects. Customizable to your needs.

---

### 4. Database Setup

Ensure PostgreSQL is running and create a new database for the application:

```sql
CREATE DATABASE your_database_name;
```

---

### 5. Start the Application

Run the application in development mode:

```bash
npm run start:dev
```

---

## Contact
Ricky: <rickyputra.tedjo@gmail.com></br>

Dayu: <dayumahara502@gmail.com>
