import React, { useState, useContext } from 'react';
import { MainAppContext } from "../../MainAppContext";
import './index.scss';
import { setNotification } from '../Notifications';
import { Refill } from '../RefillFunctions';

function Coins({ board, sendBoard }) {
    let { stateMainApp } = useContext(MainAppContext);
    let { coins, beverages } = stateMainApp;
    const [showTechServices, setShowTechServices] = useState(false)

    const onInsertCoins = (item) => {
        if (board === 0) {
            sendBoard(item.value)
        } else if (board > 9) {
            setNotification('Attention!', 'Maximum coins accepted are 10', 'warning')
        } else {
            sendBoard(board + item.value)
        }
    }

    return (
        <div>
            <h5 style={{ marginBottom: '0px' }}>Please, enter coins and select a beverage to buy it.</h5>
            {coins && coins.map((item, index) => {
                return (
                    <div className="coin silver"
                        key={index} value={item.value}
                        onClick={() => onInsertCoins(item)}><p>{item.value}</p></div>
                )
            })}
            <div>
                <button className="btn-refund" onClick={() => sendBoard(0)}>
                    <span>Refund</span>
                </button>
                <button className="btn-refund" onClick={() => setShowTechServices(!showTechServices)}>
                    <span>Tech service</span>
                </button>

                {showTechServices &&
                    <div>
                        <button className="btn-refund btn-tech" onClick={() => Refill(coins, 'coins')}>
                            <span>Refill coins</span>
                        </button>

                        <button className="btn-refund btn-tech" onClick={() => Refill(beverages, 'beverages')}>
                            <span>Refill beverages</span>
                        </button>
                    </div>

                }
            </div>

        </div>
    )
}
export default Coins;