import { Ctx } from "blitz"
import db, { TaskCreateArgs } from "db"

type CreateTaskInput = Pick<TaskCreateArgs, "data" | "include">
export default async function createTask({ data, include }: CreateTaskInput, ctx: Ctx) {
  ctx.session.authorize()

  const task = await db.task.create({ data, include })

  return task
}
