
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import ModalClass from './modal.js';

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      stepNumber: 1,
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
        round: 1,
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

    this.setState({ 
      playerName: gracz1, 
      player2Name: gracz2,
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
              player1Score: this.state.result.player1Score + 1,
              round: this.state.result.round +1
            }), 
          stepNumber: 1
        })  : this.setState(
          {result: Object.assign({}, 
            this.state.result, { 
              player2Score: this.state.result.player2Score + 1, 
              round: this.state.result.round +1
            }),
          stepNumber: 1 
        });
    } if (props === 'O') {
    return  this.state.xPlayer1 ? 
      this.setState({
        squares: Array(9).fill(null),
        result: Object.assign({}, 
          this.state.result, { 
            player2Score: this.state.result.player2Score + 1,
            round: this.state.result.round +1
          }),
        stepNumber: 1
      })  : this.setState({
        result: Object.assign({}, 
          this.state.result, { 
            player1Score: this.state.result.player1Score + 1,
            round: this.state.result.round +1
          }),
        stepNumber: 1
      });
    } else {
      this.setState({
        squares: Array(9).fill(null),
        result: Object.assign({}, 
          this.state.result, { 
            draw: this.state.result.draw + 1,
            round: this.state.result.round +1
          }),
          stepNumber: 1
      })
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
    
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      stepNumber: this.state.stepNumber + 1,
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const current = this.state.squares;
    let winner = calculateWinner(current);
    
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
          if(this.state.cpu === true && status === "Next player: Cpu"){
            let cpuBestMovie = bestMovie(this.state.squares, this.state.stepNumber,this.state.xIsNext);
            this.setState({
              squares: cpuBestMovie,
              xIsNext: !this.state.xIsNext,
            })
          }
    }

    let header = this.state.mainMenu ? '' : <Header gracz1={this.state.playerName} gracz2={this.state.player2Name} xPlayer1={this.state.xPlayer1}/> 

    let View = this.state.mainMenu || winner ?
      <ModalClass startGame={this.startGame} playHuman={this.playHuman} playCpu={this.playCpu} winner={winner} playerName={this.state.playerName} player2Name={this.state.player2Name} xPlayer1={this.state.xPlayer1} mainMenu={this.state.mainMenu} round={this.state.result.round} cpu={this.state.cpu} /> :
      <Board squares={current} onClick={(i) => this.handleClick(i)} status={status} player2Name={this.state.player2Name} playerName={this.state.playerName} stepNumber={this.state.stepNumber} cpu={this.state.cpu} xIsNext={this.state.xIsNext} xPlayer1={this.state.xPlayer1}/>

    return (
      <div className="game">
          <nav className="navbar navbar-dark bg-primary "><span className="navbar-text">
            {header}
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
  console.log(props)
  let clicked = props.value? 'square clicked' : 'square';
  return (
    <button className={clicked} onClick={props.onClick}>
    <span className={props.value}>{props.value}</span>
    </button>
  )
}

class Header extends React.Component{
  render() {
    const oponent = this.props.gracz2 ? this.props.gracz2 : 'CPU' ;
    let player1 = this.props.xPlayer1? 'X' : 'O';
    let player2 = this.props.xPlayer1? 'O' : 'X';
    return (
       <h3 className="bg-primary text-white text-center" ><span class={player1}>{this.props.gracz1}</span> VS <span class={player2}>{oponent} </span></h3>
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
            <h4 className="round text-center">Round: {this.props.result.round}</h4>
            <span className="badge badge-primary badge-pill"></span>
          </li> 
          <li className="list-group-item d-flex justify-content-between align-items-center ">
            <h5>{player1}</h5>
            <span className="badge badge-primary badge-pill text-center border border-primary result"><h5  className="result-number">{this.props.result.player1Score}</h5></span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center"> 
            <h5>{player2} </h5>
            <span className="badge badge-primary badge-pill border border-primary result"><h5  className="result-number">{this.props.result.player2Score}</h5></span>
          </li> 
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <h5>Draw:</h5>
            <span className="badge badge-primary badge-pill border border-primary result"><h5 className="result-number">{this.props.result.draw}</h5></span>
          </li> 

        </ul>
      </div>
    )}
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state ={
    }
  }
      
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
        <div className="text-center bg-success"><span className="next-player">{this.props.status}</span></div>
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

 function bestMovie(squares, stepNumber, xIsNext) {

  let number;
  if(stepNumber < 3){
      if(squares[4] === null) {
        number = 4;
      } else {
        number = myListMovies(squares);
      }
  } else {
      if(checkMove(squares) !== undefined ){
        number = checkMove(squares);
      } else {
        number = myListMovies(squares);
      }
    }

    const newSquares = squares.slice();    
    newSquares[number] = xIsNext ? 'X' : 'O';
    return newSquares
  }

function checkMove(squares) {
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
      let dangerous = oneIsNull(a, b, c, squares)
      if (dangerous !== false) {
        return dangerous;
      }
  }
}

function myListMovies(squares) {
  const arr = [4, 0, 2, 8, 6, 3, 5, 1, 7]
  for (let i=0; i < arr.length; i++) {
      if(squares[arr[i]] === null) {
       return arr[i]
      } 
  }
}
function oneIsNull(a, b, c, arr) {
  if (arr[a] === null && arr[b] === arr[c] && arr[b] !== null){
    return a;
  } if (arr[b] === null && arr[a] === arr[c] && arr[c] !== null){
    return b;
  } if (arr[c] === null && arr[b] === arr[a] && arr[a] !== null){
    return c;
  } else {
    return false;
  }
}
// =======================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
