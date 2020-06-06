export default function Timbratura(){
    return (
        <div className="formInserimentoTimbratura">
            <div className="titolo">Inserimento Timbratura</div>
            <div className="rigaInserimento">
                <label htmlFor="orarioIngresso">Ingresso alle </label>
                <input type="datetime" name="orarioingresso" id="orarioIngresso"/>
            </div>
            <div className="rigaInserimento">
                <label htmlFor="orarioUscita">Uscita alle </label>
                <input type="datetime" name="orariouscita" id="orarioUscita"/>
            </div>
            <button>Conferma Inserimento</button>
        </div>
    )
}