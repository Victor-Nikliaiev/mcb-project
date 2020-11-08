import { Ctx } from "blitz"
import db, { FindManyTaskArgs } from "db"

type GetTasksInput = Pick<FindManyTaskArgs, "where" | "orderBy" | "skip" | "take" | "include">

export default async function getTasks(
  { where, orderBy, skip = 0, take, include }: GetTasksInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const tasks = await db.task.findMany({
    where,
    orderBy,
    take,
    skip,
    include,
  })

  const count = await db.task.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    tasks,
    nextPage,
    hasMore,
    count,
  }
}
