import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'data', 'cameras.json')

async function ensureDbExists() {
  try {
    await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true })
    try {
      await fs.access(DB_PATH)
    } catch {
      await fs.writeFile(DB_PATH, JSON.stringify([]))
    }
  } catch (error) {
    console.error('Failed to initialize database:', error)
    throw error
  }
}

async function getCameras() {
  await ensureDbExists()
  const data = await fs.readFile(DB_PATH, 'utf8')
  return JSON.parse(data)
}

async function saveCameras(cameras: any[]) {
  await fs.writeFile(DB_PATH, JSON.stringify(cameras, null, 2))
}

export async function GET() {
  try {
    const cameras = await getCameras()
    return NextResponse.json(cameras)
  } catch (error) {
    console.error('Failed to fetch cameras:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cameras' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const { cameraURL, position, customPrompt, nickname } = await req.json()
    const cameras = await getCameras()
    
    const newCamera = {
      id: Date.now(),
      camera_url: cameraURL,
      position: position,
      custom_prompt: customPrompt,
      nickname: nickname,
      created_at: new Date().toISOString()
    }
    
    cameras.unshift(newCamera)
    await saveCameras(cameras)
    
    return NextResponse.json(newCamera)
  } catch (error) {
    console.error('Failed to add camera:', error)
    return NextResponse.json(
      { error: 'Failed to add camera' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()
    const cameras = await getCameras()
    const updatedCameras = cameras.filter((camera: any) => camera.id !== id)
    await saveCameras(updatedCameras)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete camera:', error)
    return NextResponse.json(
      { error: 'Failed to delete camera' },
      { status: 500 }
    )
  }
}