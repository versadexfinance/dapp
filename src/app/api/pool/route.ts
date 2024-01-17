import { MongoClient } from 'mongodb'

import { NextRequest, NextResponse } from 'next/server'
import { ethers } from 'ethers'
import path from 'path'
import { Pool_V2 } from '@/web3/types'

let client
let db

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
  'https://eth-goerli.g.alchemy.com/v2/FPLZvzEhuo4jMdGjuTqWrtAsaFUpID3t',
)

// export async function POST(req: Request) {
//   const body = await req.json()

//   if (!body.txHash) {
//     return NextResponse.json({
//       message: 'No hash found',
//       error: 'No hash found',
//     })
//   }

//   try {
//     const db = await connectToDatabase()

//     // find transaction by txHash
//     const transaction = await db
//       .collection('transactions')
//       .findOne({ txHash: body.txHash })

//     // if this pair address already exists, update it
//     const existingPool = await db
//       .collection('pools')
//       .findOne({ pairAddress: body.pairAddress })

//     // if the pool already exists, append address to stakers array
//     if (existingPool) {
//       await db
//         .collection('pools')
//         .updateOne(
//           { pairAddress: body.pairAddress },
//           { $push: { stakers: body.fromAddress } },
//         )
//     }

//     // if the pool doesn't exist, create it
//     if (!existingPool) {
//       const newPool = {
//         ...body,
//         stakers: [body.fromAddress],
//       }
//       delete newPool.fromAddress

//       await db.collection('pools').insertOne({
//         ...newPool,
//       } as Pool_V2)
//     }
//   } catch (error) {
//     console.error(error)
//     return NextResponse.json({
//       message: 'Error tracking pool transaction',
//       error: error.message,
//     })
//   }
// }

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
