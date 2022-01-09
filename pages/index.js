import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'

import React from 'react'
import { Navbar} from './components/Navbar'
import { MetamaskConnect} from './components/MetamaskConnect'
import { WalletDetails} from './components/WalletDetails'
import { MintSection } from './sections/MintSection'
import { InfoSection } from './sections/InfoSection'
import { Footer } from './sections/Footer'
import web3Actions from './actions/web3Actions'

export default class Home extends React.Component {

   constructor(props) {
    super(props);
    this.state = { metals: [], tokens: null, account : null, minted : 0 , web3_error : null, chainId : null };
  }

  componentDidMount() {
    // initialize web3
    web3Actions.initWeb3((state) => { this.setState(state)});
  }

  isEmptyAddress(address) {
    return /^0x0+$/.test(address);
  }

  connect() {
    web3Actions.connect();
  }

  mint(count) {
    web3Actions.mint(count)
  }

  render() {
    const { metals, tokens, account, minted, web3_error, chainId } = this.state;
    return (<>
        <Navbar connect={this.connect} tokens={tokens} account={account} chainId={chainId} />
        <div className="max-w-5xl mx-auto min-h-screen flex items-center justify-center -mt-20">
          <div className="bg-white p-20 rounded-xl bg-opacity-20 relative">
            <MintSection connect={this.connect} mint={this.mint} minted={minted} account={account} />
            <div className="max-w-sm mx-auto text-center text-sm mt-5">
                { web3_error ? '😥 ' + web3_error.message : null}
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto min-h-screen flex items-center justify-center mt-10 pb-40">
          <InfoSection></InfoSection>
        </div>
        <Footer />
      </>
    )
  }
}