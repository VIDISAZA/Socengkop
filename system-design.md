# SYSTEM DESIGN

# SocengKOP — Neo-Koperasi Member & Social Engineering Ecosystem

## Hackathon MVP Version 2026

---

# 1. PROJECT OVERVIEW

SocengKOP merupakan platform digital koperasi modern berbasis gamification ecosystem yang dirancang untuk meningkatkan partisipasi anggota koperasi melalui pendekatan behavioral economics, leaderboard komunitas, dan sistem insentif SHU berbasis aktivitas anggota.

Platform ini berfungsi sebagai:

* sistem digital koperasi,
* platform social engagement,
* marketplace UMKM desa,
* serta ekosistem partisipasi ekonomi masyarakat.

SocengKOP bertujuan membangun transformasi koperasi desa menuju ekosistem ekonomi digital nasional berbasis gotong royong modern.

---

# 2. MVP OBJECTIVES

## Tujuan Utama MVP

### Digitalisasi Koperasi

Mengubah operasional koperasi manual menjadi sistem digital modern.

---

### Meningkatkan Engagement Anggota

Mendorong anggota koperasi menjadi aktif melalui sistem gamification dan reward participation.

---

### Mendukung UMKM Desa

Membantu pemasaran produk desa melalui marketplace komunitas.

---

### Transparansi Aktivitas Koperasi

Menyediakan dashboard monitoring koperasi dan aktivitas anggota secara realtime.

---

# 3. MVP SCOPE

## Included Features

### Authentication

* Login sederhana
* Session management
* Role-based access

---

### Dashboard Koperasi

* Statistik anggota
* Statistik poin
* Statistik transaksi
* Aktivitas komunitas

---

### Gamification System

* Poin partisipasi
* Leaderboard komunitas
* Daily missions
* Achievement badges
* Tier membership

---

### Marketplace UMKM

* Produk desa
* Keranjang sederhana
* Checkout sederhana
* Riwayat order

---

### RAT Digital

* Voting anggota
* Polling digital
* Kehadiran RAT

---

## Excluded Features (Future Development)

* Payment Gateway
* QRIS
* AI Recommendation
* Blockchain
* GPS Validation
* National API Integration
* Multi-tenant Enterprise SaaS

---

# 4. USER ROLES

| Role              | Description                    |
| ----------------- | ------------------------------ |
| Super Admin       | Pengelola platform nasional    |
| Pengurus Koperasi | Pengelola operasional koperasi |
| Anggota           | Pengguna koperasi              |
| Vendor/UMKM       | Penjual produk desa            |
| Pemerintah Desa   | Monitoring koperasi            |

---

# 5. SYSTEM ARCHITECTURE

# Frontend Layer

## Technology

* NextJS
* TailwindCSS
* Shadcn/UI

## Features

* Responsive dashboard
* Mobile-first interface
* Realtime UI interaction

---

# Backend Layer

## Technology

* Laravel REST API

## Responsibilities

* Authentication
* Business logic
* API services
* Gamification engine
* Marketplace management

---

# Database Layer

## Technology

* MySQL

## Responsibilities

* User data
* Transaction data
* Point system
* Leaderboard system

---

# Hosting Infrastructure

| Layer    | Platform      |
| -------- | ------------- |
| Frontend | Vercel        |
| Backend  | VPS / Railway |
| Database | MySQL Server  |

---

# 6. HIGH LEVEL ARCHITECTURE

Frontend Web App
↓
REST API Server
↓
Business Logic Service
↓
Database Server

---

# 7. CORE MODULES

---

# 7.1 Authentication Module

## Features

* Login
* Logout
* Session authentication

## MVP Notes

Authentication masih menggunakan sistem email dan password sederhana untuk kebutuhan hackathon MVP.

---

# 7.2 Dashboard Module

## Features

* Total anggota
* Total transaksi
* Total poin komunitas
* Leaderboard komunitas
* Grafik aktivitas koperasi

---

# 7.3 Gamification Module

## Features

* Daily mission
* Referral anggota
* Reward points
* Leaderboard RT/desa
* Achievement badges

---

# 7.4 Tier Membership Module

## Tier Levels

### Level 1 — Social Connector

* Member baru
* Aktivitas dasar koperasi

### Level 2 — Growth Champion

* Referral aktif
* Aktivitas marketplace tinggi

### Level 3 — Ultimate Local Hero

* Kontributor utama koperasi
* Aktivator komunitas digital

---

