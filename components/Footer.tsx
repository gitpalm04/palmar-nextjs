import Link from "next/link"
import { IoCallOutline, IoHourglassOutline, IoLocationOutline, IoMailOutline } from "react-icons/io5"

export default function Footer() {

  const year = new Date().getFullYear()

  return (
    <footer id="contact"  style={{
          backgroundImage: "url('/images/textures/noisy-texture.png')",
          backgroundSize: "auto",
        }}>

      {/* TOP */}
      <div
        className="mx-auto max-w-7xl px-6 py-12"
      >

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <div>

            <Link href="/" className="text-xl font-bold">
              PALMAR
            </Link>

            <p className="mt-4 text-sm text-muted-foreground">
              A Palmar Construções é uma empresa familiar no mercado imobiliário de Sergipe,
              atuando em loteamentos e administração de aluguéis próprios. Seus valores de
              transparência, seriedade e organização garantem a confiança e satisfação dos clientes.
            </p>

          </div>

          {/* CONTATO */}
          <div>

            <h3 className="mb-4 text-sm font-semibold">Contato</h3>

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

            <h3 className="mb-4 text-sm font-semibold">Serviços</h3>

            <ul className="space-y-2 text-sm">

              <li>
                <Link href="/aluguel" className="hover:text-primary transition-colors">
                  Aluguel
                </Link>
              </li>

              <li>
                <Link href="/venda" className="hover:text-primary transition-colors">
                  Venda
                </Link>
              </li>

            </ul>

          </div>

          {/* LINKS ÚTEIS */}
          <div>

            <h3 className="mb-4 text-sm font-semibold">Links úteis</h3>

            <ul className="space-y-2 text-sm">

              <li>
                <Link href="/contato" className="hover:text-primary transition-colors">
                  Contato
                </Link>
              </li>

              <li>
                <Link href="/documentos" className="hover:text-primary transition-colors">
                  Documentação
                </Link>
              </li>

              <li>
                <a
                  href="https://fazenda.aracaju.se.gov.br/#/publica/contribuinte/servicos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  IPTU
                </a>
              </li>

              <li>
                <a
                  href="https://fazenda.aracaju.se.gov.br/#/publica/contribuinte/servicos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  ITBI
                </a>
              </li>

              <li>
                <a
                  href="https://www8.caixa.gov.br/siopiinternet-web/simulaOperacaoInternet.do?method=inicializarCasoUso"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Simulador CAIXA
                </a>
              </li>

              <li>
                <a
                  href="https://www.bb.com.br/site/investimentos/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Simulador BB
                </a>
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

        <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm text-muted-foreground">
          © Palmar {year} | Todos os direitos reservados.
        </div>

      </div>

    </footer>
  )
}