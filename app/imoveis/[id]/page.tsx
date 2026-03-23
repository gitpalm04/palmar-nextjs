import Image from "next/image";

async function getImovel(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/imoveis?id=${id}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Erro ao carregar imóvel");
  }

  return res.json();
}

export default async function ImovelPage({
  params,
}: {
  params: { id: string };
}) {
  const imovel = await getImovel(params.id);

  const imagens = imovel.imagens ? JSON.parse(imovel.imagens) : [];

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold mb-8">{imovel.titulo}</h1>

      {/* GALERIA */}

      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative w-full h-112.5">
          <Image
            src={imovel.imagem_principal}
            alt={imovel.titulo}
            fill
            className="object-cover rounded-xl"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          {imagens.map((img: string, i: number) => (
            <div key={i} className="relative w-full h-32">
              <Image
                src={img}
                alt={`Imagem ${i + 1}`}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* INFO */}

      <div className="mt-10 space-y-4">
        <p className="text-2xl font-bold">R$ {imovel.preco}</p>

        <p>{imovel.descricao}</p>

        <div className="flex gap-6 mt-6">
          <span>🛏 {imovel.quartos} quartos</span>
          <span>🚿 {imovel.suites} suítes</span>
          <span>🚗 {imovel.garagem} vagas</span>
          <span>📐 {imovel.tamanho} m²</span>
        </div>
      </div>
    </div>
  );
}
