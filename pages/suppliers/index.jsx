import Head from 'next/head'
import Link from 'next/link'

export default function Home({ suppliers }) {

  function deleteSupplier(id) {
    fetch(`/api/suppliers/informations/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        // alert("Deleting " + id)
        window.location.reload(false);
      })
  }

  return (
    <>
      <Head>
        <title>Suppliers</title>
      </Head>
      <div className="container">
        <h1 className="title">Suppliers</h1>
        <p className="add-supplier">
        <Link href="/suppliers/add" style={{color: 'blue', textDecoration: 'underline'}}>+ New Supplier</Link>

        </p>
        <table className="table">
          <thead>
            
            <tr>
              <th className="table-header">Supplier Name</th>
              <th className="table-header">Address</th>
              <th className="table-header">Phone Number</th>
              <th className="table-header">Action</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map(supplier => {
              return (
                <tr key={supplier._id}>
                  <td className="table-cell">
                    <Link href={`/suppliers/${supplier._id}`}>
                      {supplier.supplier_name}
                    </Link>
                  </td>
                  <td className="table-cell">{supplier.address}</td>
                  <td className="table-cell">{supplier.phone_number}</td>
                  <td className="table-cell">
                    <>
                      <Link href={`/suppliers/update/${supplier._id} `}>Update</Link>
                      &nbsp;&nbsp;&nbsp;
                      <button onClick={() => deleteSupplier(supplier._id)}>Delete</button>
                    </>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        .title {
          font-size: 2rem;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .add-supplier {
          margin-bottom: 1rem;
        }
        .table {
          border-collapse: collapse;
          width: 100%;
        }
        .table-header {
          text-align: center;
          padding: 0.5rem;
          border-bottom: 1px solid #ddd;
        }
        .table-cell {
          text-align: center;
          padding: 0.5rem;
          border-bottom: 1px solid #ddd;
        }
        button {
          background-color: #f44336;
          color: white;
          border: none;
          padding: 0.5rem;
          border-radius: 0.25rem;
          cursor: pointer;
          font-size: 1rem;
        }
        button:hover {
          background-color: #d32f2f;
        }
      `}</style>
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`https://stock-final-6238426/api/suppliers/informations/`)
  const suppliers = await res.json()
  // console.debug('supplier 1', suppliers)
  return { props: { suppliers } }
}

