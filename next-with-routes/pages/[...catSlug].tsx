function Page({ catSlug }: any) {

  return (
    <>
      <h1>Slug in /[...catSlug] route: {catSlug}</h1>
    </>
  )
}

export const runtime = 'experimental-edge'; // 'nodejs' (default) | 'edge'

export const getStaticProps = async ({ params }: any) => {
  const catSlug = params?.catSlug ?? ''

  return {
    props: {
      catSlug
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
