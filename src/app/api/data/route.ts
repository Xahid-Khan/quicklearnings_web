import { db } from '@/src/config/firebase'
import { doc, query, setDoc } from 'firebase/firestore'
import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'

export async function POST(req: NextRequest) {
  console.log('here>>>', req.body)
  const data: Topic[] = []
  // await setDoc(doc(db, 'data', randomUUID()), {
  //   ...value,
  //   created_at: Date.now(),
  //   topicId: '6OEQgraAvYyQpfpdLVYV'
  // })

  return NextResponse.json(data, { status: 200 })
}
