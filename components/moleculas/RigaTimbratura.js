import React from "react";
import { stringaTempo } from "../../utils/differenzaorario";
import PropTypes from "prop-types";
import Link from "next/link";

class RigaTimbratura extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="ingresso">
          Ingresso alle{" "}
          {new Date(this.props.timbratura.ingresso).toLocaleString()}
        </div>
        {this.props.timbratura.uscita && (
          <>
            <div className="uscita">
              Uscita alle{" "}
              {new Date(this.props.timbratura.uscita).toLocaleString()}
            </div>
            <div className="differenza">
              Hai lavorato {stringaTempo(this.props.timbratura.differenza)}
            </div>
          </>
        )}

        <Link
          href="/timbratura/[idtimbratura]"
          as={`/timbratura/${this.props.timbratura.id}`}
        >
          <button>Seleziona</button>
        </Link>

        <button
          className="cancellaTimbratura"
          onClick={() => this.props.cancellaTimbratura()}
        >
          Cancella
        </button>
      </div>
    );
  }
}
RigaTimbratura.propTypes = {
  timbratura: PropTypes.object.isRequired,
  cancellaTimbratura: PropTypes.func,
};

export default RigaTimbratura;
