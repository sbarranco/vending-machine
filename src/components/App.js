import React, { useState } from 'react';
import './App.css';
import ReactNotification from 'react-notifications-component';
import Coins from './Coins';
import VendingMachine from './VendingMachine'

function App() {
  const [board, setBoard] = useState(0)

  const props = {
    board: board,
    sendBoard: (coin) => setBoard(coin)
  }

  return (
    <div className="App">
      <ReactNotification />
      <header>
        <h1 className="title">Vending machine</h1>
      </header>
      <Coins {...props} />
      <VendingMachine {...props} />
    </div>
  );
}

export default App;
