import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("ideavault");

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || "kV9mPxR7nL3wQjY8tF2aHcU5dBgZ0sEi",
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENTID || "dummy-client-id",
      clientSecret: process.env.GOOGLE_SECRET || "dummy-secret",
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 7 * 24 * 60 * 60,
    },
  },
  plugins: [jwt()],
});
