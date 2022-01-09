import React from "react";
import ContractRules from './../actions/ContractRules'

export class InfoSection extends React.Component {


  render() {

    const {MAX_TOKENS, maxMint, price, openseaLink, inventory} = ContractRules;

    // Info handling:
    return <div className="w-full">
        <div className="pt-6 opacity-80 text-center">

            <div className="text-4xl my-5 font-semibold">Tokenomics</div>

            <div className="mb-12">
              <div>Collection has total <span className="font-semibold">{ MAX_TOKENS }</span> NFTs</div>
              <div>Maximum <span className="font-semibold">{ maxMint }</span> mints allowed per transaction</div>
              <div>Price for minting each <span className="font-mono">Figure</span>: <span className="font-semibold">{ price } Ether</span></div>
            </div>


            <div className="text-4xl m-3 font-semibold">Rarity</div>

            <div className="text-xl m-3">There are three type of <span className="font-mono">Figures</span>:</div>

            <div className="grid grid-cols-3 gap-6 w-full mt-6 mb-10">
            {inventory.drops.map((item) => {
                return <div className={'p-6 rounded-xl bg-opacity-60 ' + item.css} key={item.key}>
                  <div className="text-black pt-3 opacity-80">
                    <div>{item.name}</div>
                    <div className="text-4xl font-semibold py-4">{item.rarity}%</div>
                  </div>
                  <div className="pb-6 px-6">
                    {inventory.svgs[item.key]}
                  </div>
                </div>
            })}
            </div>
          </div>
      </div>

    }
}