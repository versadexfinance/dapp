import { MongoClient } from 'mongodb'

import { NextRequest, NextResponse } from 'next/server'
import { ethers } from 'ethers'

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
    client = new MongoClient(process.env.MONGO_URI)
    await client.connect()
    db = client.db('transactions') // Replace with your database name
  }
  return db
}

const provider = new ethers.providers.JsonRpcProvider(
  'https://eth-goerli.g.alchemy.com/v2/FPLZvzEhuo4jMdGjuTqWrtAsaFUpID3t',
)

async function checkTransactionStatus(db, txHash) {

  try {

    const txResult = await provider.waitForTransaction(txHash)

    if (txResult) {
       const result = await db
      .collection('transactions')
      .updateOne({ txHash }, { $set: {status:txResult.status == 1 ? "completed" : "failed"} })

      return result
    }
  } catch (error) {
    console.error('Error fetching transaction: ', error)
  }
}

// Polling function


export async function POST(req: Request) {
  


  const body = await req.json()

  if(!body.txHash){
    return NextResponse.json({
      message: 'No hash found',
      error: "No hash found",
    })
  }

  try {
    const db = await connectToDatabase()

    // const { txHash, type, fromAddress, toAddress } = body

    // Record the transaction in the database

    await db.collection('transactions').insertOne({
      ...body
    } as Transaction)

    // const etherscanResponse = await axios.get(
    //   `https://api-goerli.etherscan.io/api?module=transaction&action=getstatus&txhash=${body.txHash}&apikey=${process.env.ETHERSCAN_API_KEY}`,
    // )


    // console.log('etherscanResponse', etherscanResponse.data)

    // const transactionStatus = etherscanResponse.data.result

   

    const result = checkTransactionStatus(db, body.txHash)

    return NextResponse.json({
      message: 'Transaction status updated',
      data: result,
    })
  } catch (error) {
    return NextResponse.json({
      message: 'Error tracking transaction',
      error: error.message,
    })
  }
}

export async function GET(req: NextRequest) {
  const queryParams = req.nextUrl.searchParams
  try {
    const db = await connectToDatabase()

    const transactions = await db
      .collection('transactions')
      .find({ fromAddress: queryParams.get('address') })
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
