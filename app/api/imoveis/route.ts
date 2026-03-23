import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      titulo,
      descricao,
      preco,
      cidade,
      estado,
      quartos,
      suites,
      garagem,
      tamanho,
      imagem_principal,
      imagens,
    } = body;

    await db.query(
      `INSERT INTO imoveis 
      (titulo, descricao, preco, cidade, estado, quartos, suites, garagem, tamanho, imagem_principal, imagens)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        titulo,
        descricao,
        preco,
        cidade,
        estado,
        quartos,
        suites,
        garagem,
        tamanho,
        imagem_principal,
        JSON.stringify(imagens),
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao salvar" }, { status: 500 });
  }
}