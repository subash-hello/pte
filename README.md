---
title: MasterPTE AI — 90-Band Pearson PTE Platform
emoji: ⚡
colorFrom: indigo
colorTo: purple
sdk: docker
app_port: 3000
pinned: false
license: mit
---

# ⚡ MasterPTE AI — Intelligent Pearson PTE Exam Preparation Platform

MasterPTE AI is an enterprise-grade AI-powered preparation suite for Pearson Test of English (PTE) Academic, featuring 20 authentic question engines, Gemini 1.5/2.5 Pro scoring algorithms, 30 timed mock exam simulations, voice AI companion, and multi-tenant Admin/Branch Admin portals.

## 🚀 Hugging Face Space Deployment

This repository is pre-configured with a multi-stage Docker build ready for **Hugging Face Docker Spaces**.

### Run Locally with Docker
```bash
docker build -t master-pte-ai .
docker run -p 3000:3000 master-pte-ai
```

### Local Development
```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to start practicing.

## 🏛️ Architecture
- **Frontend**: Next.js 16 (App Router), TailwindCSS, Satoshi typography, Framer Motion.
- **Backend Services**: `@/server/services` (AI Scoring, RBAC Authentication, Multi-tenant Admin, Real-time session tracker).
- **Database**: MongoDB Mongoose with resilient in-memory fallback store (`@/server/db`).
- **AI Models**: Google Gemini 1.5 / 2.5 Flash Speech & Text Evaluator.
