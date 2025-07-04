# B2B Tender Management Platform
A tender‑management platform where companies can Register & manage their profile,Create & publish tenders, Browse & apply to tenders, Search for other companies by name or industry, Checkout complete details of other companies and built with:

Frontend
Next.Js (Typescript)
Tailwind CSS

Backend
Node.js (Express.js)

Database
PostgraySQL
Sequelize CLI for migrations
Zod for schema validation

## Features
Company profile management- CRUD endpoints for company data  
Tender Management- CRUD endpoints for tenders  
Application Workflow- Endpoint for companies to submit proposals against tenders  
Responsive design with Tailwind CSS  
Strong data validation using Zod  
Database migrations with Sequelize     
Secure authentication (JWT) - JWT‑based auth for API access  

## Project Setup
### 1. Clone the repo
git clone https://github.com/Mansi-prasad/B2B-tender-management  
cd B2B-tender-management

### 2.Install Dependencies
npm install (for both frontend and backend)  

### Environment Variables
Create the .env.local and .env file and add the required variables  

### Database Setup with Sequelize
1. Create a PostgreSQL DB on Railway
2. run migrations
npx sequelize-cli db:migrate

### Running the App Locally

Start Backend(Express)  
cd backend  
npm run server  

Start Frontend(Next.js)  
cd frontend  
npm run dev  


