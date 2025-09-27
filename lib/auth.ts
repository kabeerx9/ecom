// auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ADMIN_EMAILS = ["kabeer786joshi@gmail.com" , "surajremous@gmail.com"];

export const auth = betterAuth({
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },

  // 👇 declare the extra field
  user: {
    additionalFields: {
      role: {
        type: "string",
        input: false,      // users can't pass role from client
        defaultValue: "user",
      },
    },
  },

  database: prismaAdapter(prisma, { provider: "postgresql" }),

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const role = ADMIN_EMAILS.includes(user.email) ? "admin" : "user";
          return { data: { ...user, role } };
        },
        after: async (user) => {
          console.log("✅ USER CREATED:");
        },
      },
    },
  },
});
