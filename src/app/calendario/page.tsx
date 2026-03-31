/** biome-ignore-all lint/style/noMagicNumbers: Calendar dates require numeric values */
"use client";

import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/app/footer";
import { Navigation } from "@/components/app/navigation";
import { Badge } from "@/components/ui/badge-component";

type FeaturedEvent = {
  id: string;
  name: string;
  date: Date;
  time: string;
  location: string;
  price: string;
  imageAlt: string;
  imageSrc: string;
  href: string;
};

const EVENT_TIME_REGEX = /^(\d{1,2})h(\d{2})$/;

const eventEndDateTime = (event: FeaturedEvent) => {
  const when = new Date(event.date);
  const match = EVENT_TIME_REGEX.exec(event.time);
  if (match) {
    const hours = Number.parseInt(match[1], 10);
    const minutes = Number.parseInt(match[2], 10);
    when.setHours(hours, minutes, 0, 0);
  } else {
    when.setHours(23, 59, 59, 999);
  }
  return when;
};

const isEventPast = (event: FeaturedEvent) =>
  eventEndDateTime(event) < new Date();

const FEATURED_EVENTS: FeaturedEvent[] = [
  {
    id: "xxxi-encontro-coros",
    name: "XXXI Encontro de Coros Infantis-Juvenis",
    date: new Date(2026, 2, 29),
    time: "17h00",
    location: "Fórum Municipal Luísa Todi",
    price: "Bilhetes: 7,50€",
    imageAlt:
      "Cartaz do XXXI Encontro de Coros Infantis-Juvenis no Fórum Municipal Luísa Todi",
    imageSrc: "/A4_VF.png",
    href: "https://luisatodi.bol.pt/",
  },
  {
    id: "anniversary",
    name: "46º Aniversário do Coral infantil de Setúbal",
    date: new Date(2025, 10, 29),
    time: "21h00",
    location: "Fórum Municipal Luísa Todi",
    price: "Bilhetes: 7,50€",
    imageAlt: "Coral infantil a atuar em palco",
    imageSrc: "/cartaz-46-aniv.jpg",
    href: "https://luisatodi.bol.pt/Comprar/Bilhetes/165132-46o_aniversario_do_coral_infantil_de_setubal-forum_municipal_luisa_todi/Sessoes",
  },
];

const groupEventsByMonth = () => {
  const buckets = new Map<number, FeaturedEvent[]>();
  for (const event of FEATURED_EVENTS) {
    const key = event.date.getFullYear() * 100 + event.date.getMonth();
    const existing = buckets.get(key);
    if (existing) {
      existing.push(event);
      continue;
    }
    buckets.set(key, [event]);
  }
  return Array.from(buckets.entries())
    .sort((a, b) => b[0] - a[0])
    .map(([key, events]) => {
      const year = Math.floor(key / 100);
      const monthIndex = key - year * 100;
      const label = new Date(year, monthIndex, 1).toLocaleDateString("pt-PT", {
        month: "long",
        year: "numeric",
      });
      return { label, events };
    });
};

const formatDateBadge = (date: Date) => ({
  day: date.toLocaleDateString("pt-PT", { day: "2-digit" }),
  month: date.toLocaleDateString("pt-PT", { month: "short" }).toUpperCase(),
  year: date.getFullYear(),
});

