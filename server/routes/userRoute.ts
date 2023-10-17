import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { User } from "../schemas/User";
import { generateJWT } from "../jwt/jwt";

const userInput = z.object({
  username: z.string(),
  password: z.string(),
});

export const userRouter = router({
  signUp: publicProcedure.input(userInput).mutation(async (req) => {
    const { username, password } = req.input;
    console.log(username, password);
    const isUser = await User.findOne({ username });
    if (isUser) {
      throw new Error("User already exist");
    } else {
      const newUser = new User({ username, password });
      const data = await newUser.save();

      const id = data._id;
      const token = generateJWT(id);

      return {
        data,
        token,
      };
    }
  }),

  Login: publicProcedure.input(userInput).mutation(async (req) => {
    const { username, password } = req.input;
    const user = await User.findOne({ username, password });
    if (user) {
      const token = generateJWT(user._id);
      return {
        message: "Login Successfully",
        token,
      };
    } else {
      throw new Error("Invalid username or password");
    }
  }),
});
