import express from "express";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { connectDB } from "./db/connectDB";
import { AppRouter } from "./routes/routes";
import { createContext } from "./context/context";

const app = express();
app.use(cors());

connectDB();

app.use("/trpc", createExpressMiddleware({ router: AppRouter, createContext }));

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running at ${port}.`);
});

export type AppRouter = typeof AppRouter;
