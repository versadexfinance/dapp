'use client'

import { Stack } from '@/components/box'
import { useEffect, useRef } from 'react'
import TradingViewWidget, { Themes } from 'react-tradingview-widget'

const SwapGraph = () => {
  const container = useRef<any>()

  useEffect(() => {
    const script = document.createElement('script')
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = `
        {
          "autosize": true,
          "symbol": "BINANCE:ETHUSDT",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "enable_publishing": false,
          "allow_symbol_change": true,
          "support_host": "https://www.tradingview.com/"
        }`
    if (!container.current.querySelector('script')) {
      container.current.appendChild(script)
    }
  }, [])

  return (
    <Stack
      ref={container}
      css={{
        position: 'relative',
        height: '400px',
        minHeight: '220px',
        '@tablet': {
          height: 'auto',
          maxHeight: '600px',
          flex: 7,
          aspectRatio: '100% / 65%',
          position: 'relative',
        },
      }}
    ></Stack>
  )
}

export default SwapGraph
