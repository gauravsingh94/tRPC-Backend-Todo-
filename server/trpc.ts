import { TRPCError, inferAsyncReturnType, initTRPC } from "@trpc/server";
import { createContext } from "./context/context";

const t = initTRPC
  .context<inferAsyncReturnType<typeof createContext>>()
  .create();



export const router = t.router;

export const middleware = t.middleware;
export const publicProcedure = t.procedure;

