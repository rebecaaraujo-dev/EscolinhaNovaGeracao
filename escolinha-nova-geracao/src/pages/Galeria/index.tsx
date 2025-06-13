import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaPlay, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import './styles.css';

const Galeria: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement }>({});
  const imageRef = useRef<HTMLImageElement>(null);

  const media = useMemo(() => [
    '/src/assets/images/galeria/galeria-1.jpg',
    '/src/assets/images/galeria/galeria-2.jpg',
    '/src/assets/images/galeria/galeria-3.jpg',
    '/src/assets/images/galeria/galeria-4.jpg',
    '/src/assets/images/galeria/galeria-5.jpg',
    '/src/assets/images/galeria/galeria-6.jpg',
    '/src/assets/images/galeria/galeria-7.jpg',
    '/src/assets/images/galeria/galeria-8.jpg',
    '/src/assets/images/galeria/galeria-9.jpg',
    '/src/assets/images/galeria/galeria-10.jpg',
    '/src/assets/images/galeria/galeria-11.jpg',
    '/src/assets/images/galeria/galeria-12.jpg',
    '/src/assets/images/galeria/galeria-vid-1.mp4',
    '/src/assets/images/galeria/galeria-vid-2.mp4',
    '/src/assets/images/galeria/galeria-vid-3.mp4',
    '/src/assets/images/galeria/galeria-vid-4.mp4',
    '/src/assets/images/galeria/galeria-vid-5.mp4',
    '/src/assets/images/galeria/galeria-vid-6.mp4',
    '/src/assets/images/galeria/galeria-vid-7.mp4',
    '/src/assets/images/galeria/galeria-vid-8.mp4',
  ], []);

  const isVideo = (url: string) => url.endsWith('.mp4');

  const handleMediaClick = (url: string) => {
    if (isVideo(url)) {
      setSelectedVideo(url);
    } else {
      setSelectedImage(url);
    }
  };

  const handleVideoRef = (url: string, element: HTMLVideoElement | null) => {
    if (element) {
      videoRefs.current[url] = element;
      // Configurar o vídeo para capturar o primeiro frame
      element.currentTime = 0.1;
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!selectedImage) return;

    const currentIndex = media.findIndex(url => url === selectedImage);
    if (currentIndex === -1) return;

    if (e.key === 'ArrowLeft') {
      const prevIndex = (currentIndex - 1 + media.length) % media.length;
      if (!isVideo(media[prevIndex])) {
        setSelectedImage(media[prevIndex]);
      }
    } else if (e.key === 'ArrowRight') {
      const nextIndex = (currentIndex + 1) % media.length;
      if (!isVideo(media[nextIndex])) {
        setSelectedImage(media[nextIndex]);
      }
    } else if (e.key === 'Escape') {
      setSelectedImage(null);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  const handlePrevImage = () => {
    if (!selectedImage) return;
    const currentIndex = media.findIndex(url => url === selectedImage);
    const prevIndex = (currentIndex - 1 + media.length) % media.length;
    if (!isVideo(media[prevIndex])) {
      setSelectedImage(media[prevIndex]);
    }
  };

  const handleNextImage = () => {
    if (!selectedImage) return;
    const currentIndex = media.findIndex(url => url === selectedImage);
    const nextIndex = (currentIndex + 1) % media.length;
    if (!isVideo(media[nextIndex])) {
      setSelectedImage(media[nextIndex]);
    }
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(!isZoomed);
  };

  const handleImageClose = () => {
    setSelectedImage(null);
    setIsZoomed(false);
  };

  return (
    <div className="galeria-container">
      <h1 className="galeria-title">
        <span className="galeria-title-red">Escolinha </span>
        <span className="galeria-title-blue">Nova </span>
        <span className="galeria-title-yellow">Geração</span>
      </h1>
      <p className="galeria-description">
        abençoando vidas através do esporte
      </p>
      <div className="galeria-grid">
        {media.map((url, index) => (
          <motion.div
            key={index}
            className="galeria-item"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            onClick={() => handleMediaClick(url)}
          >
            {isVideo(url) ? (
              <>
                <video 
                  ref={(el) => handleVideoRef(url, el)}
                  src={url} 
                  muted 
                  loop 
                  playsInline
                  preload="metadata"
                  className="galeria-video"
                />
                <div className="video-overlay">
                  <FaPlay className="play-icon" />
                </div>
              </>
            ) : (
              <img 
                src={url} 
                alt={`Foto ${index + 1} da Escolinha`} 
                loading="lazy"
                decoding="async"
              />
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="galeria-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleImageClose}
          >
            <motion.div 
              className={`modal-image-container ${isZoomed ? 'zoomed' : ''}`}
              onClick={handleImageClick}
            >
              <motion.img
                ref={imageRef}
                src={selectedImage}
                alt="Imagem em tela cheia"
                initial={{ scale: 0.9 }}
                animate={{ scale: isZoomed ? 1.5 : 1 }}
                exit={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
            <button
              className="galeria-close-button"
              onClick={handleImageClose}
              aria-label="Fechar imagem"
            >
              ×
            </button>
            <button
              className="galeria-nav-button galeria-nav-prev"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
                setIsZoomed(false);
              }}
              aria-label="Imagem anterior"
            >
              <FaChevronLeft />
            </button>
            <button
              className="galeria-nav-button galeria-nav-next"
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
                setIsZoomed(false);
              }}
              aria-label="Próxima imagem"
            >
              <FaChevronRight />
            </button>
          </motion.div>
        )}

        {selectedVideo && (
          <motion.div
            className="galeria-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
          >
            <motion.video
              src={selectedVideo}
              controls
              autoPlay
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            />
            <button
              className="galeria-close-button"
              onClick={() => setSelectedVideo(null)}
              aria-label="Fechar vídeo"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className='back-button-container'>
        <Link to="/" className="back-button">
          ← Voltar para a Página Inicial
        </Link>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-top">
            <motion.div
              className="footer-content"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.p
                className="footer-text"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                "Tudo o que fizerem, façam de todo o coração, como para o Senhor, não para os homens, sabendo que receberão do Senhor a recompensa da herança, pois é a Cristo, o Senhor, a quem vocês servem."
              </motion.p>
              <motion.p
                className="footer-verse"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Colossenses 3:23-24
              </motion.p>
            </motion.div>

            <motion.div
              className="footer-redes-sociais"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.h2
                className="footer-redes-sociais-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Nos siga nas redes sociais
              </motion.h2>
              <motion.div
                className="footer-redes-sociais-container"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.a
                  href="https://www.instagram.com/icnvurucania"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-redes-sociais-link"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaInstagram className="footer-redes-sociais-icon" />
                </motion.a>
                <motion.a
                  href="https://www.facebook.com/profile.php?id=61558428248906"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-redes-sociais-link"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaFacebook className="footer-redes-sociais-icon" />
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="footer-bottom"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="footer-copyright">
              © 2025 Escolinha Nova Geração, ICNV Urucânia. Todos os direitos reservados.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Galeria; 