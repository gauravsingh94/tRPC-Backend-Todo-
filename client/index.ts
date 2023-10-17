import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";
import type { AppRouter } from "../server";

const client = createTRPCProxyClient<AppRouter>({
  links: [
    // loggerLink(), //--> we can add logger link if we wanted to
    httpBatchLink({
      //--> this will be the last link every time (if we call somthing below it that that would not work)
      url: "http://localhost:3000/trpc",
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjdlMTVlZWM3NmRkNzg2YTFjNzE1YyIsImlhdCI6MTY5NzUxNzIzOCwiZXhwIjoxNjk3NTIwODM4fQ.CqQOkHXu0I7PrF-ijc75qCdt6e5UieK1oU8EoclHDCs",
      },
    }),
  ],
});

async function main() {
  // client.secretRoute.query();
  // const user = { username: "Gaurav", password: "123456" };
  // const res = await client.userRouter.Login.mutate(user);
  // console.log(res);

  
  // @@@@@@@@@@@@@ Create Todo @@@@@@@@@@@@@@@
  
  // const todo = await client.todoRouter.createTodo.mutate({
  //   title: "hello",
  //   description: "i have done all the todays works",
  // });

  // @@@@@@@@@@@@@@ Get all Todo @@@@@@@@@@@@
  const todo = await client.todoRouter.getAllTodo.query();
  console.log(todo);
}
main();
