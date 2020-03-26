import React, {useReducer} from "react";

export const initValueMainApp = {
    beverages : [
        { id: 1, name: 'ColaWay', price: 1.50, stock: 5 },
        { id: 2, name: 'LemonPi', price: 1.20, stock: 5 },
        { id: 3, name: 'BlueBull', price: 1.00, stock: 5 },
        { id: 4, name: 'ChipsChi', price: 0.80, stock: 5 },
        { id: 5, name: 'ChocoBo', price: 0.65, stock: 5 }
      ],
    
      coins : [
        { name: '2 coins', value: 2, stock: 5 },
        { name: '1 coin', value: 1, stock: 5 },
        { name: '50 cents', value: 0.50, stock: 5 },
        { name: '20 cents', value: 0.20, stock: 5 },
      ]
};

const MainAppContext = React.createContext(initValueMainApp);

let reducer = (state, action) => {
    switch (action.type) {
        case "RESET":
            return initValueMainApp;
        case "SET_BEVERAGES":
            return {...state, ...{beverages: action.payload}};
        case "SET_COINS":
            return {...state, ...{coins: action.payload}};
        default:
            return {...state};
    }
};

function MainAppProvider(props) {
    let [stateMainApp, dispatchMainApp] = useReducer(reducer, initValueMainApp);
    let value = {stateMainApp, dispatchMainApp};
    return (
        <MainAppContext.Provider value={value}>{props.children}</MainAppContext.Provider>
    );
}

let MainAppConsumer = MainAppContext.Consumer;

export {MainAppContext, MainAppProvider, MainAppConsumer};