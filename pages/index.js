import Head from "next/head";
import Link from "next/link";
export default function Home() {
  return (
    <div className="center">
      <Head>
        <title>ZheQi Shen Page</title>
      </Head>
      <h1>ZheQi Shen 6238426</h1>
      <p>This is a sample page for my final exam.</p>

      <Link href="/suppliers" style={{color: 'blue', textDecoration: 'underline'}}>Suppliers</Link>

    </div>
  );
}