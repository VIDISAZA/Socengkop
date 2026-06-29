# Program Koperasi MVP - System Document (PRD)

## 1. Overview
The goal of this project is to build a Minimum Viable Product (MVP) for a Cooperative (Koperasi) management system. It aims to digitize the core operations of a standard cooperative: managing members, tracking savings (simpanan), and managing loans (pinjaman).

## 2. Target Audience
- **Members (Anggota):** Can view their balances, transaction history, and apply for loans.
- **Administrators (Pengurus):** Can manage members, approve loans, and view overall financial health.

## 3. Core Features (MVP)

### 3.1 Authentication & Authorization
- Secure Login/Logout for both Members and Admins.
- Role-Based Access Control (Admin vs. Member).

### 3.2 Member Dashboard
- Summary of total savings (Simpanan Pokok, Wajib, Sukarela).
- Active loan status and outstanding balance.
- Recent transaction history.

### 3.3 Admin Dashboard
- Total cooperative assets (Total Savings vs Total Loans).
- List of pending loan approvals.
- Quick search for members.

### 3.4 Savings Management (Simpanan)
- Record new savings deposits (Admin).
- Track three main types of savings:
  - **Simpanan Pokok:** Initial mandatory savings.
  - **Simpanan Wajib:** Periodic mandatory savings.
  - **Simpanan Sukarela:** Voluntary savings.

### 3.5 Loan Management (Pinjaman)
- Loan Application (Member).
- Loan Approval/Rejection (Admin).
- Repayment tracking and installment calculation.

## 4. Non-Functional Requirements
- **Responsive Design:** Must work on both desktop and mobile devices.
- **Performance:** Fast load times utilizing Next.js Server Components.
- **Security:** Data protection for financial records.
