# Next.js + Better Auth + Prisma Starter Kit

🚀 A starter kit for building modern web applications with **Next.js 15**, **Better Auth**, **Prisma**, and **shadcn/ui**.

🔗 **[Live Demo](https://nextjs-better-auth-starterkit.vercel.app)**

## 📌 Features

- ✅ **Next.js 15** with App Router
- ✅ **Better Auth** for authentication
- ✅ **Prisma** for database management
- ✅ **shadcn/ui** for UI components
- ✅ **Dashboard** for authenticated users
- ✅ TypeScript support

## 📦 Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Achour/nextjs-better-auth.git
   cd nextjs-better-auth
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:

   ```sh
   cp .env.example .env
   ```

   Fill in the necessary values in the `.env` file.

4. Set up the database:

   ```sh
   npx prisma migrate dev
   ```

5. Start the development server:
   ```sh
   npm run dev
   ```

## 🚀 Usage

- Run `npm run dev` to start the development server.
- Use `npx prisma studio` to manage your database visually.
- Customize authentication using Better Auth settings.

## 🛠️ Tech Stack

- **Next.js 15** - React framework
- **Better Auth** - Authentication
- **Prisma** - Database ORM
- **shadcn/ui** - UI components
- **TypeScript** - Type safety

---

Made with ❤️ by [Achour Meguenni](https://github.com/Achour)
