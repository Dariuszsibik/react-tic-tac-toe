import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class Menu extends React.Component{
  render() {
    let view = this.props.mainMenu? <ModalClass playCpu={this.props.playCpu} playHuman={this.props.playHuman} startGame={this.props.startGame}/> : <NextRound startGame={this.props.startGame} winner={this.props.winner} round={this.props.round} xplayer1={this.props.xplayer1} playerName={this.props.playerName} player2Name={this.props.player2Name} cpu={this.props.cpu}/>

    return (
      <div>
      {view}
      </div>
    );}
}

class ModalClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
    };
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Tic Tac Toe</ModalHeader>
          <ModalBody>
          <p className="toHide">Please choose your opponent:</p>
          <label className="hide" id="p1">Podaj swoje imię <input id="player1" type="tekst"/></label>
          <label className="hide">Podaj swoje imię <input id="player2" type="tekst"/></label>
          </ModalBody>
          <ModalFooter>
            <Button color="primary toHide" onClick={this.props.playCpu} >CPU</Button>
            <Button color="secondary toHide" onClick={this.props.playHuman}>Human</Button>
            <Button color="primary hide" id="hideButton" onClick={() => this.props.startGame()}>Play</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  } 
}

class NextRound extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
    };
  }

  render() {
    let player2 = (this.props.cpu? ('Cpu') : (this.props.player2Name));
    let winnerName = () => {
        if(this.props.winner === 'X'){
          return 'Winner: ' + (this.props.xplayer1? player2 : this.props.playerName);
        } if (this.props.winner === 'O') {
          return 'Winner: ' +(this.props.xplayer1? this.props.playerName : player2);  
        } else {
          return "draw";
        }
  }
  let whoWin = winnerName();
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Round: {this.props.round}</ModalHeader>
          <ModalBody>
          <p className="toHide">{whoWin}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.props.startGame(this.props.winner)}>Next round</Button>
          </ModalFooter>
        </Modal>
      </div>
    );}
}

export default Menu;