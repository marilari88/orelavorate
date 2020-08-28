import React from "react";
import { stringaTempo, calcoloSecondi } from "../../utils/differenzaorario";
import TimbraturaService from "../../services/TimbraturaService";
import PropTypes from "prop-types";
import Link from "next/link";

class FormTimbratura extends React.Component {
  idIntervallo = "";

  constructor(props) {
    super(props);
    this.state = {
      id: "",
      ingresso: "",
      uscita: "",
      differenza: "",
    };
  }

  componentDidMount() {
    if (this.props.idTimbratura)
      TimbraturaService.get(this.props.idTimbratura).then((response) => {
        this.setState(
          {
            id: response.data._id.$oid,
            ingresso: response.data.ingresso
              ? new Date(response.data.ingresso)
              : "",
            uscita: response.data.uscita,
            differenza: response.data.differenza,
          },
          () => {
            if (this.state.ingresso && !this.state.uscita)
              this.mostraTimerDifferenza();
          }
        );
      });
  }

  componentWillUnmount() {
    clearInterval(this.idIntervallo);
  }

  render() {
    return (
      <>
        {!this.state.ingresso
          ? this.mostraIngressoDaInserire()
          : !this.state.uscita
          ? this.mostraUscitaDaInserire()
          : this.mostraDatiCompleti()}
        <Link href="/">
          <a>Ritorna all&apos;elenco delle timbrature</a>
        </Link>
      </>
    );
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
        </div>
      </>
    );
  };

  inserisciEntrata = () => {
    let dataAttuale = new Date();
    this.setState({ ingresso: dataAttuale }, () => {
      this.salvaTimbratura();
    });
    this.mostraTimerDifferenza();
  };

  mostraTimerDifferenza = () => {
    this.idIntervallo = setInterval(() => {
      this.calcoloDifferenza(this.state.ingresso, new Date());
    }, 1000);
  };

  inserisciUscita = () => {
    let dataAttuale = new Date();
    this.setState({ uscita: dataAttuale }, () => {
      this.salvaTimbratura();
    });
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
      TimbraturaService.create({
        ingresso: this.state.ingresso,
        uscita: this.state.uscita,
        differenza: this.state.differenza,
      })
        .then((response) => {
          const idTimbratura = response.data.id.$oid;
          this.setState({ id: idTimbratura });
        })
        .catch((error) => console.error(JSON.stringify(error)));
    } else {
      TimbraturaService.update(this.state.id, {
        ingresso: this.state.ingresso,
        uscita: this.state.uscita,
        differenza: this.state.differenza,
      })
        .then((response) => console.log(response.status))
        .catch((error) => console.error(JSON.stringify(error)));
    }
  };
}

FormTimbratura.propTypes = {
  idTimbratura: PropTypes.string,
};

FormTimbratura.defaultProps = {
  idTimbratura: "",
};

export default FormTimbratura;
