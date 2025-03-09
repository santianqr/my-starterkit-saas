import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { createAccountFormSchema } from "@/lib/formSchemas";

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
    .input(createAccountFormSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        // Check if the email already exists
        const existingUser = await ctx.db.user.findUnique({
          where: { email: input.email },
        });

        if (existingUser) {
          throw new Error("Email already exists");
        }

        const user = await ctx.db.user.create({
          data: {
            name: input.name,
            email: input.email,
            password: input.password,
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
});
