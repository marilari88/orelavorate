import { useRouter } from "next/router";
import FormTimbratura from "../../components/organisms/FormTimbratura";
import React from "react";

export default function Timbratura() {
  const router = useRouter();
  const { idtimbratura } = router.query;

  return (
    <div className="formInserimentoTimbratura">
      <div className="titolo">Timbratura</div>

      <FormTimbratura idTimbratura={idtimbratura} />
      <br />
     
    </div>
  );
}
