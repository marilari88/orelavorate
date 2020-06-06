import Link from "next/link";
import Head from "next/head";
import Layout from "../components/layout";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Rilevazione delle ore lavorate</title>
      </Head>
 
        Prova di inserimento
        <div className="titolo">Elenco delle timbrature</div>
        <Link href="/timbratura">
          <a>Inserisci Timbratura </a>
        </Link>

     
    </Layout>
  );
}
