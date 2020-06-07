import Link from "next/link";
import FormTimbratura from "../components/organisms/FormTimbratura";
export default function Timbratura() {
  return (
    <div className="formInserimentoTimbratura">
      <div className="titolo">Inserimento Timbratura</div>
      <FormTimbratura />
      <br />
      <Link href="index">
        <a>Ritorna all'elenco delle timbrature</a>
      </Link>
    </div>
  );
}
