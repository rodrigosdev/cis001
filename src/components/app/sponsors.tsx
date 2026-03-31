import Image from "next/image";
import { cn } from "@/lib/utils";
import { SponsorsIcon } from "../icons/sponsors";
import { Badge } from "../ui/badge-component";

const GRID_COLS = 2;
const SPONSOR_LOGOS = [
  { alt: "Câmara Municipal de Setúbal", src: "/cms-logo.png", className: "" },
  {
    alt: "União das Freguesias de Setúbal",
    src: "/ufs-logo.png",
    className: "p-3",
  },
  { alt: "Fundação Inatel", src: "/inatel.png", className: "" },
  { alt: "Secil", src: "/secil.png", className: "" },
] as const;

const Sponsors = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center border-[rgba(55,50,47,0.12)] border-b">
      <div className="flex items-center justify-center gap-6 self-stretch border-[rgba(55,50,47,0.12)] border-b px-4 py-8 sm:px-6 sm:py-12 md:px-24 md:py-16">
        <div className="flex w-full max-w-[1200px] flex-col items-center justify-start gap-3 overflow-hidden rounded-lg px-4 py-4 shadow-none sm:gap-4 sm:px-6 sm:py-5">
          <Badge icon={<SponsorsIcon />} text="Sobre Nós" />
          <div className="flex w-full max-w-[472.55px] flex-col justify-center text-center font-sans font-semibold text-[#49423D] text-xl leading-tight tracking-tight sm:text-2xl md:text-3xl md:leading-[60px] lg:text-5xl">
            Quem Somos
          </div>
          <div className="self-stretch text-center font-normal font-sans text-[#605A57] text-sm leading-6 sm:text-base sm:leading-7">
            O Coral Infantil de Setúbal é uma Pessoa Coletiva com Estatuto de
            Utilidade Pública (EUP), que tem como missão a promoção do gosto
            pela música e pelo canto. Visa a formação e desenvolvimento integral
            e harmonioso das suas crianças e jovens, promovendo um ambiente de
            partilha e tolerância, propício à criação de laços de amizade. No
            cumprimento da sua missão, conta com o apoio dos seus associados,
            bem como das instituições com as quais estabelece anualmente acordos
            de parceria: Câmara Municipal de Setúbal, União de Freguesias de
            Setúbal e Secil. O Coral Infantil de Setúbal está inscrito como
            Centro de Cultura e Desporto da Fundação Inatel, pelo que os seus
            projetos e iniciativas são regularmente apoiados por esta fundação.
          </div>
        </div>
      </div>

      <div className="flex items-start justify-center self-stretch border-[rgba(55,50,47,0.12)] border-b-0 bg-[#0D4A85]/20">
        <div className="relative w-4 self-stretch overflow-hidden sm:w-6 md:w-8 lg:w-12" />

        <div className="grid flex-1 grid-cols-2 gap-0 border-[rgba(55,50,47,0.12)] border-r border-l bg-[#F7F5F3]">
          {/* Logo Grid - 2x2 grid */}
          {SPONSOR_LOGOS.map((logo, index) => {
            const isLeftColumn = index % GRID_COLS === 0;
            const isTopRow = index < GRID_COLS;

            return (
              <div
                className={`flex h-24 items-center justify-center border-[#E3E2E1] sm:h-32 md:h-36 lg:h-40 ${isLeftColumn ? "border-r-[0.5px]" : "border-l-[0.5px]"} ${isTopRow ? "border-b-[0.5px]" : "border-t-[0.5px] border-b"}`}
                key={logo.alt}
              >
                <Image
                  alt={logo.alt}
                  className={cn("h-full w-full object-contain", logo.className)}
                  height={1000}
                  src={logo.src}
                  width={1000}
                />
              </div>
            );
          })}
        </div>

        <div className="relative w-4 self-stretch overflow-hidden sm:w-6 md:w-8 lg:w-12" />
      </div>
    </div>
  );
};

export { Sponsors };
