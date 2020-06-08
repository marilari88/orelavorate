import React from "react";
import RigaTimbratura from "../moleculas/RigaTimbratura";
import axios from "axios";

class ElencoTimbrature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elencoTimbrature: [],
    };
  }

  componentDidMount() {
    this.caricaElencoTimbrature();
  }

  caricaElencoTimbrature = async () => {
    await axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/timbratura")
      .then((timbrature) => timbrature.data)
      .then((timbrature) => {
        this.setState({ elencoTimbrature: timbrature });
      });
  };

  mostraElencoTimbrature = () => {
    return Array.from(this.state.elencoTimbrature).map((timbratura) => {
      return <RigaTimbratura key={timbratura.id} timbratura={timbratura} />;
    });
  };

  render() {
    return <>{this.mostraElencoTimbrature()}</>;
  }
}

export default ElencoTimbrature;
