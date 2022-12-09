import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  game: Game
}

export const GameBanner = ({ game }: Props) => {
  const navigate = useNavigate()
  const [slug, setSlug] = useState<string>()

  const convertToSlug = (str: string) => {
    return encodeURI(str.replaceAll(' ', '%25').toLowerCase().replace('/', '-'))
  }

  useEffect(() => {
    setSlug(convertToSlug(game.title))
  }, [game])

  return (
    <a
      onClick={() => navigate(`/ad/${slug}`)}
      className={styles.anchorCardContainer}
    >
      <img
        src={game.bannerUrl}
        alt={`game/${game.title}`}
        className={styles.img}
      />
      <div className={styles.infoOfCardWithOverlay}>
        <strong className={styles.gameTitle}>{game.title}</strong>
        <span className={styles.adsQuantity}>{game._count.ads} Anúncio(s)</span>
      </div>
    </a>
  )
}

// className="object-fill"

const styles = {
  anchorCardContainer: `relative h-full cursor-pointer max-h-[280px] rounded-lg overflow-hidden`,
  img: `w-full h-full object-fill`,
  infoOfCardWithOverlay: `w-full pt-16 pb-4 px-4 absolute bottom-0 inset-x-0 bg-gradient-to-b from-black/0 via-black/60 to-black/90`,
  gameTitle: `font-bold text-white block`,
  adsQuantity: `text-zinc-300 text-sm block`,
}
