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
        if (timbrature.data.elenco)
          this.setState({
            elencoTimbrature: timbrature.data.elenco,
          });
      })
      .finally(
        this.setState({
          caricamento: false,
        })
      );
  };

  mostraElencoTimbrature = () => {
    return Array.from(this.state.elencoTimbrature).map((timbratura) => {
      return (
        <RigaTimbratura
          key={timbratura.id}
          timbratura={timbratura}
          cancellaTimbratura={this.cancellaTimbratura.bind(this, timbratura.id)}
        />
      );
    });
  };

  cancellaTimbratura = async (id) => {
    const response = await axios.delete(
      process.env.NEXT_PUBLIC_API_URL + "/timbratura/" + id
    );
    if (response.status == 200) {
      alert(`Cancellazione avvenuta con successo`);

      let nuovoElencoTimbrature = [...this.state.elencoTimbrature];
      const timbraturaIndex = this.state.elencoTimbrature.findIndex(
        (timbratura) => timbratura.id == id
      );
      nuovoElencoTimbrature.splice(timbraturaIndex, 1);

      this.setState({
        elencoTimbrature: nuovoElencoTimbrature,
      });
    }
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
