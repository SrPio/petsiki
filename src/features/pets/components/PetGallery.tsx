import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { photoUrl } from '@/lib/images'
import { springSuave } from '@/lib/motion'

type PetGalleryProps = { photos: string[]; name: string }

const SWIPE_THRESHOLD = 60

export function PetGallery({ photos, name }: PetGalleryProps) {
  const [[index, direction], setState] = useState<[number, number]>([0, 0])
  const reduced = useReducedMotion()
  const many = photos.length > 1

  const go = (step: number) => setState(([i]) => [(i + step + photos.length) % photos.length, step])

  function onDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -SWIPE_THRESHOLD) go(1)
    else if (info.offset.x > SWIPE_THRESHOLD) go(-1)
  }

  const shift = reduced ? 0 : 60

  return (
    <div className="flex flex-col gap-3">
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-placa bg-lavanda shadow-suave ring-1 ring-linea/70 md:aspect-[5/4]"
        role="group"
        aria-roledescription="galería"
        aria-label={`Fotos de ${name}`}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={index}
            src={photoUrl(photos[index], 1200)}
            alt={`${name}, foto ${index + 1} de ${photos.length}`}
            custom={direction}
            initial={{ opacity: 0, x: direction * shift, scale: reduced ? 1 : 1.02 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction * -shift }}
            transition={springSuave}
            drag={many ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={onDragEnd}
            draggable={false}
            className={cn(
              'absolute inset-0 size-full object-cover',
              many && 'cursor-grab active:cursor-grabbing',
            )}
          />
        </AnimatePresence>

        {many && (
          <>
            <GalleryArrow side="left" onClick={() => go(-1)} />
            <GalleryArrow side="right" onClick={() => go(1)} />
            <div className="absolute inset-x-0 bottom-4 flex justify-center gap-1.5" aria-hidden>
              {photos.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    'h-2 rounded-full bg-white shadow transition-all duration-300',
                    i === index ? 'w-6' : 'w-2 opacity-60',
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {many && (
        <ul className="flex gap-3" aria-label="Elegir foto">
          {photos.map((photo, i) => (
            <li key={photo}>
              <button
                type="button"
                onClick={() => setState([i, i > index ? 1 : -1])}
                aria-label={`Ver foto ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  'block size-20 overflow-hidden rounded-2xl ring-2 transition-all duration-200',
                  i === index ? 'ring-ciruela' : 'opacity-70 ring-transparent hover:opacity-100',
                )}
              >
                <img src={photoUrl(photo, 200)} alt="" className="size-full object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function GalleryArrow({ side, onClick }: { side: 'left' | 'right'; onClick: () => void }) {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === 'left' ? 'Foto anterior' : 'Foto siguiente'}
      className={cn(
        'absolute top-1/2 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-tinta shadow-suave backdrop-blur transition hover:bg-white md:grid',
        side === 'left' ? 'left-4' : 'right-4',
      )}
    >
      <Icon className="size-5" />
    </button>
  )
}
