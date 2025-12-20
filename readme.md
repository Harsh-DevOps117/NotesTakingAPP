# 🚀 Microservices Backend System

A scalable backend system built using **Microservices Architecture**, designed around **domain isolation, async communication, and fault tolerance**.

The system uses:
- **API Gateway** for request orchestration
- **RabbitMQ** for event-driven communication
- **Independent services** with clear ownership

This is not a monolith split into folders.

---

## 🧠 Core Architecture Principles

- Single Responsibility per service
- No shared databases
- Async-first where possible
- Failures are isolated, not cascading
- Gateway handles cross-cutting concerns
- Events > synchronous calls for side effects

---

## 🧱 High-Level Architecture

```

Client
↓
API Gateway
↓
-

## | USER-AUTH | NOTES-CRUD | AGENTIC-AI |

```
      ↓
  RabbitMQ
      ↓
 NOTIFICATION
```

```

---

## 📂 Repository Structure

```

root/
├── API-GATEWAY/      # Entry point, routing, auth validation
├── USER-AUTH/        # Authentication & token service
├── NOTES-CRUD/       # Notes domain logic
├── NOTIFICATION/     # Event-driven notification service
├── AGENTIC-AI/       # AI agent & LLM processing service
└── RABBITMQ/         # Broker config (optional)

```

Each service:
- Runs independently
- Owns its data
- Communicates via HTTP or events
- Can be deployed independently

---

## 🔌 Service Responsibilities

### 1️⃣ API-GATEWAY

**Responsibilities**
- Single public entry point
- JWT validation
- Request routing
- Rate limiting
- Central logging

**Important**
- Gateway NEVER contains business logic
- It only orchestrates and forwards

---

### 2️⃣ USER-AUTH Service

**Responsibilities**
- User registration & login
- Password hashing
- JWT access/refresh token generation
- Role-based access control

**Events Published**
- `user.registered`
- `user.logged_in`
- `user.password_reset`

These events are pushed to **RabbitMQ**, not handled synchronously.

---

### 3️⃣ NOTES-CRUD Service

**Responsibilities**
- CRUD operations on notes
- Ownership validation
- Indexed queries
- Redis caching (optional)

**Events Published**
- `note.created`
- `note.updated`
- `note.deleted`

No notification logic lives here.

---

### 4️⃣ NOTIFICATION Service

**Responsibilities**
- Email alerts
- Login notifications
- System alerts

**How it works**
- Subscribes to RabbitMQ queues
- Consumes events asynchronously
- Never blocks user requests

If this service goes down:
👉 core app still works

That’s the point.

---

### 5️⃣ AGENTIC-AI Service

**Responsibilities**
- AI-powered task execution
- LLM-based summarization & analysis
- Intelligent agent workflows

**Event Consumption**
- Consumes events like:
  - `note.created`
  - `conversation.completed`
- Can also publish:
  - `ai.task.completed`
  - `ai.summary.generated`

AI stays isolated because:
- It’s slow
- It’s expensive
- It’s unpredictable

---

## 🐇 RabbitMQ (Event Backbone)

RabbitMQ is the **spine** of this system.

### Why RabbitMQ?

- Loose coupling
- Retry mechanisms
- Back-pressure handling
- Async side effects
- Service failure isolation

### Usage Pattern

- **Producers:** USER-AUTH, NOTES-CRUD, AGENTIC-AI
- **Consumers:** NOTIFICATION, AGENTIC-AI

### Example Events

```

user.logged_in
note.created
note.updated
ai.summary.generated

````

Events are **fire-and-forget**.

No service waits for another service to respond.

---

## 🔄 Communication Model

| Type            | Usage |
|-----------------|------|
| HTTP (Sync)     | Gateway → Core services |
| RabbitMQ (Async)| Notifications, AI tasks, system events |

If you’re doing everything over HTTP — you missed the point.

---

## 🔐 Security Model

- JWT-based authentication
- Tokens validated at Gateway
- Internal services trust gateway headers
- RabbitMQ is internal-only
- No public exposure of internal services

---

## ⚙️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Auth:** JWT
- **Database:** MongoDB
- **Cache:** Redis
- **Message Broker:** RabbitMQ
- **AI:** OpenAI LLMs
- **Pattern:** API Gateway + Event-Driven Microservices

---

## 🧪 Local Development

Start services individually:

```bash
cd SERVICE_NAME
npm install
npm run dev
````

Recommended startup order:

1. RabbitMQ
2. Core services
3. API Gateway

---
