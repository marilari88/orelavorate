import React from "react";
import RigaTimbratura from "../moleculas/RigaTimbratura";
import axios from "axios";

class ElencoTimbrature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caricamento: true,
      elencoTimbrature: [],
    };
  }

  componentDidMount() {
    this.caricaElencoTimbrature();
  }

  caricaElencoTimbrature = async () => {
    await axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/timbratura")
      .then((timbrature) => {
        this.setState({
          elencoTimbrature: timbrature.data.elenco,
          caricamento: false,
        });
      });
  };

  mostraElencoTimbrature = () => {
    console.log(this.state.elencoTimbrature);
    return Array.from(this.state.elencoTimbrature).map((timbratura) => {
      return <RigaTimbratura key={timbratura.id} timbratura={timbratura} />;
    });
  };

  render() {
    return (
      <>
        {this.mostraElencoTimbrature()}
        <div className="messaggioCaricamento">
          {this.state.caricamento ? "Caricamento In corso" : ""}
        </div>
      </>
    );
  }
}

export default ElencoTimbrature;
