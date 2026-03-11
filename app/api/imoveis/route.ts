import { NextResponse } from "next/server"
import db from "@/lib/db"

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  if (id) {

    const [rows]: any = await db.query(
      "SELECT * FROM imoveis WHERE id=?",
      [id]
    )

    return NextResponse.json(rows[0])
  }

  const [rows]: any = await db.query(
    "SELECT * FROM imoveis ORDER BY id DESC"
  )

  return NextResponse.json(rows)
}