import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
    };

  }

  showPlay() {
    let hide = document.getElementsByClassName('toHide');
    console.log(hide);


  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Tic-Tac-Toe</ModalHeader>
          <ModalBody>
          <p className="toHide">Please choose your opponent:</p>
          <label className="hide" id="p1">Podaj swoje imię <input id="player1" type="tekst"/></label>
          <label className="hide">Podaj swoje imię <input id="player2" type="tekst"/></label>
          
          </ModalBody>
          <ModalFooter>
            <Button color="primary toHide" onClick={this.props.playCpu} >CPU</Button>
            <Button color="secondary toHide" onClick={this.props.playHuman}>Human</Button>
            <Button color="primary hide" id="hideButton" onClick={this.props.startGame}>Play</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalClass;