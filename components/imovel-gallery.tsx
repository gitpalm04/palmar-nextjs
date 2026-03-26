'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, X, Expand } from 'lucide-react'
import { ImovelImagem } from '@/lib/db'

interface ImovelGalleryProps {
  imagens: ImovelImagem[]
  titulo: string
}

export function ImovelGallery({ imagens, titulo }: ImovelGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  if (!imagens.length) {
    return (
      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
        <span className="text-muted-foreground">Sem imagens disponíveis</span>
      </div>
    )
  }

  const currentImage = imagens[selectedIndex]

  const goToNext = () => {
    setSelectedIndex((prev) => (prev + 1) % imagens.length)
  }

  const goToPrev = () => {
    setSelectedIndex((prev) => (prev - 1 + imagens.length) % imagens.length)
  }

  return (
    <>
      <div className="space-y-4">
        {/* Imagem Principal */}
        <div className="relative aspect-[16/9] rounded-lg overflow-hidden group">
          <Image
            src={currentImage.url}
            alt={currentImage.alt || titulo}
            fill
            className="object-cover"
            priority
          />
          
          {/* Controles */}
          {imagens.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={goToPrev}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={goToNext}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}
          
          {/* Botão de expandir */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => setLightboxOpen(true)}
          >
            <Expand className="h-4 w-4" />
          </Button>

          {/* Contador */}
          {imagens.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-foreground/80 text-background px-3 py-1 rounded-full text-sm">
              {selectedIndex + 1} / {imagens.length}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {imagens.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {imagens.map((img, index) => (
              <button
                key={img.id}
                onClick={() => setSelectedIndex(index)}
                className={`relative shrink-0 w-20 h-20 rounded-md overflow-hidden transition-all ${
                  index === selectedIndex
                    ? 'ring-2 ring-primary ring-offset-2'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.alt || `${titulo} - Imagem ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-foreground/95">
          <div className="relative w-full h-[90vh]">
            <Image
              src={currentImage.url}
              alt={currentImage.alt || titulo}
              fill
              className="object-contain"
            />
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-background hover:bg-background/20"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>

            {imagens.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-background hover:bg-background/20 h-12 w-12"
                  onClick={goToPrev}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-background hover:bg-background/20 h-12 w-12"
                  onClick={goToNext}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 text-foreground px-4 py-2 rounded-full">
              {selectedIndex + 1} / {imagens.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
