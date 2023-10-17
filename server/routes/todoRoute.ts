import { router } from "../trpc";
import { todoProcedure } from "../middlewares/authUser";
import { z } from "zod";
import { User } from "../schemas/User";
import { Todo } from "../schemas/Todo";

const todoInput = z.object({
  title: z.string(),
  description: z.string(),
});

export const todoRouter = router({
  createTodo: todoProcedure.input(todoInput).mutation(async (opts) => {
    const userId = opts.ctx.userId;
    console.log("User Id from Routes", userId);
    const isUser = await User.findOne({ _id: userId });
    if (isUser) {
      const { title, description } = opts.input;
      const newTodo = new Todo({
        title,
        description,
      });
      const todo = await newTodo.save();
      isUser.todos.push(todo.id);
      return {
        todo,
      };
    } else {
      throw new Error("User not found");
    }
  }),

  getAllTodo: todoProcedure.query(async (opts) => {
    const userId = opts.ctx.userId;
    const isUser = await User.findOne({ _id: userId });
    if (isUser) {
      const allTodos = isUser.todos;
      return {
        todos: allTodos,
      };
    } else {
      throw new Error("User not found");
    }
  }),
});
