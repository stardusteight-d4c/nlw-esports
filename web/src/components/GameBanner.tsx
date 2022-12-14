import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  game: Game
}

export const GameBanner = ({ game }: Props) => {
  const navigate = useNavigate()
  const [slug, setSlug] = useState<string>()

  const convertToSlug = (str: string) => {
    return str.replaceAll(' ', '$25').toLowerCase().replace('/', '$10')
  }

  useEffect(() => {
    setSlug(convertToSlug(game.title))
  }, [game])

  return (
    <a
      onClick={() => navigate(`/ads/${slug}`)}
      className={style.anchorCardContainer}
    >
      <img
        src={game.bannerUrl}
        alt={`game/${game.title}`}
        className={style.img}
      />
      <div className={style.infoOfCardWithOverlay}>
        <strong className={style.gameTitle}>{game.title}</strong>
        <span className={style.adsQuantity}>{game._count.ads} Anúncio(s)</span>
      </div>
    </a>
  )
}

const style = {
  anchorCardContainer: `relative cursor-pointer min-h-[200px] max-h-[200px] md:min-h-[280px] md:max-h-[280px] rounded-lg overflow-hidden`,
  img: `w-full h-full object-fill`,
  infoOfCardWithOverlay: `w-full pt-16 pb-4 px-4 absolute bottom-0 inset-x-0 bg-gradient-to-b from-black/0 via-black/60 to-black/90`,
  gameTitle: `font-bold text-white block line-clamp-2 text-xs md:text-base`,
  adsQuantity: `text-zinc-300 text-sm block`,
}
