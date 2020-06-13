import React from "react";
import { stringaTempo, calcoloSecondi } from "../../utils/differenzaorario";
import axios from "axios";

class FormTimbratura extends React.Component {
  idIntervallo="";
  constructor(props) {
    super(props);
    this.state = { id: "", ingresso: "", uscita: "", differenza: 0 };
  }

  componentDidMount() {
    this.setState((props) => ({
      id: props.id,
      ingresso: props.ingresso,
      uscita: props.uscita,
      differenza: props.differenza,
    }));
  }

  componetWillUnmount() {
    clearInterval(this.idIntervallo);
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
          <div>Stai lavorando da {stringaTempo(this.state.differenza)}</div>
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
    this.idIntervallo = setInterval(() => {
      this.calcoloDifferenza(this.state.ingresso, new Date());
    }, 1000);
  };

  inserisciUscita = async () => {
    await this.aggiornaUscita();
    this.calcoloDifferenza();
    this.salvaTimbratura();
  };

  aggiornaUscita = () => {
    let dataAttuale = new Date();
    this.setState({ uscita: dataAttuale });
    clearInterval(this.idIntervallo);
  };

  calcoloDifferenza = (
    ingresso = this.state.ingresso,
    uscita = this.state.uscita
  ) => {
    const secondiDifferenza = calcoloSecondi(ingresso, uscita);
    this.setState({ differenza: secondiDifferenza });
  };

  salvaTimbratura = async () => {
    if (!this.state.id) {
      try {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_API_URL + "/timbratura",
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
      } catch (error) {
        console.error(JSON.stringify(error));
      }
    }
  };
}

export default FormTimbratura;
