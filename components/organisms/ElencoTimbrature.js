import React from "react";
import { RigaTimbratura } from "../moleculas/RigaTimbratura";

class ElencoTimbrature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elencoTimbrature: [],
    };
  }

  componentDidMount() {
    console.log("component did mount");
    this.caricaElencoTimbrature();
  }

  caricaElencoTimbrature = async () => {
    console.log("Procedo con il caricamento delle timbrature");
    const timbrature = await fetch("http://localhost:5000/timbratura");
    this.setState({
      elencoTimbrature: () => timbrature.json(),
    });
  };

  mostraElencoTimbrature = () => {
    let elencoTimbrature = this.state.elencoTimbrature;
    console.log("elenco delle timbrature:", elencoTimbrature);
    return Array.from(elencoTimbrature).map((timbratura) => {
      console.log(timbratura, timbratura.uscita);
      return <RigaTimbratura id={timbratura._id} />;
    });
  };

  render() {
    return (
      <>
        {this.mostraElencoTimbrature()}
      </>
    );
  }
}

export default ElencoTimbrature;
