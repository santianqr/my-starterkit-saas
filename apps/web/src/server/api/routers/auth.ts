import { z } from "zod";
// improt {hash} from "argon2"
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { signinFormSchema, signupFormSchema } from "@/lib/schemas";
import { hash, verify } from "argon2";

export const authRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });

    return post ?? null;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  createAccount: publicProcedure
    .input(signupFormSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        // Check if the email already exists
        const existingUser = await ctx.db.user.findUnique({
          where: { email: input.email },
        });

        if (existingUser) {
          throw new Error("Email already exists");
        }

        const hashedPassword = await hash(input.password);

        const user = await ctx.db.user.create({
          data: {
            name: input.name,
            email: input.email,
            password: hashedPassword,
          },
        });
        return user;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("An unknown error occurred");
        }
      }
    }),
  singin: publicProcedure
    .input(signinFormSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { email: input.email },
      });

      if (!user) {
        throw new Error("Invalid credentials");
      }

      if (!user.password) {
        throw new Error("Invalid credentials");
      }

      const passwordMatch = await verify(user.password, input.password);

      if (!passwordMatch) {
        throw new Error("Invalid credentials");
      }

      return user;
    }),
});
