import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      emailVerified?: boolean;
      role: string; // Assuming role is a string, adjust as necessary
      image?: string;
    } & DefaultSession["user"];
  }
}
