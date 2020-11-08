import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getPosition from "app/positions/queries/getPosition"
import deletePosition from "app/positions/mutations/deletePosition"

export const Position = () => {
  const router = useRouter()
  const positionId = useParam("positionId", "number")
  const [position] = useQuery(getPosition, { where: { id: positionId } })
  const [deletePositionMutation] = useMutation(deletePosition)

  return (
    <div>
      <h1>Position {position.id}</h1>
      <pre>{JSON.stringify(position, null, 2)}</pre>

      <Link href="/positions/[positionId]/edit" as={`/positions/${position.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deletePositionMutation({ where: { id: position.id } })
            router.push("/positions")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowPositionPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/positions">
          <a>Positions</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Position />
      </Suspense>
    </div>
  )
}

ShowPositionPage.getLayout = (page) => <Layout title={"Position"}>{page}</Layout>

export default ShowPositionPage
