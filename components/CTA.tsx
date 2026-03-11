import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

export default function CTA() {
  return (
    <section className="relative py-20 overflow-hidden" style={{
          backgroundImage: "url('/images/textures/noisy-texture-white.png')",
          backgroundSize: "auto",
        }}>

      {/* TEXTURA METADE DE BAIXO */}
      <div
        className="absolute bottom-0 left-0 w-full h-1/2"
        style={{
          backgroundImage: "url('/images/textures/noisy-texture.png')",
          backgroundSize: "auto",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">

        <div
          className="flex flex-col md:flex-row items-center justify-between gap-6 p-10 shadow-xl rounded-sm"
          style={{
            backgroundImage: "url('/images/textures/noisy-texture-yellow.png')",
            backgroundSize: "auto",
          }}
        >

          <div className="space-y-2 text-center md:text-left">

            <h2 className="text-3xl font-bold">
              Fale com nossa equipe!
            </h2>

            <p className="text-muted-foreground">
              Tire suas dúvidas e descubra as melhores oportunidades.
            </p>

          </div>

          <Link
            href="https://wa.me/557932111809"
            target="_blank"
          >
            <Button size="lg" className="flex items-center gap-2">
              Entrar em contato
              <MessageCircle size={20} />
            </Button>
          </Link>

        </div>

      </div>

    </section>
  )
}