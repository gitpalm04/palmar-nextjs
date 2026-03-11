import { NextResponse } from "next/server"

export async function POST(req: Request) {

  const data = await req.json()

  console.log("Contato recebido:", data)

  // aqui você pode enviar email usando nodemailer

  return NextResponse.json({ success: true })
}