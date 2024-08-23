import fastify, { FastifyInstance } from "fastify"
import { ZodError } from "zod"
import { createUserSchema } from "../schemas/users"
import { createUserService, getUserByIdService } from "../service/users"
import { UserAlreadyExistsError } from "../error/users"
import { idSchema } from "../schemas/all"

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
      }   else {
        app.log.error(error)
        res.status(500).send({
          message: "Internal Server Error",
          error: error,
        })
      }
    }
  })
}