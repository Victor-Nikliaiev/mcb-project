import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getPositions from "app/positions/queries/getPositions"

const ITEMS_PER_PAGE = 100

export const PositionsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ positions, hasMore }] = usePaginatedQuery(getPositions, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {positions.map((position) => (
          <li key={position.id}>
            <Link href="/positions/[positionId]" as={`/positions/${position.id}`}>
              <a>{position.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const PositionsPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/positions/new">
          <a>Create Position</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <PositionsList />
      </Suspense>
    </div>
  )
}

PositionsPage.getLayout = (page) => <Layout title={"Positions"}>{page}</Layout>

export default PositionsPage
