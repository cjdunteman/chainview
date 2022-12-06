import { ConnectKitButton } from 'connectkit'
import { useState, useEffect, Fragment } from 'react'
import { useAccount } from 'wagmi'

import { Account } from '../components'
import getTokenBalances from '../utils/getTokenBalances'

type Token = {
  contractAddress: string,
  tokenBalance: number,
  name: string,
  symbol: string,
}

function Page() {  
  const [tokenBalances, setTokenBalances] = useState<Token[]>([]);

  const { address, isConnected } = useAccount()

  useEffect(() => {
    getTokenBalances(address, setTokenBalances);
  }, []);
  console.log(tokenBalances)

  return (
    <>
      <h1>ChainView</h1>
      {/* <p>{tokenBalances[0].name}</p> */}
      <ConnectKitButton />
      {isConnected && <Account />}
      <div className="container mx-auto max-w-2xl">
      {tokenBalances.map((token, index) => {
        return (
        <Fragment key={token.symbol}>
          <p>{token.tokenBalance} {token.name}</p>
        </Fragment>
        )
      })}
      </div>
    </>
  )
}

export default Page
