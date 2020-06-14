import React from "react";
import { stringaTempo } from "../../utils/differenzaorario";
import PropTypes from "prop-types";

class RigaTimbratura extends React.Component {
  constructor(props) {
    super(props);
  }

  cancellaTimbratura() {
  }

  render() {
    return (
      <div>
        <div className="ingresso">
          Ingresso alle{" "}
          {new Date(this.props.timbratura.ingresso).toLocaleString()}
        </div>
        <div className="uscita">
          Uscita alle {new Date(this.props.timbratura.uscita).toLocaleString()}
        </div>
        <div className="differenza">
          Hai lavorato {stringaTempo(this.props.timbratura.differenza)}
        </div>
        <button
          className="cancellaTimbratura"
          onClick={this.cancellaTimbratura}
        >
          Cancella
        </button>
      </div>
    );
  }
}
RigaTimbratura.propTypes = {
  timbratura: PropTypes.object.isRequired,
};

export default RigaTimbratura;
