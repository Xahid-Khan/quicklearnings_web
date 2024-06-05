import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { Topic } from '@/lib/data_types'

export async function POST(req: NextRequest) {
  console.log('here>>>', req.body)
  const data: Topic[] = []

  return NextResponse.json(data, { status: 200 })
}
