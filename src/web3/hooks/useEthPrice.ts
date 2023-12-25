// useEthPrice.js
import { useEffect, useState } from 'react'

interface EthPriceResult {
  ethbtc: string
  ethbtc_timestamp: string
  ethusd: string
  ethusd_timestamp: string
}

const useEthPrice = () => {
  const [ethPrice, setEthPrice] = useState<EthPriceResult | null>(null)

  const fetchEthPrice = async () => {
    try {
      const apiKey = '4RP9CF2MMIWYXN49FX5UW4A57KM76D2VIR'
      const response = await fetch(
        `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${apiKey}`,
      )

      if (!response.ok) {
        throw new Error('Failed to fetch ETH price')
      }

      const data = await response.json()
      if (data.status === '1') {
        setEthPrice(data.result)
      } else {
        throw new Error(data.message || 'Failed to fetch ETH price')
      }
    } catch (error) {
      console.error('Error fetching ETH price:', error)
    }
  }

  useEffect(() => {
    fetchEthPrice()

    const intervalId = setInterval(() => {
      fetchEthPrice()
    }, 15000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return ethPrice
}

export default useEthPrice
