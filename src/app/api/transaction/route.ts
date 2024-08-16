import { MongoClient } from 'mongodb'

import { NextRequest, NextResponse } from 'next/server'
import { ethers } from 'ethers'
import path from 'path'
import { Pool_V2 } from '@/web3/types'

let client
let db

type Transaction = {
  type: 'swap' | 'add_liquidity' | 'remove_liquidity' | 'approve'
  data: {
    in?: {
      tokenAddress: string
      amount: string
    }
    out?: {
      tokenAddress: string
      amount: string
    }
    approve?: {
      tokenAddress: string
      amount: string
    }
  }
  amount?: string
  fromAddress: string
  txHash: string
  status: 'pending' | 'completed' | 'failed'
  initiatedAt: Date
}

async function connectToDatabase() {
  if (!client) {
    const caCertificate = process.env.CA_CERT

    const tlsOptions = {
      ca: [caCertificate], // Pass the CA certificate as an array of strings
      rejectUnauthorized: false,
    }

    const options = {
      tls: true,
      ...tlsOptions,
    }

    client = new MongoClient(process.env.MONGO_URI, options)
    await client.connect()
    db = client.db('Versadex')
  }
  return db
}

const provider = new ethers.providers.JsonRpcProvider(
  'https://eth-sepolia.g.alchemy.com/v2/FPLZvzEhuo4jMdGjuTqWrtAsaFUpID3t',
)

export async function POST(req: Request) {
  const fullBody = await req.json()
  const body = fullBody.transaction
  const poolBody = fullBody.pool

  if (!body.txHash) {
    return NextResponse.json({
      message: 'No hash found',
      error: 'No hash found',
    })
  }

  try {
    const db = await connectToDatabase()

    await db.collection('transactions').insertOne({
      ...body,
    } as Transaction)

    const txResult = await provider.waitForTransaction(body.txHash)

    if (txResult) {
      const result = await db
        .collection('transactions')
        .updateMany(
          { txHash: body.txHash },
          { $set: { status: txResult.status == 1 ? 'completed' : 'failed' } },
        )

      if (txResult.status == 1 && body.type == 'add_liquidity') {
        const existingPool = await db
          .collection('pools')
          .findOne({ pairAddress: poolBody.pairAddress })

        // if the pool already exists, append address to stakers array if its not already in the stakes array
        if (existingPool) {
          await db
            .collection('pools')
            .updateOne(
              { pairAddress: poolBody.pairAddress },
              { $addToSet: { stakers: poolBody.fromAddress } },
            )
        }

        // if the pool doesn't exist, create it
        if (!existingPool) {
          const newPool = {
            ...poolBody,
            stakers: [poolBody.fromAddress],
          }
          delete newPool.fromAddress

          await db.collection('pools').insertOne({
            ...newPool,
          } as Pool_V2)
        }
      }

      return NextResponse.json({
        message: 'Transaction status updated',
        data: result,
      })
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json({
      message: 'Error tracking transaction',
      error: error.message,
    })
  }
}

export async function GET(req: NextRequest) {
  const queryParams = req.nextUrl.searchParams
  try {
    const find: {
      fromAddress?: string
      status?: string
    } = {}

    const db = await connectToDatabase()
    const address = queryParams.get('address')
    const status = queryParams.get('status')

    if (address) {
      find.fromAddress = address
    }

    if (status) {
      find.status = status
    }
    const transactions = await db
      .collection('transactions')
      .find(find)
      .sort({ initiatedAt: -1 })
      .toArray()

    return NextResponse.json(transactions)
  } catch (error) {
    return NextResponse.json({
      message: 'Error fetching transactions',
      error: error.message,
    })
  }
}
