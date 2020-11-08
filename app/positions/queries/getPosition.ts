import { Ctx, NotFoundError } from "blitz"
import db, { FindFirstPositionArgs } from "db"

type GetPositionInput = Pick<FindFirstPositionArgs, "where">

export default async function getPosition({ where }: GetPositionInput, ctx: Ctx) {
  ctx.session.authorize()

  const position = await db.position.findFirst({ where })

  if (!position) throw new NotFoundError()

  return position
}
