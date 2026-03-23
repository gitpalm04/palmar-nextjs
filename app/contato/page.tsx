import { IoCallOutline, IoLocationOutline, IoMailOutline } from "react-icons/io5";

export default function ContatoPage() {
  return (
    <main className="min-h-screen" style={{
        backgroundImage: "url('/images/textures/noisy-texture-white.png')",
        backgroundSize: "auto",
      }}>

      {/* HERO */}
      <section className="relative h-60 flex items-center px-8" style={{
        backgroundImage: "url('/images/textures/noisy-texture.png')",
        backgroundSize: "auto",
      }}>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      </section>

      <div className="max-w-7xl mx-auto px-6 mt-10 grid lg:grid-cols-[1.3fr_1fr] gap-8 p-14">

        {/* LEFT */}
        <div className="flex flex-col gap-6">

          <span className="text-sm text-zinc-500">
            Contato
          </span>

          <h1 className="text-4xl font-semibold leading-tight">
            Entre em contato, estamos prontos para colaborar
          </h1>

          <p className="text-zinc-600 max-w-md">
            Vamos transformar suas ideias em realidade com criatividade,
            precisão e dedicação em cada projeto.
          </p>

          {/* INFO */}
          <div className="flex flex-col gap-4 mt-6 text-zinc-600">

            <div className="flex items-center gap-3">
              <IoMailOutline size={18} />
              contato@palmarconstrucoes.com
            </div>

            <div className="flex items-center gap-3">
              <IoCallOutline size={18} />
              (79) 99999-9999
            </div>

            <div className="flex items-center gap-3">
              <IoLocationOutline size={18} />
              Aracaju, Sergipe - Brasil
            </div>

          </div>

        </div>

        {/* FORM */}
        <form className="bg-white rounded-2xl p-8 shadow-lg flex flex-col gap-6">

          {/* NAME */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Nome</label>
            <input
              type="text"
              placeholder="Seu nome"
              className="bg-zinc-100 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>

          {/* EMAIL */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="seuemail@email.com"
              className="bg-zinc-100 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>

          {/* INTERESSE */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              Tipo de interesse
            </label>

            <select className="bg-zinc-100 rounded-lg px-4 py-3 outline-none">
              <option>Aluguel</option>
              <option>Compra</option>
            </select>
          </div>

          {/* MESSAGE */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              Mensagem
            </label>

            <textarea
              rows={4}
              placeholder="Digite sua mensagem..."
              className="bg-zinc-100 rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-black/20"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="mt-2 bg-black text-white py-3 rounded-full font-medium hover:opacity-90 transition"
          >
            Enviar mensagem
          </button>

        </form>
      </div>
    </main>
  )
}