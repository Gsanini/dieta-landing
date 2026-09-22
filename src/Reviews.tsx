import { MessageCircle, Quote, Star } from 'lucide-react'
import { reviews } from './review-data'
import './reviews.css'

export default function Reviews() {
  return (
    <section className="reviews section-container" id="avaliacoes" aria-labelledby="reviews-title" aria-describedby="reviews-disclosure">
      <div className="section-heading reviews-heading">
        <div>
          <p className="eyebrow section-eyebrow"><span className="small-line" /> ESPAÇO DE AVALIAÇÕES</p>
          <h2 id="reviews-title">Pequenas escolhas.<br /><span>Novas histórias.</span></h2>
        </div>
        <div className="reviews-intro">
          <span className="reviews-preview"><MessageCircle size={13} /> Depoimentos ilustrativos</span>
          <p id="reviews-disclosure">Nomes e comentários fictícios, com avatares gerados por IA. Estes exemplos não representam compradores reais.</p>
        </div>
      </div>
      <div className="review-grid">
        {reviews.map(review => (
          <article className="review-card" key={review.id} aria-labelledby={`review-${review.id}`}>
            <div className="review-card-top">
              <span className="review-stars" role="img" aria-label={`Nota ilustrativa: ${review.rating} de 5 estrelas`}>
                {Array.from({ length: 5 }, (_, index) => <Star key={index} size={13} aria-hidden="true" fill={index < review.rating ? 'currentColor' : 'none'} className={index < review.rating ? '' : 'star-empty'} strokeWidth={1.5} />)}
              </span>
              <Quote size={25} strokeWidth={1} aria-hidden="true" />
            </div>
            <h3 id={`review-${review.id}`}>{review.title}</h3>
            <blockquote><p>“{review.comment}”</p></blockquote>
            <div className="review-author">
              <img src={review.avatar} alt={`Avatar fictício de ${review.name}, gerado por IA`} width="48" height="48" loading="lazy" decoding="async" />
              <div><span className="review-name">{review.name}</span><span className="review-profile">Perfil ilustrativo</span></div>
              <span className="review-topic">{review.topic}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
