import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { ImovelGallery } from "@/components/imovel-gallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Bed,
  Bath,
  Car,
  Maximize,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Check,
} from "lucide-react";
import { getImovelBySlug } from "@/lib/imoveis";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const tipoLabels: Record<string, string> = {
  apartamento: "Apartamento",
  casa: "Casa",
  terreno: "Terreno",
  comercial: "Comercial",
  cobertura: "Cobertura",
};

const statusLabels: Record<
  string,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  disponivel: { label: "Disponível", variant: "default" },
  vendido: { label: "Vendido", variant: "destructive" },
  reservado: { label: "Reservado", variant: "secondary" },
  em_construcao: { label: "Em Construção", variant: "outline" },
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const imovel = await getImovelBySlug(slug);

  if (!imovel) {
    return { title: "Imóvel não encontrado" };
  }

  return {
    title: `${imovel.titulo} | Construtora`,
    description:
      imovel.descricao || `${tipoLabels[imovel.tipo]} em ${imovel.cidade}`,
  };
}

export default async function ImovelPage({ params }: PageProps) {
  const { slug } = await params;
  const imovel = await getImovelBySlug(slug);

  if (!imovel) {
    notFound();
  }

  const statusInfo = statusLabels[imovel.status] || statusLabels.disponivel;
  const precoFormatado = imovel.preco
    ? new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 0,
      }).format(imovel.preco)
    : "Sob consulta";

  return (
    <main className="min-h-screen" style={{
        backgroundImage: "url('/images/textures/noisy-texture-white.png')",
        backgroundSize: "auto",
      }}>
      {/* HERO */}
      <section
        className="relative h-60 flex items-center px-8"
        style={{
          backgroundImage: "url('/images/textures/noisy-texture.png')",
          backgroundSize: "auto",
        }}
      >
        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Galeria */}
            <ImovelGallery imagens={imovel.imagens} titulo={imovel.titulo} />

            {/* Informações */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                <Badge variant="outline">{tipoLabels[imovel.tipo]}</Badge>
                {imovel.destaque && (
                  <Badge
                    variant="secondary"
                    className="bg-accent text-accent-foreground"
                  >
                    Destaque
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                {imovel.titulo}
              </h1>

              {imovel.endereco && (
                <p className="flex items-center gap-2 text-muted-foreground mb-6">
                  <MapPin className="h-5 w-5 shrink-0" />
                  {imovel.endereco}
                  {imovel.bairro && `, ${imovel.bairro}`}
                  {imovel.cidade && ` - ${imovel.cidade}`}
                  {imovel.estado && `/${imovel.estado}`}
                </p>
              )}

              {/* Atributos */}
              {imovel.tipo !== "terreno" && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {imovel.quartos > 0 && (
                    <div className="bg-card p-4 rounded-lg text-center border">
                      <Bed className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">{imovel.quartos}</p>
                      <p className="text-sm text-muted-foreground">
                        {imovel.quartos === 1 ? "Quarto" : "Quartos"}
                      </p>
                    </div>
                  )}
                  {imovel.suites > 0 && (
                    <div className="bg-card p-4 rounded-lg text-center border">
                      <Bed className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">{imovel.suites}</p>
                      <p className="text-sm text-muted-foreground">
                        {imovel.suites === 1 ? "Suíte" : "Suítes"}
                      </p>
                    </div>
                  )}
                  {imovel.banheiros > 0 && (
                    <div className="bg-card p-4 rounded-lg text-center border">
                      <Bath className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">{imovel.banheiros}</p>
                      <p className="text-sm text-muted-foreground">
                        {imovel.banheiros === 1 ? "Banheiro" : "Banheiros"}
                      </p>
                    </div>
                  )}
                  {imovel.vagas > 0 && (
                    <div className="bg-card p-4 rounded-lg text-center border">
                      <Car className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">{imovel.vagas}</p>
                      <p className="text-sm text-muted-foreground">
                        {imovel.vagas === 1 ? "Vaga" : "Vagas"}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Áreas */}
              {(imovel.area_total || imovel.area_construida) && (
                <div className="flex gap-8 mb-8">
                  {imovel.area_total && (
                    <div className="flex items-center gap-3">
                      <Maximize className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Área Total
                        </p>
                        <p className="font-semibold">{imovel.area_total} m²</p>
                      </div>
                    </div>
                  )}
                  {imovel.area_construida && (
                    <div className="flex items-center gap-3">
                      <Maximize className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Área Construída
                        </p>
                        <p className="font-semibold">
                          {imovel.area_construida} m²
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <Separator className="my-8" />

              {/* Descrição */}
              {imovel.descricao && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Descrição</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {imovel.descricao}
                  </p>
                </div>
              )}

              {/* Características */}
              {imovel.caracteristicas.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Características
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {imovel.caracteristicas.map((caracteristica, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-muted-foreground"
                      >
                        <Check className="h-4 w-4 text-primary shrink-0" />
                        {caracteristica}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div
              className="top-8 space-y-6"
              style={{
                backgroundImage:
                  "url('/images/textures/noisy-texture.png')",
                backgroundSize: "auto",
              }}
            >
              {/* Card de Preço */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl text-primary">
                    {precoFormatado}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full gap-2" size="lg">
                    <MessageCircle className="h-5 w-5" />
                    Tenho interesse
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Phone className="h-4 w-4" />
                    Ligar agora
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Mail className="h-4 w-4" />
                    Enviar email
                  </Button>
                </CardContent>
              </Card>

              {/* Código do Imóvel */}
              <Card style={{
                backgroundImage:
                  "url('/images/textures/noisy-texture.png')",
                backgroundSize: "auto",
              }}>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">
                    Código do imóvel
                  </p>
                  <p className="font-mono text-lg">
                    # {imovel.id.toString().padStart(6, "0")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
