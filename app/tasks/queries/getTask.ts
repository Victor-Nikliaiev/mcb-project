import { Ctx, NotFoundError } from "blitz"
import db, { FindFirstTaskArgs } from "db"

type GetTaskInput = Pick<FindFirstTaskArgs, "where" | "include">

export default async function getTask({ where, include }: GetTaskInput, ctx: Ctx) {
  ctx.session.authorize()

  const task = await db.task.findFirst({ where, include })

  if (!task) throw new NotFoundError()

  return task
}
