import Link from "next/link";
import FormTimbratura from "../components/organisms/FormTimbratura";
import React from "react";

export default function Timbratura() {
  return (
    <div className="formInserimentoTimbratura">
      <div className="titolo">Inserimento Timbratura</div>
      <FormTimbratura />
      <br />
      <Link href="/">
        <a>Ritorna all&apos;elenco delle timbrature</a>
      </Link>
    </div>
  );
}
