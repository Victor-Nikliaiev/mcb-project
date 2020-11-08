import { Ctx } from "blitz"
import db, { FindManyPositionArgs } from "db"

type GetPositionsInput = Pick<FindManyPositionArgs, "where" | "orderBy" | "skip" | "take">

export default async function getPositions(
  { where, orderBy, skip = 0, take }: GetPositionsInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const positions = await db.position.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.position.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    positions,
    nextPage,
    hasMore,
    count,
  }
}
