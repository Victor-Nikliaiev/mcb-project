import { Ctx } from "blitz"
import db, { PositionDeleteArgs } from "db"

type DeletePositionInput = Pick<PositionDeleteArgs, "where">

export default async function deletePosition({ where }: DeletePositionInput, ctx: Ctx) {
  ctx.session.authorize()

  const position = await db.position.delete({ where })

  return position
}
