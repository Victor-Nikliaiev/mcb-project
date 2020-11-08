import React from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createPosition from "app/positions/mutations/createPosition"
import PositionForm from "app/positions/components/PositionForm"

const NewPositionPage: BlitzPage = () => {
  const router = useRouter()
  const [createPositionMutation] = useMutation(createPosition)

  return (
    <div>
      <h1>Create New Position</h1>

      <PositionForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const position = await createPositionMutation({ data: { name: "MyName" } })
            alert("Success!" + JSON.stringify(position))
            router.push("/positions/[positionId]", `/positions/${position.id}`)
          } catch (error) {
            alert("Error creating position " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/positions">
          <a>Positions</a>
        </Link>
      </p>
    </div>
  )
}

NewPositionPage.getLayout = (page) => <Layout title={"Create New Position"}>{page}</Layout>

export default NewPositionPage
