import Link from "next/link";
import Head from "next/head";
import Layout from "../components/layout";

import ElencoTimbrature from "../components/organisms/ElencoTimbrature";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Rilevazione delle ore lavorate</title>
      </Head>
      Prova di inserimento
      <div className="titolo">Elenco delle timbrature</div>
      <ElencoTimbrature></ElencoTimbrature>
      <Link href="/timbratura">
        <a>Inserisci Timbratura </a>
      </Link>
    </Layout>
  );
}
