import fastify, { FastifyInstance } from "fastify"
import { ZodError } from "zod"
import { createUserSchema } from "../schemas/users"
import { createUserService, getTotalUsersService, getUserByIdService, getUsersService } from "../service/users"
import { UserAlreadyExistsError } from "../error/users"
import { idSchema, querySchema } from "../schemas/all"

export async function userController(app: FastifyInstance) {

  app.post('/users', async (req, res) => {
    try {
      const validatedUserParams = createUserSchema.parse(req.body)
      const user = await createUserService(validatedUserParams)
      res.status(201).send(user)
    } catch (error) {
      if (error instanceof ZodError) {
        app.log.error(error)
        res.status(400).send({
          message: "Validation Error",
          errors: error.errors,
        })
      } else if (error instanceof UserAlreadyExistsError) {
        app.log.error(error)
        res.status(400).send({
          message: error.message,
        })
      } else {
        app.log.error(error)
        res.status(500).send({
          message: "Internal Server Error",
          error: error,
        })
      }
    }
  })
  app.get('/users/:id', async (req, res) => {
    try {
      const params = req.params as { id: string }
      const id = idSchema.parse(params.id)
      const user = await getUserByIdService(id)
      res.status(200).send(user)
    } catch (error) {
      if (error instanceof ZodError) {
        app.log.error(error)
        res.status(400).send({
          message: "Validation Error",
          errors: error.errors,
        })
      } else {
        app.log.error(error)
        res.status(500).send({
          message: "Internal Server Error",
          error: error,
        })
      }
    }
  })
  app.get('/users', async (req, res) => {
    try {
      const query = querySchema.parse(req.query);

      const skip = Math.max(Number(query.offset), 0);
      const take = Math.max(Number(query.limit), 10);

      const totalUsers = await getTotalUsersService();

      const users = await getUsersService(query);
      res.status(200).send({
        data: users,
        pagination: {
          total: totalUsers,
          offset: Number(skip),
          limit: Number(take),
        }
      })
    } catch (error) {
      app.log.error(error)
      res.status(500).send({
        message: "Internal Server Error",
        error: error,
      })
    }
  })
}