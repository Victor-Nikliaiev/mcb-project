import { Ctx } from "blitz"
import db, { PositionUpdateArgs } from "db"

type UpdatePositionInput = Pick<PositionUpdateArgs, "where" | "data">

export default async function updatePosition({ where, data }: UpdatePositionInput, ctx: Ctx) {
  ctx.session.authorize()

  const position = await db.position.update({ where, data })

  return position
}
