import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";

const discordScopes = ["identify", "email", "guilds", "guilds.members.read"];

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Discord({
      clientId: process.env.AUTH_DISCORD_ID!,
      clientSecret: process.env.AUTH_DISCORD_SECRET!,
      authorization: {
        params: {
          scope: discordScopes.join(" "),
        },
      },
    }),
  ],

  pages: {
    signIn: "/staff",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
      }

      if (profile) {
        token.discordId = profile.id;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.discordId = token.discordId as string;
      }

      session.accessToken = token.accessToken as string;

      return session;
    },
  },

  trustHost: true,
});