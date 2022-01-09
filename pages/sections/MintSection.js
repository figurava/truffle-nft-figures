import React from "react";
import { MetamaskConnect } from './../components/MetamaskConnect'
import { Soldout } from './../components/Soldout'
import ContractRules from './../actions/ContractRules'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export class MintSection extends React.Component {

  constructor(props) {
    super(props);
    this.state = { mintCount: 2 };
  }

  handleChange(val) {
    this.setState({mintCount : val})
  }

  render() {
    const {connect, account, mint, minted} = this.props;
    const {mintCount} = this.state;
    const {MAX_TOKENS, maxMint, price, openseaLink} = ContractRules;

    // Soldout handling
    if(MAX_TOKENS <= minted) return <div>
        <Soldout url={openseaLink}></Soldout>
        <div className="pt-6 font-semibold opacity-80 text-center">
            <span className="text-indigo-500">{ minted }</span> of { MAX_TOKENS} Minted
          </div>
      </div>

    // Connect and Mint handling
    return (
        <>
          <div className="text-2xl font-bold mb-5 text-center">MINT PRICE IS <div className="bg-white p-3 ml-3 inline-block shadow rounded-lg">{ price } ETH</div></div>
          <div className="text-xl my-5 text-center">Mint a <span className="font-mono">Figure</span> using your Ethereum Wallet</div>

          <div className="flex items-center flex-col mt-6 text-center">
            { !account ?
              <MetamaskConnect connect={connect} info={true} ></MetamaskConnect> :
              <div className="w-80">
                <div className="flex mb-7">
                  <Slider
                    onChange={(val)=>{ this.handleChange(val) }}
                    value={mintCount} min={1} max={maxMint}
                    maximumTrackStyle={{ backgroundColor: '#eee', height: 10 }}
                    minimumTrackStyle={{ backgroundColor: '#a855f7', height: 10 }}
                    handleStyle={{ borderColor: 'white',backgroundColor: '#a855f7',height: 28,width: 28,marginTop: -9}} />
                </div>
                <button onClick={(e)=>{ mint(mintCount) }} className="py-4 px-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-purple-600 text-white font-semibold rounded-full shadow-md">Mint { mintCount } <span className="font-mono">Figures</span> Now</button>
                <div className="text-xs mt-10">You can only mint 1 to {maxMint} Figures per transaction</div>
              </div>
            }
          </div>
          <div className="pt-6 font-semibold opacity-80 text-center">
            <span className="text-indigo-500">{ minted }</span> of { MAX_TOKENS} Minted
          </div>
        </>
        )
    }
}