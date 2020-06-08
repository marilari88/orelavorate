import React from "react";
import { stringaTempo, calcoloSecondi } from "../../utils/differenzaorario";
import axios from "axios";

class FormTimbratura extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: "", ingresso: "", uscita: "", differenza: "" };
  }

  componentDidMount() {
    this.setState((props) => ({
      id: props.id,
      ingresso: props.ingresso,
      uscita: props.uscita,
      differenza: props.differenza,
    }));
  }

  render() {
    return !this.state.ingresso
      ? this.mostraIngressoDaInserire()
      : !this.state.uscita
      ? this.mostraUscitaDaInserire()
      : this.mostraDatiCompleti();
  }

  mostraIngressoDaInserire = () => {
    return (
      <>
        <div className="rigaInserimento">
          {/*      <label htmlFor="orarioIngresso">Inserisci Ingresso alle </label>
          <input type="datetime" name="orarioingresso" id="orarioIngresso" /> */}
          <button onClick={this.inserisciEntrata}>Inserisci Entrata</button>
        </div>
      </>
    );
  };

  mostraUscitaDaInserire = () => {
    return (
      <>
        <div className="rigaInserimento">
          <div>Sei entrato alle {this.state.ingresso.toLocaleString()}</div>
          <button onClick={this.inserisciUscita}>Inserisci Uscita</button>
        </div>
      </>
    );
  };

  mostraDatiCompleti = () => {
    return (
      <>
        <div className="rigaInserimento">
          <div>
            Hai lavorato dalle {this.state.ingresso.toLocaleString()} alle{" "}
            {this.state.uscita.toLocaleString()}
          </div>
          <div>
            Hai lavorato per un totale di {stringaTempo(this.state.differenza)}
          </div>
          {/* <button>Inizia un nuovo turno di lavoro</button> */}
        </div>
      </>
    );
  };

  inserisciEntrata = () => {
    let dataAttuale = new Date();
    this.setState({ ingresso: dataAttuale });
  };

  inserisciUscita = async () => {
    await this.aggiornaUscita();
    this.calcoloDifferenza();
    this.salvaTimbratura();
  };

  aggiornaUscita = () => {
    let dataAttuale = new Date();
    this.setState({ uscita: dataAttuale });
  };

  calcoloDifferenza = () => {
    console.log(this.state.uscita, "uscita");
    const secondiDifferenza = calcoloSecondi(
      this.state.ingresso,
      this.state.uscita
    );
    this.setState({ differenza: secondiDifferenza });
  };

  salvaTimbratura = async () => {
  /*   const options = {
      url: "http://localhost:5000/timbratura",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        ingresso: this.state.ingresso,
        uscita: this.state.uscita,
        differenza: this.state.differenza,
      },
    };

    axios(options)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      }); */

    if (!this.state.id) {
      console.log("Provo ad inviare i dati della timbratura al backend");
      try {
        const response = await axios.post(
          "http://localhost:5000/timbratura",
          {
            ingresso: this.state.ingresso,
            uscita: this.state.uscita,
            differenza: this.state.differenza,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        console.log(response);
      } catch (error) {
        console.error(JSON.stringify(error));
      }
    }
  };
}

export default FormTimbratura;
