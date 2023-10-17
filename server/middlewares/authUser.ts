import { middleware } from "../trpc";
import { publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";


export const isAdminMiddleware = middleware(({ ctx, next }) => {
  if (!ctx.authorized) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx,
  });
});

export const todoProcedure = publicProcedure.use(isAdminMiddleware);
