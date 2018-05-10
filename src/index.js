
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import ModalClass from './modal.js';

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      mainMenu: true,
      playerName: '',
      player2Name: '',
      cpu: false,
      xPlayer1: true,
      squares: Array(9).fill(null),
      result: {    
        player1Score: 0,
        player2Score: 0,
        draw: 0,
      }
,
    };
    this.startGame = this.startGame.bind(this);
    this.playCpu = this.playCpu.bind(this);
    this.playHuman = this.playHuman.bind(this);
    this.nextRound = this.nextRound.bind(this);
  }

  startGame(props) {
   if(props){
    this.nextRound(props)
    return;
   } else {
    let gracz1 = document.getElementById('player1').value;
    let gracz2 = document.getElementById('player2').value;

    (gracz2.length > 0) ? this.setState({ player2Name: gracz2 }) : this.setState({ player2Name: false})
    this.setState({ 
      playerName: gracz1, 
      mainMenu: false, 
      squares: Array(9).fill(null) 
    });
  }}

  nextRound(props) {
    if (props === 'X') {
    return  this.state.xPlayer1 ? 
      this.setState({
          squares: Array(9).fill(null),
          result: Object.assign({}, 
            this.state.result, { 
              player1Score: this.state.result.player1Score + 1 
            })})  : this.setState(
          {result: Object.assign({}, 
            this.state.result, { 
              player2Score: this.state.result.player2Score + 1, 
            })});
    } if (props === 'O') {
    return  this.state.xPlayer1 ? 
      this.setState({
        squares: Array(9).fill(null),
        result: Object.assign({}, 
          this.state.result, { 
            player2Score: this.state.result.player2Score + 1 
          })})  : this.setState({
        result: Object.assign({}, 
          this.state.result, { 
            player1Score: this.state.result.player1Score + 1,
          })});
    } else {
      console.log('draw');
    } 

      this.setState({ squares: Array(9).fill(null) });
  }

  playCpu() {
    let hide = document.getElementById('p1');
    hide.classList.remove('hide');
    let hideButton = document.getElementById('hideButton');
    hideButton.classList.remove('hide');

    var toHide = document.getElementsByClassName('toHide');
    for(let i = 0; i < toHide.length; i++){
      toHide[i].classList.add('hide');
    }
    this.setState({ cpu: true });
  }
  playHuman() {
    let hide = document.getElementsByClassName('hide');
    for (var index of hide) {
      index.classList.remove('hide');
    }
    for (var index2 of hide) {
      index2.classList.remove('hide');
    }
    var toHide = document.getElementsByClassName('toHide');
    for(let i = 0; i < toHide.length; i++){
      toHide[i].classList.add('hide');
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length -1];
    const squares = this.state.squares.slice();
    
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = this.state.squares;
    let winner = calculateWinner(current);
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
    });
    
    let xPlayer = this.state.xPlayer1 ? this.state.playerName : this.state.player2Name 
    let oPlayer;
    if (this.state.xPlayer1 === false ){
      oPlayer = this.state.player2Name;
    } else {
      oPlayer = this.state.cpu ? 'Cpu'  : this.state.player2Name
    }
    
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? xPlayer : oPlayer);
    }

    let View = this.state.mainMenu || winner ?
      <ModalClass startGame={this.startGame} playHuman={this.playHuman} playCpu={this.playCpu} winner={winner} playerName={this.state.playerName} player2Name={this.state.player2Name} xPlayer1={this.state.xPlayer1} mainMenu={this.state.mainMenu}/> :
      <Board squares={current} onClick={(i) => this.handleClick(i)} status={status} player2Name={this.state.player2Name} playerName={this.state.playerName}/>

    let History = this.state.mainMenu ? '' : <div className="history"><ul>{moves}</ul></div>

    return (
      <div className="game">
          <nav className="navbar navbar-dark bg-primary"><span className="navbar-text">
            <Header gracz1={this.state.playerName}/>
            </span>
            </nav> 
    
          <div className="row">    
            <div className="col-sm-8">
              <div className="tic-tac-field d-flex justify-content-center">
                {View}
              </div>
            </div>
              
          <div className="col-sm-4"><Statistic result={this.state.result} player1={this.state.playerName} player2Name={this.state.player2Name} cpu={this.state.cpu}/></div>
        </div>

      </div>
    );

}}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Header extends React.Component{
  render() {
    return (
      <div>Nazwa - {this.props.gracz1}</div>
    )}
}

class Statistic extends React.Component{
  render() {
    let player2 = this.props.player2Name ? this.props.player2Name + ' wins:' : 'cpu wins:'
    let player1 = this.props.player1 + " wins:"

    return (
      <div className="statistic">
        <ul className="list-group">
          <li className="list-group-item d-flex  justify-content-between align-items-center active">
            Statistics:
            <span className="badge badge-primary badge-pill"></span>
          </li> 
          <li className="list-group-item d-flex justify-content-between align-items-center ">
            {player1}
            <span className="badge badge-primary badge-pill">{this.props.result.player1Score}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center"> 
            {player2}
            <span className="badge badge-primary badge-pill">{this.props.result.player2Score}</span>
          </li> 
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Draw:
            <span className="badge badge-primary badge-pill">{this.props.result.draw}</span>
          </li> 

        </ul>
      </div>
    )}
}

class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      
      <div className="game-field">
        <div className="game-info">
        <div>{this.props.status}</div>
        </div>

        <div className="game-board">
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          </div>
          <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          </div>
        </div>
      </div>
      
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i= 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return squares.some((i) => {return i === null}) ?  null :  'draw';
  }

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
