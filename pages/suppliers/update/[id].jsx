import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Supplier({ supplier }) {
  const { register, handleSubmit, reset } = useForm();
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    reset(supplier)
  }, [])

  const updateSupplier = async (data) => {
    const response = await fetch(`/api/suppliers/informations/${supplier._id}`, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.error) {
      setError("Error: " + result.error)
    } else {
      setData("Supplier updated")
      setTimeout(() => window.location.href = "/suppliers", 1000)
    }
  }

  if (!supplier) return (
    <div>
      <p>Supplier not found</p>
      <Link href="/suppliers">Back</Link>
    </div>
  );

  return (
    <>
      <Head>
        <title>Update {supplier.title}</title>
      </Head>

      <div style={{ margin: '1rem' }}>
        <h1>Update Supplier</h1>
        <form onSubmit={handleSubmit(updateSupplier)}>
          <label htmlFor="supplier_name">Name</label><br />
          <input id="supplier_name" {...register("supplier_name", { required: true })}
            placeholder="Enter supplier name"
          /><br />

          <label htmlFor="address">Address</label><br />
          <input id="address" {...register("address", { required: true })}
            placeholder="Enter supplier address"
          /><br />

          <label htmlFor="phone_number">Number</label><br />
          <input id="phone_number" {...register("phone_number")} placeholder="Enter supplier number"/><br />

          <button type="submit">Update</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {data && <p style={{ color: "green" }}>{data}</p>}
        </form>
      </div>

      <Link href="/suppliers">Back</Link>
    </>
  )
}

// STEP 1: This function will be executed at the server before loading the page.
export async function getServerSideProps({ params }) {
  console.debug('params', params)
  const res = await fetch(`http://localhost:3000/api/suppliers/informations/${params.id}`)
  const supplier = await res.json()
  console.debug('supplier 1', supplier)
  return { props: { supplier } }
}