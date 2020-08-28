import React from "react";
import RigaTimbratura from "../moleculas/RigaTimbratura";
import TimbraturaService from "../../services/TimbraturaService";

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
    TimbraturaService.getAll()
      .then((timbrature) => {
        if (timbrature.data.elenco)
          this.setState({
            elencoTimbrature: timbrature.data.elenco,
          });
      })
      .catch((err) => console.log(err.message))
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
    TimbraturaService.delete(id).then((response) => {
      if (response.status == 200) alert(`Cancellazione avvenuta con successo`);
      let nuovoElencoTimbrature = [...this.state.elencoTimbrature];
      const timbraturaIndex = this.state.elencoTimbrature.findIndex(
        (timbratura) => timbratura.id == id
      );
      nuovoElencoTimbrature.splice(timbraturaIndex, 1);

      this.setState({
        elencoTimbrature: nuovoElencoTimbrature,
      });
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
