import React, { useContext } from 'react';
import { MainAppContext } from "../../MainAppContext";
import { setNotification, setCustomNotification } from '../Notifications';
import { Refill } from '../RefillFunctions/index'
import './index.scss';

function VendingMachine({ board, sendBoard }) {
  let { stateMainApp, dispatchMainApp } = useContext(MainAppContext);
  let { beverages, coins } = stateMainApp;

  const onSelectItem = (item, index) => {
    if (board >= item.price && item.stock > 0) {
      let tempObj = Object.assign([], beverages)
      tempObj.forEach((el) => {
        if (el.id === item.id) {
          el.stock = item.stock - 1
        }
      })

      if (board > item.price) {
        returnChange(item)
      } else {
        setCustomNotification('Thank you!', `Here you have your ${item.name}`, "success");
      }
      sendBoard(0);
      dispatchMainApp({ type: "SET_BEVERAGES", payload: tempObj });

    } else if (item.stock === 0) {
      setNotification('Out of stock!', 'Please, select other option', 'warning');
      let obj = Refill(beverages, 'beverages', item, index)
      dispatchMainApp({ type: "SET_BEVERAGES", payload: obj });

    } else if (board < item.price) {
      setNotification('Opps!', 'insufficient coins', 'warning');

    } else {
      setNotification('Error!', 'unexpected error ocurred', 'danger');
      sendBoard(0);
    }
  }

  const returnChange = (item) => {
    let amount = (board - item.price).toFixed(2);
    let result = [];
    let coinsTemp = Object.assign([], coins)

    for (let i = 0; i < coinsTemp.length; i++) {
      while (amount >= coinsTemp[i].value && coinsTemp[i].stock > 0) {
        result.push(coinsTemp[i].name);
        coinsTemp[i].stock -= 1
        amount = amount - coinsTemp[i].value;
      }
    }

    dispatchMainApp({ type: "SET_COINS", payload: coinsTemp });
    if (result.length > 0) {
      setCustomNotification('Thank you!', `Here you have your ${item.name}. Change: ${result.join(' , ')}`);
    } else {
      setCustomNotification('Thank you!', `Here you have your ${item.name}. Change: ERROR! (contact with tech service)`);
      let temp = Refill(coins, 'coins');
      dispatchMainApp({ type: "SET_COINS", payload: temp });
    }
  };

  return (
    <div className="machine">
      <div className="board">
        <p>{board.toFixed(2)}</p>
      </div>
      <div className="beverages">
        {beverages && beverages.map((item, index) => {
          return (
            <div key={item.id} className="item">
              <button className="btn-item"
                disabled={board === 0}
                onClick={() => onSelectItem(item, index)}>{item.name}</button>
              <div className="price-item">Price: {item.price.toFixed(2)}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default VendingMachine;