import {Hono} from 'hono'
import {handle} from 'hono/cloudflare-pages'
import {z} from 'zod'
import {zValidator} from '@hono/zod-validator'
import {serve} from "@hono/node-server";
import {db} from "./db";
import {users} from "./users";

const app = new Hono();

const schema = z.object({
  name: z.string(),
});

//type UserSchema = z.infer<typeof schema>;


const route = app.basePath("/api")
  .post('/users', zValidator('form', schema), async (c) => {
    const {name} = c.req.valid('form');

    const res = await db.insert(users).values({name});

    return c.json({
      user: res
    });
  })
  .get('/users', async (c) => {
    const res = await db.select().from(users);

    return c.json({
      users: res
    });
  });

export type AppType = typeof route;

export const onRequest = handle(route);

serve(app, (event) => {
  console.log(`Server running on http://${event.address}:${event.port}`);
});