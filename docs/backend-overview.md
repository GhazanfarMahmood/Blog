## ⚙️ Backend

### 🚀 Tech Stack
- Node.js
- Express.js
- TypeScript
- MongoDB (Mongoose)
- REST API

---

### 📦 Setup Nodes
- Initialize project:
- npm init

- Basic configuration:
- Package name: blog-backend
- Entry point: src/server.ts
- License: MIT
- Keywords: blog, backend, express, nodejs, mongodb, typescript

---

### 🧠 Core Concepts
- Node.js

- JavaScript runtime built on Chrome’s V8 engine that allows JavaScript to run on the server side.

- Non-blocking
- Event-driven
- Used for APIs, real-time apps, scalable backend systems
- V8 Engine
- Google’s JavaScript engine used in Chrome
- Also used in Node.js to execute JavaScript outside the browser
- I/O Model

- Input/Output operations like file reading, database calls, or network requests.

- Blocking vs Non-blocking:

- Blocking → waits for task to finish before moving next line
- Non-blocking → continues execution and handles result later using callbacks/promises/async-await
- Controller
- Handles incoming HTTP requests
- Calls service layer for business logic
- Sends response back to client (JSON, status codes, errors)
- Service Layer
- Contains business logic
- Handles database operations and processing rules
- Keeps controller clean and simple
- MVC Pattern
- Model → Database schema (MongoDB/Mongoose)
- View → Not used in backend
- Controller → Handles requests and responses
- Middleware

- Functions that run between request and response.

- Used for:

- Authentication
- Logging
- Validation
- Error handling

---

### 🗄️ Data Model (Mongoose)
- Defines structure of database documents.
 
- Example fields:

- title
- content
- author
- tags
- createdAt

---

### 🌐 Networking Basics
- HTTP vs HTTPS
- HTTP → insecure communication
- HTTPS → secure communication using SSL/TLS encryption
- TCP vs UDP
- TCP → reliable, ordered, error-checked delivery
- UDP → faster but no delivery guarantee
- Common Protocols
- SMTP → sending emails
- IMAP → accessing emails
- FTP / SFTP → file transfer
- SSH → secure remote access
- ICMP → network diagnostics (ping)

---

### 🔐 Security
- Encryption

- Process of converting readable data (plain text) into unreadable format using algorithms and keys to prevent unauthorized access.

---

### ⚙️ TypeScript Setup Fix

- Install Node types:

- npm install --save-dev @types/node

- Initialize TypeScript config:

- npx tsc --init
### 🧭 Microservices

- Small independent services that work together to form a large system.

- 🧩 ERD (Entity Relationship Diagram)

- User → Post → Comment structure:

- User:
- name
- email
- password (hashed)
- role
- Post:
- title
- content
- author (User reference)
- tags
- likes
- Comment:
- user (reference)
- post (reference)
- content

---

### 📌 Example URL Breakdown

- https://www.cppboxes.com

- https → protocol (secure communication)
- www → subdomain
- cppboxes.com → domain name