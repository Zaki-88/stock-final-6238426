import Head from "next/head";
import Link from "next/link";

export default function Supplier({ supplier }) {
    console.log("supplier 2", supplier);
    if (!supplier)
        return (
            <div>
                <p>Supplier not found</p>
                <Link href="/suppliers">Back</Link>
            </div>
        );

    return (
        <>
            <style jsx>{`
  body {
    background-color: #f7fafc;
  }
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    color: #333;
    font-family: Arial, sans-serif;
    font-size: 16px;
  }
  h1 {
    text-align: center;
    font-size: 40px;
    color: #3182ce;
    margin: 0;
  }
  p {
    font-size: 25px;
    margin: 1rem;
  }
  .back-link {
    display: block;
    margin-top: 1rem;
    font-size: 20px;
    font-weight: bold;
    color: #3182ce;
    text-align: center;
    text-decoration: none;
  }
`}</style>
            <Head>
                <title>{supplier.supplier_name}</title>
            </Head>
            <div className="container">
                <h1>{supplier.supplier_name}</h1>
                <p>Address: {supplier.address}</p>
                <p>Phone Number: {supplier.phone_number}</p>
                <Link href="/suppliers" className="back-link">
                    Back
                </Link>
            </div>
        </>
    );
}

// STEP 1: This function will be executed at the server before loading the page.
import axios from "axios";

export async function getServerSideProps({ params }) {
    console.debug("params", params);
    try {
        const response = await axios.get(
            `https://stock-final-6238426.vercel.app/api/suppliers/informations//${params.id}`
        );
        const supplier = response.data;
        console.debug("supplier 1", supplier);
        return { props: { supplier } };
    } catch (error) {
        console.error(error);
        return { props: {} };
    }
}