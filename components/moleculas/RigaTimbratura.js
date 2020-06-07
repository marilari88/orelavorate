import React from "react";

class RigaTimbratura extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="ingresso">
          Ingresso alle {this.props.timbratura.ingresso}
        </div>
        <div className="uscita">
          Uscita alle {this.props.timbratura.uscita}
        </div>
        <div className="differenza">
          Hai lavorato {this.props.timbratura.differenza} ore
        </div>
      </div>
    );
  }
}
export default RigaTimbratura;
