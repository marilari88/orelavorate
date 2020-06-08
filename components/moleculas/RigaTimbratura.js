import React from "react";
import { stringaTempo } from "../../utils/differenzaorario";

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
        <div className="uscita">
          Uscita alle{" "}
          {new Date(this.props.timbratura.uscita).toLocaleString()}
        </div>
        <div className="differenza">
          Hai lavorato {stringaTempo(this.props.timbratura.differenza)}
        </div>
      </div>
    );
  }
}
export default RigaTimbratura;
