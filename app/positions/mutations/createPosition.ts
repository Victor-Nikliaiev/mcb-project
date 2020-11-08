import { Ctx } from "blitz"
import db, { PositionCreateArgs } from "db"

type CreatePositionInput = Pick<PositionCreateArgs, "data">
export default async function createPosition({ data }: CreatePositionInput, ctx: Ctx) {
  ctx.session.authorize()

  const position = await db.position.create({ data })

  return position
}
