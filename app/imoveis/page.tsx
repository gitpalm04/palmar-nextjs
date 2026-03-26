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

      {/* Lista de Imóveis */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <ImoveisList />
        </div>
      </section>
    </main>
  );
}
