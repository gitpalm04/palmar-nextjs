import Link from "next/link";
import {
  IoCallOutline,
  IoHourglassOutline,
  IoLocationOutline,
  IoMailOutline,
} from "react-icons/io5";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      style={{
        backgroundImage: "url('/images/textures/noisy-texture.png')",
        backgroundSize: "auto",
      }}
      className="text-[#888]"
    >
      {/* TOP */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* BRAND */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-[#c6c6c6]">PALMAR</h2>

            <p className="mt-4 max-w-md text-md text-muted-foreground text-justify">
              A Palmar Construções é uma empresa familiar no mercado imobiliário
              de Sergipe, oferecendo soluções confiáveis em aluguel, venda e
              administração de imóveis.
            </p>
          </div>

          {/* CONTATO */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-[#c6c6c6]">
              Contato
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="tel:+557932111808"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <IoCallOutline size={18} />
                  <span>(79) 3211-1808</span>
                </a>
              </li>

              <li>
                <a
                  href="tel:+557932141280"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <IoCallOutline size={18} />
                  <span>(79) 3214-1280</span>
                </a>
              </li>

              <li>
                <a
                  href="mailto:palmar.const@uol.com.br"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <IoMailOutline size={18} />
                  <span>palmar.const@uol.com.br</span>
                </a>
              </li>

              <li>
                <a
                  href="https://goo.gl/maps/bi3pXnMLiGD2WDrz8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <IoLocationOutline size={18} />
                  <span>Bairro Suíssa - Aracaju/SE</span>
                </a>
              </li>

              <li className="flex items-center gap-2">
                <IoHourglassOutline size={18} />
                <span>Segunda a Sexta: 8h - 17:30h</span>
              </li>
            </ul>
          </div>

          {/* SERVIÇOS */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-[#c6c6c6]">
              Links
            </h3>

            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/aluguel"
                  className="hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/venda"
                  className="hover:text-primary transition-colors"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  href="/venda"
                  className="hover:text-primary transition-colors"
                >
                  Serviços
                </Link>
              </li>

              <li>
                <Link
                  href="/venda"
                  className="hover:text-primary transition-colors"
                >
                  Imóveis
                </Link>
              </li>

              <li>
                <Link
                  href="/venda"
                  className="hover:text-primary transition-colors"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div
        style={{
          backgroundImage: "url('/images/textures/noisy-texture-bfooter.png')",
          backgroundSize: "auto",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm text-[#cecece]">
          © Palmar {year} | Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}