![Next Auth Banner](https://i.ibb.co.com/TMqLSCfQ/image.png)
## Next Auth Starter Pack

## Overview

Today we'll learn Next Auth - a complete open-source authentication solution for Next.js applications. This starter pack covers essential setup and implementation.

## Installation

Install the following packages to get started:

```bash
npm install next-auth mongodb bcryptjs react-icons
```

### Required Packages

- **next-auth** - Authentication library for Next.js
- **mongodb** - NoSQL database for storing user data
- **bcryptjs** - Password hashing and encryption
- **react-icons** - Icon library for UI components

## How Bcryptjs Works

Bcryptjs is a password hashing library that securely encrypts passwords. It uses two main functions:

### Hash Function

Converts a plain text password into a secure hash:

```bash
import bcrypt from 'bcryptjs';

const password = 'myPassword123';
const hashedPassword = await bcrypt.hash(password, 10);
```

### Compare Function

Verifies if a plain text password matches the stored hash:

```bash
import bcrypt from 'bcryptjs';

const isMatch = await bcrypt.compare(password, hashedPassword);
console.log(isMatch); // true or false
```

