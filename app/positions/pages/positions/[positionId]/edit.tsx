import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getPosition from "app/positions/queries/getPosition"
import updatePosition from "app/positions/mutations/updatePosition"
import PositionForm from "app/positions/components/PositionForm"

export const EditPosition = () => {
  const router = useRouter()
  const positionId = useParam("positionId", "number")
  const [position, { mutate }] = useQuery(getPosition, { where: { id: positionId } })
  const [updatePositionMutation] = useMutation(updatePosition)

  return (
    <div>
      <h1>Edit Position {position.id}</h1>
      <pre>{JSON.stringify(position)}</pre>

      <PositionForm
        initialValues={position}
        onSubmit={async () => {
          try {
            const updated = await updatePositionMutation({
              where: { id: position.id },
              data: { name: "MyNewName" },
            })
            await mutate(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push("/positions/[positionId]", `/positions/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error creating position " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditPositionPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditPosition />
      </Suspense>

      <p>
        <Link href="/positions">
          <a>Positions</a>
        </Link>
      </p>
    </div>
  )
}

EditPositionPage.getLayout = (page) => <Layout title={"Edit Position"}>{page}</Layout>

export default EditPositionPage