const EventCard = ({ event }: { event: FeaturedEvent }) => {
  const badge = formatDateBadge(event.date);
  const past = isEventPast(event);
  return (
    <div
      className={`relative flex w-full flex-col gap-4 rounded-[24px] border border-[rgba(55,50,47,0.1)] bg-white/95 p-4 shadow-[0px_16px_40px_rgba(10,10,10,0.04)] sm:grid sm:grid-cols-[280px_minmax(0,1fr)] sm:gap-6 sm:p-6 ${past ? "opacity-[0.72] grayscale" : ""}`}
    >
      <div className="relative w-full overflow-hidden rounded-2xl bg-[#E1ECF7]">
        <Image
          alt={event.imageAlt}
          className="w-full object-fit"
          height={280}
          priority={!past}
          src={event.imageSrc}
          width={420}
        />
        <div className="absolute top-3 left-3 flex flex-row items-center gap-3 rounded-xl bg-white/95 px-3 py-3 text-[#0D4A85] shadow-md">
          <div className="flex flex-col items-center">
            <span className="font-semibold text-xl">{badge.day}</span>
            <span className="font-semibold text-[10px] tracking-[0.25em]">
              {badge.month}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
            <h3 className="font-sans font-semibold text-[#241C17] text-xl sm:text-2xl">
              {event.name}
            </h3>
            <span className="inline-flex shrink-0 flex-wrap items-center justify-end gap-2">
              {past ? (
                <span className="inline-flex rounded-full bg-[rgba(55,50,47,0.08)] px-4 py-1.5 font-sans font-semibold text-[#605A57] text-xs uppercase tracking-[0.2em]">
                  Realizado
                </span>
              ) : null}
              <span className="inline-flex shrink-0 rounded-full bg-[#DDEBFF] px-4 py-1.5 font-sans font-semibold text-[#0D4A85] text-xs uppercase tracking-[0.2em]">
                {event.price}
              </span>
            </span>
          </div>
          <div className="flex flex-col gap-4 font-medium text-[#4E4743] text-sm md:mt-20">
            <div className="flex items-center gap-1.5">
              <CalendarIcon className="size-4 text-[#3B6AA0]" />
              <span className="text-lg">
                {event.date.toLocaleDateString("pt-PT", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <ClockIcon className="size-4 text-[#3B6AA0]" />
              <span className="text-lg">{event.time}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:col-span-2 lg:col-span-1">
              <MapPinIcon className="size-4 text-[#3B6AA0]" />
              <span className="text-lg">{event.location}</span>
            </div>
          </div>
        </div>

        {past ? (
          <span className="flex w-full cursor-not-allowed items-center justify-center rounded-full border border-[rgba(55,50,47,0.15)] bg-[rgba(55,50,47,0.06)] px-5 py-2.5 text-center font-sans font-semibold text-[#605A57] text-lg uppercase tracking-[0.25em]">
            Evento realizado
          </span>
        ) : (
          <Link
            className="flex w-full items-center justify-center rounded-full border border-[rgba(13,74,133,0.2)] bg-[#0D4A85] px-5 py-2.5 font-sans font-semibold text-lg text-white uppercase tracking-[0.25em] transition hover:bg-[#09315F]"
            href={event.href}
          >
            Ver mais
          </Link>
        )}
      </div>
    </div>
  );
};

const Page = () => (
  <div className="relative flex min-h-screen w-full flex-col items-center justify-start overflow-x-hidden bg-[#F7F5F3]">
    <div className="relative flex w-full flex-col items-center justify-start">
      <div className="relative flex min-h-screen w-full max-w-[1200px] flex-col items-start justify-start px-3 sm:px-6 md:px-8 lg:px-10">
        <div className="absolute top-0 left-3 z-0 h-full w-[1px] bg-[rgba(55,50,47,0.08)] shadow-[1px_0px_0px_white] sm:left-6 md:left-8 lg:left-0" />
        <div className="absolute top-0 right-3 z-0 h-full w-[1px] bg-[rgba(55,50,47,0.08)] shadow-[1px_0px_0px_white] sm:right-6 md:right-8 lg:right-0" />

        <div className="relative z-10 flex flex-col items-center justify-center gap-3 self-stretch overflow-hidden pt-4 sm:gap-5 md:gap-6 lg:gap-8">
          <Navigation />

          <div className="flex w-full flex-col items-center justify-start px-2 pt-10 pb-8 sm:px-4 sm:pt-12 sm:pb-10 md:px-8 md:pt-14 md:pb-12 lg:px-0 lg:pt-16">
            <div className="flex w-full flex-col items-center justify-center gap-4 border-[rgba(55,50,47,0.1)] border-b px-4 pb-10 sm:px-6 md:px-8">
              <div className="flex w-full max-w-[760px] flex-col items-center justify-start gap-3">
                <Badge
                  icon={<CalendarIcon className="size-3.5" />}
                  text="Calendário"
                />
                <div className="flex w-full flex-col justify-center text-center font-sans font-semibold text-3xl text-[#49423D] leading-tight tracking-tight sm:text-[34px] md:text-[40px]">
                  Calendário de Atividades
                </div>

                <div className="self-stretch text-center font-normal font-sans text-[#605A57] text-sm leading-6 sm:text-base">
                  Consulte os próximos concertos e eventos do Coral Infantil de
                  Setúbal.
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col gap-8 border-[rgba(55,50,47,0.1)] border-b px-2 py-8 sm:px-4 md:px-8">
              {groupEventsByMonth().map(({ label, events }) => (
                <section className="flex flex-col gap-6" key={label}>
                  <div className="flex w-full items-center gap-4 font-semibold text-[#7A94B8] text-xs uppercase tracking-[0.35em]">
                    <span className="h-[1px] flex-1 bg-[rgba(55,50,47,0.14)]" />
                    <span>{label}</span>
                    <span className="h-[1px] flex-1 bg-[rgba(55,50,47,0.14)]" />
                  </div>
                  <div className="flex flex-col gap-6">
                    {events.map((event) => (
                      <EventCard event={event} key={event.id} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  </div>
);

export default Page;
