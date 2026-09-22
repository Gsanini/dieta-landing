// Preencha estes dois links quando sua VSL e sua oferta estiverem prontas.
export const siteConfig = {
  // Aceita YouTube, Vimeo ou um link direto para um arquivo de vídeo (.mp4/.webm).
  videoUrl: '',
  checkoutUrl: '',
  poster: '/images/selva-poster.webp',
}

export function getVideoSource(value: string): { type: 'embed' | 'file'; url: string } | null {
  if (!value) return null
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:') return null
    const host = url.hostname.replace(/^www\./, '')
    if (host === 'youtube.com' || host === 'youtu.be' || host === 'youtube-nocookie.com') {
      const id = host === 'youtu.be' ? url.pathname.slice(1) : url.searchParams.get('v') || url.pathname.split('/').pop()
      if (!id || !/^[\w-]{11}$/.test(id)) return null
      return { type: 'embed', url: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0` }
    }
    if (host === 'vimeo.com' || host === 'player.vimeo.com') {
      const segments = url.pathname.split('/').filter(Boolean)
      const id = segments.find(segment => /^\d+$/.test(segment))
      if (!id) return null
      const hash = url.searchParams.get('h') || segments[segments.indexOf(id) + 1]
      return { type: 'embed', url: `https://player.vimeo.com/video/${id}?autoplay=1${hash ? `&h=${encodeURIComponent(hash)}` : ''}` }
    }
    if (/\.(mp4|webm|ogg)$/i.test(url.pathname)) return { type: 'file', url: url.href }
  } catch { /* O estado de pré-lançamento permanece disponível para links inválidos. */ }
  return null
}
