import React, { Component } from 'react'
import EthereanFactory from '../build/contracts/EthereanFactory.json'
import getWeb3 from './utils/getWeb3'
import Header from './Header'
import Main from './Main'
//import client from './MongoHelper'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    console.log("componentWillMount");

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(function(err){
      console.log(err+' - Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

     console.log("instantiateContract");

    const contract = require('truffle-contract')
    const ethereanfactory = contract(EthereanFactory)
    ethereanfactory.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on EthereanFactory.
    var ethereanFactoryInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      if (error) {
          console.log(error);
      }

      ethereanfactory.deployed().then((instance) => {
        console.log("ethereanfactory smart contract deployed")
        ethereanFactoryInstance = instance

        alert("ethereanfactory smart contract deployed")

        //do some sort of test here?

      }).then(()=> {
        //call something afterwards
      })
    })
  }

  render(){
    return(
      <div>
        <Header />
        <br />
        <Main />
      </div>
    );
  }
}

export default App



