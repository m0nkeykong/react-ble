import React, { Component } from 'react';
import './App.css';
import './normalize.css';
import BluetoothTerminal from './BLETerminal';

// UI elements.
// const deviceNameLabel = document.getElementById('device-name');
// const connectButton = document.getElementById('connect');
// const disconnectButton = document.getElementById('disconnect');
// const terminalContainer = document.getElementById('terminal');
// const sendForm = document.getElementById('send-form');
// const inputField = document.getElementById('input');

class App extends Component {
  constructor(props) {
    super(props);
    
    this.terminal = new BluetoothTerminal();
    
    // functions
    this.receive = this.receive.bind(this);
    // this.logToTerminal = this.logToTerminal.bind(this);
    this._log = this._log.bind(this);
    // this.scrollElement = this.scrollElement.bind(this);
    this.send = this.send.bind(this);
    this.connectButton = this.connectButton.bind(this);
    this.disconnectButton = this.disconnectButton.bind(this);
    this.submited = this.submited.bind(this);
    // this.scrolled = this.scrolled.bind(this);
    this.sendData = this.sendData.bind(this);

    // Helpers.
    this.defaultDeviceName = 'Terminal';
    // this.terminalAutoScrollingLimit = 0;
    // this.isTerminalAutoScrolling = true;

    
    // Switch terminal auto scrolling if it scrolls out of bottom.
  }

  // scrolled = () => {
  //   const scrollTopOffset = this.refs.terminalContainer.scrollHeight -
  //       this.refs.terminalContainer.offsetHeight - this.terminalAutoScrollingLimit;

  //     this.isTerminalAutoScrolling = (scrollTopOffset < this.refs.terminalContainer.scrollTop);
  // };
  
  sendData = () => {
    console.log("going to submited");
    this.submited();
  }


  submited = () => {
    console.log(this.refs.inputField.value);
    this.send(this.refs.inputField.value);
    this.refs.inputField.value = '';
    this.refs.inputField.focus();
  }

  // scrollElement = (element) => {
  //   const scrollTop = element.scrollHeight - element.offsetHeight;

  //   if (scrollTop > 0) {
  //     element.scrollTop = scrollTop;
  //   }
  // };

  // logToTerminal = (message, type = '') => {
  //   this.refs.terminalContainer.insertAdjacentHTML('beforeend', `<div${type && ` class="${type}"`}>${message}</div>`);

  //   if (this.isTerminalAutoScrolling) {
  //     this.scrollElement(this.refs.terminalContainer);
  //   }
  // };

// Obtain configured instance.


  // Override `receive` method to log incoming data to the terminal
    receive = () => {
      this.terminal.receive = (data) => {
        //this.logToTerminal(data, 'in');
        this.terminal._log(data);
      };
    }

  // Override default log method to output messages to the terminal and console.
    _log = () => {
      this.terminal._log = (...messages) => {
        // We can't use `super._log()` here.
        messages.forEach((message) => {
          //this.logToTerminal(message);
          console.log(message); // eslint-disable-line no-console
        });
      }
    }

  // Implement own send function to log outcoming data to the terminal.
    send = (data) => {
      this.terminal.send(data).
        then(() => this.terminal._log(data)).
        catch((error) => this.terminal._log(error));
    };

  // Bind event listeners to the UI elements.
    connectButton = () => {
      this.terminal.connect().
        then(() => {
          //this.refs.deviceNameLabel.textContent = this.terminal.getDeviceName() ? this.terminal.getDeviceName() : this.defaultDeviceName;
        });
    };

    disconnectButton = () => {
      this.terminal.disconnect();
      // this.refs.deviceNameLabel.textContent = this.defaultDeviceName;
    };

    componentDidMount() {
      // this.refs.sendForm.addEventListener('submit', this.submited);
      // this.refs.terminalContainer.addEventListener('scroll', this.scrolled);
      
      // this.terminalAutoScrollingLimit = this.refs.terminalContainer.offsetHeight / 2;
    }


  
  
  render() {
    return (
      <div className="app">
        <div className="toolbar">
          <div id="device-name" className="name" ref="deviceNameLabel">Terminal</div>
          <div className="buttons">
            <button id="connect" onClick={this.connectButton} type="button" aria-label="Connect" ref="device-name">
              <i className="material-icons">bluetooth_connected</i>
            </button>
            <button id="disconnect" onClick={this.disconnectButton} type="button" aria-label="Disconnect">
              <i className="material-icons">bluetooth_disabled</i>
            </button>
          </div>
        </div>
        <div id="terminal" ref="terminalContainer" className="terminal"></div>
          <input id="input" ref="inputField" type="text" aria-label="Input" autoComplete="off" placeholder="Type something to send..." />
          <button onClick={this.sendData} aria-label="Send">
            <i className="material-icons">send</i>
          </button>
      </div>
    );
  }
}

export default App;
