import {router,publicProcedure} from "../trpc";
import { todoRouter } from "./todoRoute";
import { userRouter } from "./userRoute";

export const AppRouter = router({
    todoRouter,
    userRouter    
});