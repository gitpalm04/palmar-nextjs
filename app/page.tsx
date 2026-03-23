import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { IoCheckmarkOutline, IoHome } from "react-icons/io5";
import CTA from "@/components/CTA";

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
      <section id="home" className=" relative overflow-hidden">
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
                <IoHome /> Transformando sonhos em endereços
              </span>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-black ">
                Seu futuro <br />
                imóvel <br />
                está aqui
              </h1>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-6 text-muted-foreground max-w-md">
              <div className="text-2xl">✦</div>

              <p>
                Trabalhamos com imóveis próprios, oferecendo opções selecionadas
                para venda e locação. Gerenciamos cada propriedade com dedicação
                para garantir conforto, segurança e tranquilidade aos nossos
                clientes.
              </p>
            </div>
          </div>

          {/* HOUSE IMAGE */}
          <div className="relative w-full h-[400px] md:h-[640px] mt-10">
            <Image
              src="/images/hero/home_hero.jpg"
              alt="Modern House"
              fill
              className="object-contain mix-blend-multiply mask-b-from-fuchsia-50"
              priority
            />
          </div>
        </div>
      </section>

      {/* ABOUT (SOBREPOSTO) */}
      <section
        id="about"
        className="scroll-mt-32 relative -mt-40 z-20 pb-24 min-h-screen"
      >
        <div
          className="
      mx-auto max-w-7xl px-10 py-20
      rounded-none sm:rounded-2xl
      grid md:grid-cols-2 gap-16 items-center
    "
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

            <p className="text-muted-foreground max-w-xl">
              Fundada em 1978, a Palmar Construções vem conquistando seu espaço
              no mercado imobiliário sergipano. Atualmente atua na implantação
              de loteamentos e na administração de aluguéis de imóveis próprios.
            </p>
          </div>
        </div>

        {/* BADGES CENTRALIZADOS ABAIXO DA SECTION */}
        <div className="mt-24 flex justify-center px-6">
          <div className="flex gap-3 flex-wrap justify-center">
            <Badge
              variant="secondary"
              className="
          flex items-center gap-2
          px-4 py-2
          bg-white/70 backdrop-blur
          border border-black/5
          shadow-sm
          transition-all duration-300
          hover:scale-105 hover:shadow-md
        "
            >
              <IoCheckmarkOutline />
              Integridade
            </Badge>

            <Badge
              variant="secondary"
              className="
          flex items-center gap-2
          px-4 py-2
          bg-white/70 backdrop-blur
          border border-black/5
          shadow-sm
          transition-all duration-300
          hover:scale-105 hover:shadow-md
        "
            >
              <IoCheckmarkOutline />
              Organização
            </Badge>

            <Badge
              variant="secondary"
              className="
          flex items-center gap-2
          px-4 py-2
          bg-white/70 backdrop-blur
          border border-black/5
          shadow-sm
          transition-all duration-300
          hover:scale-105 hover:shadow-md
        "
            >
              <IoCheckmarkOutline />
              Seriedade
            </Badge>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        className=" relative py-32 min-h-screen"
        style={{
          backgroundImage: "url('/images/textures/noisy-texture.png')",
          backgroundSize: "auto",
        }}
      >
        {/* BACKGROUND */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-300/10 via-transparent to-transparent opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-bl from-amber-300/10 via-transparent to-transparent opacity-30" />

        <div className="mx-auto max-w-5xl px-6 flex flex-col gap-16">
          {/* TITLE */}
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-zinc-50">
              Serviços
            </h2>
            <p className="text-zinc-400 mt-3 text-sm">
              Soluções completas para compra, venda e locação
            </p>
          </div>

          {/* CARDS */}
          <div className="grid md:grid-cols-2 gap-14 pt-10">
            {[
              {
                title: "Aluguel",
                image: "/images/cards/card-rent-removebg-preview.png",
                desc: "Gestão completa de imóveis para locação com segurança e praticidade.",
              },
              {
                title: "Venda",
                image: "/images/cards/card-sell-removebg-preview.png",
                desc: "Intermediação de vendas com valorização e estratégias eficientes.",
              },
            ].map((item, i) => (
              <Card
                key={i}
                className="
            group relative overflow-hidden
            rounded-3xl
            bg-zinc-900/80 backdrop-blur-xl
            border border-white/5
            p-12

            transition-all duration-500 ease-out

            hover:-translate-y-5
            hover:shadow-[0_50px_150px_rgba(0,0,0,0.75)]
          "
              >
                {/* GLOW SUAVE (ATRÁS) */}
                <div
                  className="
              absolute -inset-8
              opacity-0
              group-hover:opacity-100
              transition duration-700
              blur-3xl
              bg-zinc-600/10
            "
                />

                {/* GRADIENT INTERNO */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-br from-white/5 via-transparent to-transparent" />

                {/* CONTEÚDO */}
                <div className="relative flex flex-col items-center text-center gap-6">
                  {/* IMAGEM */}
                  <div className="transition duration-500 group-hover:scale-110">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={200}
                      height={200}
                    />
                  </div>

                  {/* TITULO */}
                  <h3 className="text-xl text-white font-medium">
                    {item.title}
                  </h3>

                  {/* DESCRIÇÃO */}
                  <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
                    {item.desc}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PROPERTIES */}
      <section id="properties" className="py-28 relative -mt-24">
        <div className="absolute inset-0 bg-linear-to-br from-zinc-900/20 via-transparent to-transparent opacity-40 pointer-events-none"></div>
        <div className="absolute inset-0 bg-linear-to-bl from-zinc-900/50 via-transparent to-transparent opacity-40 pointer-events-none"></div>

        <div className="mx-auto max-w-7xl px-6 flex flex-col gap-14">
          {/* HEADER */}

          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="flex flex-col gap-4">
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
              <div className="relative h-65 rounded-2xl overflow-hidden">
                <Image
                  src="/images/hero/maquete.png"
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
                  src="/images/hero/maquete.png"
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
                  src="/images/hero/maquete.png"
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

      <CTA />
    </main>
  );
}
