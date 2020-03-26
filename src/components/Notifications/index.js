import React from 'react';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import drinkImg from '../../images/drink.png';

export function setNotification (title, message, type) {
    return store.addNotification({
      title: title,
      message: message,
      type: type,
      container: "center",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 5000
      }
    });
  }

  export function setCustomNotification (title, message) {
    return store.addNotification({
      content: content(title, message),
      container: "center",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      width: 100,
      dismiss: {
        duration: 5000
      }
    });
  } 
  
  const content = (title, message) => {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        backgroundColor: '#F7F7F7',
        borderRadius: 5,
        width: '100px'
      }}>
        <h4>{title}</h4>
        <img src={drinkImg} alt='beverage' style={{width: '100px'}} />
        <p>{message}</p>
      </div>
    )
  }