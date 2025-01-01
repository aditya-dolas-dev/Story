
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode ,verify} from "hono/jwt";
import{updatePostInput , createPostInput} from "@adityadolas007/medium-blog-common"


export const blogRouter = new Hono<{
  Bindings:{
    DATABASE_URL:string ,
    JWT_SECRET:string,
  },

  Variables:{
    userId:string;
  }
}>()



blogRouter.use("/*", async (c,next)=>{

  const authHeader = c.req.header("Authorization") || "";
  try{
  const user = await verify(authHeader, c.env.JWT_SECRET)

  if(user){
    c.set("userId",String(user.id));
    await next();
  }else{
    return c.json({msg:"error , youre not logged in"})
  }
}catch(e){
  c.status(403)
  return c.json({msg:"error , youre not logged in"})
}
})

blogRouter.post("/blogs",async (c)=>{

  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
}).$extends(withAccelerate())

  const body = await c.req.json();

  const {success} = createPostInput.safeParse(body);
  if(!success){
    c.status(400);
    return c.json({msg:"Invalid input"});
  }


  const userId = c.get("userId")
  const blog = await prisma.blog.create({
    data:{
      title:body.title,
      content:body.content,
      authorId:Number(userId),
    },
  })
  return c.json({
    id:blog.id
  })
})



blogRouter.put("/updateblog",async (c)=>{

  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
}).$extends(withAccelerate())

  const body = await c.req.json();
  const {success} = updatePostInput.safeParse(body);
  if(!success){
    c.status(400);
    return c.json({msg:"Invalid input"});
  }

  try{
  const blog = await prisma.blog.update({
    where: {
			id: body.id
		},
    data: {
			title: body.title,
			content: body.content,
		}
  })
  return c.json({msg:"blog updated"
  })
}catch(e){
  return c.json("error")
}
})


// pagination
blogRouter.get("/bulk",async (c)=>{

  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL
  }).$extends(withAccelerate())

  try{
  const blog = await prisma.blog.findMany({})
  return c.json({blog})
  }
  catch(e){
  c.status(411)
  return c.json({msg:"error while fetching the blog"})
}
})


// get a single blog by id
blogRouter.get('/:id',async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const id = c.req.param("id");

  try{
  const blogs = await prisma.blog.findMany({
    where:{
      id:Number(id),
    }
  })
  return c.json({blogs})
}catch(e){
  c.status(411)
  return c.json({msg:"error while fetching the blog"})
}
})


