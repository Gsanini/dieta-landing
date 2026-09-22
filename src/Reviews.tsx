import { Quote, Star } from "lucide-react";
import { reviews } from "./review-data";

const sectionContainer =
  "mx-auto w-[calc(100%-40px)] max-w-[1120px] min-[701px]:w-[calc(100%-64px)] min-[1001px]:w-[calc(100%-96px)]";

export default function Reviews() {
  return (
    <section
      className={`${sectionContainer} scroll-mt-9 pt-11 min-[701px]:pt-[72px]`}
      id="avaliacoes"
      aria-labelledby="reviews-title"
    >
      <div>
        <p className="mb-4 flex items-center gap-2.5 text-[7px] font-semibold tracking-[1.5px] text-[#c1d99b] min-[701px]:mb-5 min-[701px]:text-[8px] min-[701px]:tracking-[1.7px]">
          <span className="h-px w-6 bg-[#8ba56d]" /> ESPAÇO DE AVALIAÇÕES
        </p>
        <h2
          id="reviews-title"
          className="font-manrope text-[33px] font-medium leading-[1.22] tracking-[-1.2px] min-[701px]:text-[37px] min-[701px]:tracking-[-1.5px]"
        >
          Pequenas escolhas.
          <br />
          <span className="font-editorial text-[1.17em] font-normal italic tracking-[-.6px] text-[#c1d99b]">
            Novas histórias.
          </span>
        </h2>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-[15px] min-[701px]:mt-8 min-[701px]:grid-cols-3 min-[701px]:gap-3.5 min-[1001px]:gap-5">
        {reviews.map((review) => (
          <article
            className="flex min-w-0 flex-col rounded-[10px] border border-[#36422d] bg-[linear-gradient(145deg,#1b2216a6,#141a11a6)] p-6 min-[701px]:px-[17px] min-[701px]:py-[22px] min-[1001px]:px-[23px] min-[1001px]:pb-[22px] min-[1001px]:pt-[26px]"
            key={review.id}
            aria-labelledby={`review-${review.id}`}
          >
            <div className="mb-[18px] flex items-center justify-between min-[701px]:mb-[23px]">
              <span
                className="flex items-center gap-1 text-[#c1d99b]"
                role="img"
                aria-label={`Nota ilustrativa: ${review.rating} de 5 estrelas`}
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    size={13}
                    aria-hidden="true"
                    fill={index < review.rating ? "currentColor" : "none"}
                    className={index < review.rating ? "" : "text-[#647452]"}
                    strokeWidth={1.5}
                  />
                ))}
              </span>
              <Quote
                className="text-[#6d8157]"
                size={25}
                strokeWidth={1}
                aria-hidden="true"
              />
            </div>
            <h3
              className="mb-[13px] font-manrope text-base font-medium leading-[1.5] tracking-[-.35px] min-[701px]:text-[15px]"
              id={`review-${review.id}`}
            >
              {review.title}
            </h3>
            <blockquote className="mb-[22px] flex-1 min-[701px]:mb-[26px]">
              <p className="text-[13px] leading-[1.85] text-[#a9b29d] min-[701px]:text-xs min-[701px]:leading-[1.9]">
                “{review.comment}”
              </p>
            </blockquote>
            <div className="flex items-center gap-[11px] border-t border-[#c2d8a41a] pt-[19px] min-[701px]:gap-2 min-[1001px]:gap-2.5">
              <img
                className="h-[46px] w-[46px] shrink-0 rounded-full border border-[#9faf7e66] object-cover saturate-[.8] min-[701px]:h-[43px] min-[701px]:w-[43px]"
                src={review.avatar}
                alt={`Avatar fictício de ${review.name}, gerado por IA`}
                width="48"
                height="48"
                loading="lazy"
                decoding="async"
              />
              <div className="flex min-w-0 flex-col gap-1">
                <span className="text-xs font-semibold text-[#e0e7d6] min-[701px]:text-[11px]">
                  {review.name}
                </span>
                <span className="text-[10px] text-[#a0ac91] min-[701px]:text-[9px]">
                  Perfil ilustrativo
                </span>
              </div>
              <span className="ml-auto whitespace-nowrap rounded bg-[#a5bc7f0c] px-[7px] py-[5px] text-[9px] text-[#afc497] min-[701px]:px-[5px] min-[701px]:py-1 min-[701px]:text-[7px] min-[1001px]:px-[7px] min-[1001px]:py-[5px] min-[1001px]:text-[8px]">
                {review.topic}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
