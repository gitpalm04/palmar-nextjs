export default function ImoveisPage() {
  return (
    <main className="min-h-screen" style={{
        backgroundImage: "url('/images/textures/noisy-texture-white.png')",
        backgroundSize: "auto",
      }}>

      {/* HERO */}
      <section className="relative h-[300px] flex items-center px-8">

        {/* IMAGEM */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero-building.jpg')",
          }}
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

        {/* TEXTO */}
        <div className="relative z-10 text-white">
          <h1 className="text-4xl font-semibold">Buscar imóveis</h1>
          <p className="text-sm opacity-80 mt-2">Aracaju</p>
        </div>

      </section>

      {/* SEARCH BAR */}
      <div className="relative z-20 -mt-10 px-6 max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-4 flex flex-wrap gap-3 items-center">

          <input
            placeholder="Digite endereço, cidade ou CEP"
            className="flex-1 px-4 py-2 bg-zinc-100 rounded-xl outline-none text-sm"
          />

          <select className="px-3 py-2 bg-zinc-100 rounded-xl text-sm">
            <option>Venda</option>
          </select>

          <button className="bg-black text-white px-4 py-2 rounded-xl hover:scale-105 transition">
            Buscar
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 mt-10 grid lg:grid-cols-[1.3fr_1fr] gap-8">

        {/* LISTA */}
        <div className="flex flex-col gap-6">

          <h2 className="text-xl font-semibold">Melhores opções</h2>

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex gap-4 bg-white rounded-2xl p-4 shadow hover:shadow-lg transition"
            >
              {/* IMAGEM */}
              <img
                src="/images/imovel1.jpg"
                className="w-40 h-28 object-cover rounded-xl"
              />

              {/* INFO */}
              <div className="flex flex-col justify-between flex-1">

                <div>
                  <h3 className="font-semibold">
                    Apartamento moderno
                  </h3>

                  <p className="text-sm text-zinc-500">
                    Aracaju, SE
                  </p>
                </div>

                <div className="flex gap-3 text-xs text-zinc-600">
                  <span>🛏 2</span>
                  <span>🛁 1</span>
                  <span>📐 60m²</span>
                </div>
              </div>

              {/* PREÇO */}
              <div className="flex flex-col justify-between items-end">
                <span className="font-semibold">
                  R$ 350.000
                </span>

                <button className="text-zinc-400 hover:text-black">
                  ♥
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* MAPA */}
        <div className="sticky top-6 h-[500px] bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="w-full h-full flex items-center justify-center text-zinc-500">
            Mapa (Google Maps / Leaflet)
          </div>
        </div>

      </section>
    </main>
  )
}