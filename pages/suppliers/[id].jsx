import Head from "next/head"
import Link from "next/link"

// Step 2: This component is rendered from the server (Server-Side Rendering) SSR
export default function Supplier({ supplier }) {
  console.log('supplier 2', supplier)
  if (!supplier) return (
    <div>
      <p>Supplier not found</p>
      <Link href="/suppliers">Back</Link>
      </div>
  );

  return (
    <>
      <Head>
        <title>{supplier.title}</title>
      </Head>
      <h1>{supplier.title}</h1>
      <p>{supplier.content}</p>
      <Link href="/suppliers">Back</Link>
    </>
  )
}

// STEP 1: This function will be executed at the server before loading the page.
export async function getServerSideProps({ params }) {
  console.debug('params', params)
  const res = await fetch(`https://stock-final-6238426.vercel.app/api/suppliers/informations/${params.id}`)
  const supplier = await res.json()
  console.debug('supplier 1', supplier)
  return { props: { supplier } }
}