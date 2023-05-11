function Page({ prodSlug }: any) {

  return (
    <>
      <h1>Slug in /[prodSlug]/x route: {prodSlug}</h1>
    </>
  )
}

export const runtime = 'experimental-edge'; // 'nodejs' (default) | 'edge'

export const getStaticProps = async ({ params }: any) => {
  const prodSlug = params?.prodSlug ?? ''

  return {
    props: {
        prodSlug
    },
  }
}

export const getStaticPaths = async () => {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }

Page.displayName = 'Page'

export default Page
