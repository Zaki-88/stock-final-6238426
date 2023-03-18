import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddSupplierPage() {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  const saveSupplier = async (data) => {
    const response = await fetch("/api/suppliers/informations", {
      method: "POST",
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
      alert("Error: " + result.error);
    } else {
      alert("Supplier saved");
      window.location.href = "/suppliers";
    }
    console.log(result);
    setData(JSON.stringify(data));
  };

  return (
    <div style={{ margin: "1rem" }}>
      <form onSubmit={handleSubmit(saveSupplier)}>
        <h1 style={{ textAlign: "center" }}>New Supplier</h1>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
            Supplier Name
          </label>
          <input
            {...register("supplierName", { required: true })}
            placeholder="Enter supplier name"
            style={{ padding: "0.5rem", marginBottom: "1rem", borderRadius: "5px", border: "1px solid #ccc" }}
          />

          <label style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
            Address
          </label>
          <input
            {...register("address", { required: true })}
            placeholder="Enter address"
            style={{ padding: "0.5rem", marginBottom: "1rem", borderRadius: "5px", border: "1px solid #ccc" }}
          />

          <label style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
            Supplier Number
          </label>
          <input
            {...register("supplierNumber")}
            placeholder="Enter supplier number"
            style={{ padding: "0.5rem", marginBottom: "1rem", borderRadius: "5px", border: "1px solid #ccc" }}
          />

          <button
            type="submit"
            style={{
              backgroundColor: "#1565c0",
              color: "#fff",
              padding: "0.5rem",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
            }}
          >
            Save Supplier
          </button>
          <p style={{ textAlign: "center", marginTop: "1rem" }}>{data}</p>
        </div>
      </form>
    </div>
  );
}