# 7.5 Marketplace Module

## Features

* List produk UMKM
* Detail produk
* Keranjang
* Checkout sederhana
* Riwayat transaksi

---

# 7.6 RAT Digital Module

## Features

* Voting digital
* Polling komunitas
* Kehadiran RAT
* Komentar anggota

---

# 8. DATABASE DESIGN

---

# Users Table

| Column   | Type    |
| -------- | ------- |
| id       | bigint  |
| fullname | varchar |
| email    | varchar |
| password | varchar |
| role     | varchar |

---

# Members Table

| Column         | Type    |
| -------------- | ------- |
| id             | bigint  |
| user_id        | bigint  |
| cooperative_id | bigint  |
| member_level   | varchar |
| total_points   | integer |

---

# Products Table

| Column       | Type    |
| ------------ | ------- |
| id           | bigint  |
| product_name | varchar |
| price        | decimal |
| stock        | integer |
| image        | varchar |

---

# Orders Table

| Column    | Type    |
| --------- | ------- |
| id        | bigint  |
| member_id | bigint  |
| total     | decimal |
| status    | varchar |

---

# Points Table

| Column        | Type    |
| ------------- | ------- |
| id            | bigint  |
| member_id     | bigint  |
| activity_type | varchar |
| points        | integer |

---

# Voting Table

| Column          | Type    |
| --------------- | ------- |
| id              | bigint  |
| member_id       | bigint  |
| voting_topic    | varchar |
| selected_option | varchar |

---

# 9. GAMIFICATION FLOW

Member Login
↓
Menyelesaikan Aktivitas
↓
Mendapatkan Poin
↓
Naik Level Membership
↓
Masuk Leaderboard
↓
Mendapatkan Booster SHU

---

# 10. API STRUCTURE

# Authentication API

* POST /api/login
* POST /api/logout

---

# Member API

* GET /api/members
* POST /api/members
* GET /api/leaderboard

---

# Marketplace API

* GET /api/products
* POST /api/orders
* GET /api/orders

---

# Gamification API

* GET /api/points
* GET /api/achievements
* GET /api/missions

---

# RAT API

* POST /api/vote
* GET /api/polling

---

# 11. SECURITY ARCHITECTURE

## MVP Security Features

* Password hashing
* Session validation
* Input sanitization
* Role-based access control
* Basic API protection

---

# 12. UI/UX DESIGN CONCEPT

## Design Style

* Modern fintech dashboard
* Gamification ecosystem
* Smart village visual concept
* Nusantara modern branding

---

## Main Color Concept

* Red & White (Merah Putih)
* Emerald Green
* Gold Accent

---

# 13. DEVELOPMENT ROADMAP

# Phase 1 — Hackathon MVP

## Features

* Dashboard
* Gamification
* Marketplace
* RAT digital

---

# Phase 2 — Beta System

## Features

* Payment gateway
* Push notification
* QRIS integration
* Multi koperasi support

---

# Phase 3 — National Ecosystem

## Features

* AI analytics
* National cooperative integration
* Blockchain transparency
* Smart village ecosystem

---

# 14. TECHNOLOGY STACK

| Layer             | Technology   |
| ----------------- | ------------ |
| Frontend          | NextJS       |
| UI Framework      | TailwindCSS  |
| Component Library | Shadcn/UI    |
| Backend           | Laravel      |
| Database          | MySQL        |
| Hosting           | Vercel + VPS |
| API               | REST API     |

---

# 15. KPI MVP

## Success Indicators

* Jumlah anggota aktif
* Jumlah referral anggota
* Jumlah transaksi marketplace
* Aktivitas RAT digital
* Pertumbuhan poin komunitas

---

# 16. BUSINESS VALUE

## Untuk Koperasi

* Modernisasi sistem
* Transparansi aktivitas
* Peningkatan partisipasi anggota

---

## Untuk Masyarakat Desa

* Pemberdayaan UMKM
* Distribusi produk desa
* Digitalisasi ekonomi lokal

---

## Untuk Pemerintah

* Monitoring koperasi
* Statistik aktivitas koperasi
* Validasi ekonomi desa

---

# 17. CONCLUSION

SocengKOP merupakan platform digital koperasi modern berbasis gamification ecosystem yang dirancang untuk memperkuat partisipasi anggota, meningkatkan loyalitas komunitas, serta mempercepat transformasi koperasi desa menuju ekosistem ekonomi digital nasional berbasis gotong royong modern.
