import { ImoveisList } from "@/components/imoveis-list";


export default function ImoveisPage() {
  return (
    <main
      className="min-h-screen"
      style={{
        backgroundImage: "url('/images/textures/noisy-texture-white.png')",
        backgroundSize: "auto",
      }}
    >
      {/* Hero Section */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4 text-balance">
            Encontre seu imóvel ideal
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto text-pretty">
            Explore nossa seleção exclusiva de imóveis de alto padrão. 
            Apartamentos, casas, terrenos e muito mais esperando por você.
          </p>
        </div>
      </section>

      {/* Lista de Imóveis */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <ImoveisList />
        </div>
      </section>
    </main>
  );
}
