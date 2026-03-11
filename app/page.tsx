import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { IoCheckmarkOutline } from "react-icons/io5";

export default function Home() {
  return (
    <main
      className="flex flex-col gap-24"
      style={{
        backgroundImage: "url('/images/textures/noisy-texture-white.png')",
        backgroundSize: "auto",
      }}
    >
      {/* HERO */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-bl from-zinc-900/50 via-transparent to-transparent opacity-40 pointer-events-none"></div>

        <div className="absolute inset-0 bg-linear-to-tl from-zinc-800/30 via-transparent to-transparent opacity-40 pointer-events-none"></div>
        <div className="absolute inset-0 bg-linear-to-tr from-zinc-800/30 via-transparent to-transparent opacity-40 pointer-events-none"></div>

        {/* GRID BACKGROUND */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0, 0, 0, 0.212) 1px, transparent 1px)",
            backgroundSize: "350px 200px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 pt-40 pb-40">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT */}
            <div className="flex flex-col gap-6">
              <span className="flex items-center gap-2 bg-white border px-4 py-1 rounded-full text-sm w-fit">
                ● Smart Living, Simplified
              </span>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-black">
                We Specialize <br />
                in All Aspects of <br />
                Housing
              </h1>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-6 text-muted-foreground max-w-md">
              <div className="text-2xl">✦</div>

              <p>
                Gerenciando cada um imóvel com cuidado e dedicação
                Reliable housing solutions built for efficiency and comfort.
                Smart, user-centric design for connected communities.
              </p>
            </div>
          </div>

          {/* HOUSE IMAGE */}
          <div className="relative w-full h-[520px] md:h-[640px] mt-10">
            <Image
              src="/images/hero/3d-rendering-cartoon-house.jpg"
              alt="Modern House"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* ABOUT (SOBREPOSTO) */}
      <section id="about" className="relative -mt-40 z-20 pb-24">
        <div
          className="mx-auto max-w-7xl px-10 py-20
  rounded-none sm:rounded-2xl
  grid md:grid-cols-2 gap-16 items-center"
          style={{
            backgroundImage: "url('/images/textures/noisy-texture-white.png')",
            backgroundSize: "auto",
          }}
        >
          {/* LOGO */}
          <div className="flex justify-center">
            <Image
              src="/images/brand/palmar-brand.png"
              alt="Palmar logo"
              width={420}
              height={420}
            />
          </div>

          {/* TEXT */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Quem Somos</p>

              <h2 className="text-3xl font-bold">Palmar Construções</h2>
            </div>

            <p className="text-muted-foreground">
              Fundada em 1978, a Palmar Construções vem conquistando seu espaço
              no mercado imobiliário sergipano. Atualmente atua na implantação
              de loteamentos e na administração de aluguéis de imóveis próprios.
            </p>

            {/* BADGES */}
            <div className="flex gap-3 flex-wrap">
              <Badge variant="secondary" className="flex items-center gap-1">
                <IoCheckmarkOutline />
                Integridade
              </Badge>

              <Badge variant="secondary" className="flex items-center gap-1">
                <IoCheckmarkOutline />
                Organização
              </Badge>

              <Badge variant="secondary" className="flex items-center gap-1">
                <IoCheckmarkOutline />
                Seriedade
              </Badge>
            </div>

            <Button asChild>
              <Link href="#service">Nossos serviços</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        className="relative py-24"
        style={{
          backgroundImage: "url('/images/textures/noisy-texture.png')",
          backgroundSize: "auto",
        }}
      >
        {/* BACKGROUND EFFECTS */}
        <div className="absolute inset-0 bg-linear-to-tr from-amber-300/30 via-transparent to-transparent opacity-30 pointer-events-none"></div>
        <div className="absolute inset-0 bg-linear-to-bl from-amber-300/10 via-transparent to-transparent opacity-40 pointer-events-none"></div>

        <div className="mx-auto max-w-7xl px-6 flex flex-col gap-12">
          {/* TITLE */}
          <div className="text-center">
            <h2 className="text-3xl font-bold">Serviços</h2>
          </div>

          {/* CARDS */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* ALUGUEL */}
            <Card
              className="card-float relative overflow-hidden
        bg-white/10 backdrop-blur-xl
        border border-white/20
        shadow-[0_25px_60px_rgba(0,0,0,0.25)]
        transition-all duration-500
        hover:-translate-y-2
        hover:shadow-[0_35px_80px_rgba(0,0,0,0.35)]"
            >
              <div className="absolute inset-0 bg-linear-to-br from-white/30 via-transparent to-transparent opacity-40 pointer-events-none"></div>

              <CardHeader className="flex flex-col items-center text-center relative">
                <Image
                  src="/images/cards/rent.png"
                  alt="Ícone aluguel"
                  width={180}
                  height={180}
                  className="mb-4"
                />

                <CardTitle className="text-xl">Aluguel</CardTitle>
              </CardHeader>

              <CardContent className="text-center text-muted-foreground relative flex flex-col items-center gap-6">
                <p>Encontre o imóvel ideal para locação.</p>

                {/* TAGS */}
                <div className="flex gap-3 flex-wrap justify-center">
                  <span className="px-4 py-1 text-sm rounded-full bg-white/30 backdrop-blur border border-white/30">
                    Residencial
                  </span>

                  <span className="px-4 py-1 text-sm rounded-full bg-white/30 backdrop-blur border border-white/30">
                    Comercial
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* VENDA */}
            <Card
              className="card-float relative overflow-hidden
        bg-white/10 backdrop-blur-xl
        border border-white/20
        shadow-[0_25px_60px_rgba(0,0,0,0.25)]
        transition-all duration-500
        hover:-translate-y-2
        hover:shadow-[0_35px_80px_rgba(0,0,0,0.35)]"
            >
              <div className="absolute inset-0 bg-linear-to-br from-white/30 via-transparent to-transparent opacity-40 pointer-events-none"></div>

              <CardHeader className="flex flex-col items-center text-center relative">
                <Image
                  src="/images/cards/sell.png"
                  alt="Ícone venda"
                  width={180}
                  height={180}
                  className="mb-4"
                />

                <CardTitle className="text-xl">Venda</CardTitle>
              </CardHeader>

              <CardContent className="text-center text-muted-foreground relative flex flex-col items-center gap-6">
                <p>Adquira seu imóvel com segurança.</p>

                {/* TAGS */}
                <div className="flex gap-3 flex-wrap justify-center">
                  <span className="px-4 py-1 text-sm rounded-full bg-white/30 backdrop-blur border border-white/30">
                    Casas
                  </span>

                  <span className="px-4 py-1 text-sm rounded-full bg-white/30 backdrop-blur border border-white/30">
                    Lotes
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* PROPERTIES */}

      <section id="properties" className="py-28 relative -mt-24">
        <div className="absolute inset-0 bg-linear-to-br from-amber-300/20 via-transparent to-transparent opacity-40 pointer-events-none"></div>
        <div className="absolute inset-0 bg-linear-to-bl from-zinc-900/50 via-transparent to-transparent opacity-40 pointer-events-none"></div>
        
        
        <div className="mx-auto max-w-7xl px-6 flex flex-col gap-14">
          
          {/* HEADER */}

          <div className="grid md:grid-cols-2 gap-10 items-start">

            <div className="flex flex-col gap-4">
              <span className="text-sm flex items-center gap-2">
                ● Featured Properties
              </span>

              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Unlock Your Ideal <br />
                Living Space
              </h2>
            </div>

            <p className="text-muted-foreground max-w-md">
              Step into a world of unparalleled luxury with our exclusive
              portfolio of prime real estate. We meticulously select only the
              finest investment-grade properties and luxury residences.
            </p>
          </div>

          {/* PROPERTY CARDS */}

          <div className="grid md:grid-cols-3 gap-8">
            {/* CARD 1 */}

            <div className="flex flex-col gap-4">
              <div className="relative h-[260px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/properties/property-1.jpg"
                  alt="Silver Birch Villa"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold">Silver Birch Villa</h3>

                <p className="text-sm text-muted-foreground">
                  Birmingham, B1 2AA, United Kingdom
                </p>

                <p className="text-sm text-muted-foreground">
                  4 beds · 3 bath · 1,200 sq.ft
                </p>

                <span className="text-xl font-bold">$850,000</span>
              </div>
            </div>

            {/* CARD 2 */}

            <div className="flex flex-col gap-4">
              <div className="relative h-[260px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/properties/property-2.jpg"
                  alt="Maple Grove Cottage"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold">Maple Grove Cottage</h3>

                <p className="text-sm text-muted-foreground">
                  Liverpool, L1 3AB, United Kingdom
                </p>

                <p className="text-sm text-muted-foreground">
                  2 beds · 1 bath · 750 sq.ft
                </p>

                <span className="text-xl font-bold">$500,000</span>
              </div>
            </div>

            {/* CARD 3 */}

            <div className="flex flex-col gap-4">
              <div className="relative h-[260px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/properties/property-3.jpg"
                  alt="Cedar Hill Estate"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold">Cedar Hill Estate</h3>

                <p className="text-sm text-muted-foreground">
                  Edinburgh, EH1 1AA, Scotland
                </p>

                <p className="text-sm text-muted-foreground">
                  5 beds · 4 bath · 2,000 sq.ft
                </p>

                <span className="text-xl font-bold">$1,200,000</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
