import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa';
import './styles.css';
import familiaPastoral from '../../assets/images/sobre/familia-pastoral-1.jpg';
import ImageSlider from '../../components/ImageSlider/ImageSlider';

// Import ICNV images
import icnv1 from '../../assets/images/sobre/icnv-1.png';
import icnv2 from '../../assets/images/sobre/icnv-2.png';
import icnv3 from '../../assets/images/sobre/icnv-3.png';
import icnv4 from '../../assets/images/sobre/icnv-4.png';
import icnv5 from '../../assets/images/sobre/icnv-5.png';
import icnv6 from '../../assets/images/sobre/icnv-6.png';
import icnv7 from '../../assets/images/sobre/icnv-7.png';

export default function Sobre() {
  const scrollToHistoria = () => {
    const historiaSection = document.querySelector('.sobre-nossa-historia-section');
    if (historiaSection) {
      historiaSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const sliderImages = [
    icnv1,
    icnv2,
    icnv3,
    icnv4,
    icnv5,
    icnv6,
    icnv7
  ];

  useEffect(() => {
    document.body.classList.add("sobre-body");

    return () => {
      document.body.classList.remove("sobre-body");
    };
  }, []);

  return (
    <div className="sobre-container">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="sobre-container"
      >
        <div className="sobre-hero-section">
          <div className="sobre-hero-content">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="sobre-hero-title"
            >
              ICNV URUCÂNIA
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="sobre-hero-subtitle"
            >
              Uma comunidade de discípulos que formam discípulos
            </motion.p>
          </div>
          <motion.button
            className="scroll-button-sobre"
            onClick={scrollToHistoria}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            aria-label="Rolar para seção Nossa História"
          >
            <span>Saiba mais</span>
            <FaChevronDown className="arrow" />
          </motion.button>
        </div>

        {/* Nossa História */}
        <div className="sobre-nossa-historia-section">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="sobre-nossa-historia-content"
          >
            <div className='sobre-nossa-historia-text'>
              <h2 className="sobre-nossa-historia-heading">Nossa História</h2>
              <p className="sobre-nossa-historia-description">
                A Igreja Cristã Nova Vida de Urucânia surgiu há 19 anos, a partir do desejo de levar a Palavra de Deus à nossa comunidade.
                Tudo começou quando um membro da ICNV de Paciência compartilhou com o Pr. Evandro a necessidade de uma congregação em Urucânia.
                Sensível à direção de Deus, o pastor atendeu ao chamado e, desde então, temos sido um ponto de luz e esperança neste lugar.
              </p>
            </div>
          </motion.div>
          <div className="sobre-nossa-historia-image">
            <ImageSlider images={sliderImages} />
          </div>
        </div>

        {/* Pastor e Família */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="sobre-pastor-section"
        >
          <div className="sobre-pastor-container">
            <div className="sobre-pastor-image-container">
              <img
                src={familiaPastoral}
                alt="Família Pastoral"
                className="sobre-pastor-image"
              />
            </div>
            <div className="sobre-pastor-content">
              <h2 className="sobre-pastor-heading">Nosso Pastor e Família</h2>
              <p className="sobre-pastor-text">
                A liderança da Igreja Cristã Nova Vida de Urucânia está sob os cuidados do Pr. Jeremias Fernandes, que foi consagrado ao ministério pastoral em 2011.
                Desde então, tem conduzido a igreja com fé, dedicação e sensibilidade à direção de Deus.
                Ao seu lado está sua esposa, irmã Lídia Lopes, uma mulher de oração e apoio constante na obra do Senhor.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Horários */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="sobre-horarios"
        >
          <h2 className="sobre-horarios-heading">Nossos Encontros</h2>
          <div className="sobre-horarios-container">
            <div>
              <p className="sobre-horarios-item">
                <strong>Domingos:</strong>
                9h00 Culto de Oração<br />
                10h00 Escola Bíblica Dominical<br />
                19h00 Culto de Louvor e Adoração
              </p>
            </div>

            <div>
              <p className="sobre-horarios-item">
                <strong>Terça-feira: </strong>
                19h30 Oração das Mulheres
              </p>
            </div>

            <div>
              <p className="sobre-horarios-item">
                <strong>Quarta-feira: </strong>
                19h30 Culto de Louvor e Adoração
              </p>
            </div>

            <div>
              <p className="sobre-horarios-item">
                <strong>Sexta-feira: </strong>
                20h00 Oração dos Homens (a cada 15 dias)
              </p>
            </div>

            <div>
              <p className="sobre-horarios-item">
                <strong>Sábado: </strong>
                Encontros do Geração Ação (Jovens e adolescentes)
              </p>
            </div>
          </div>
        </motion.div>

        <motion.section
          className="visita-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="visita-heading">Venha fazer uma visita!</h2>
          <p className="visita-text">
            Estamos de portas abertas para receber você e sua família.<br />
            Venha fazer parte da família da fé!
          </p>
        </motion.section>

        {/* Feed Instagram
        <section className="instagram-section">
          <div className="instagram-container">
            <p className="instagram-subtitle">
              Veja fotos, vídeos e atualizações da ICNV em Urucânia
            </p>
            <div className="instagram-widget">
              <iframe
                src="//lightwidget.com/widgets/2c249ce7fead5270a45fe2226214411b.html"
                scrolling="no"
                allowTransparency={true}
                className="lightwidget-widget"
              />
            </div>
          </div>
        </section>
        */}

        {/* Localização */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="sobre-localizacao"
        >
          <div className="sobre-localizacao-content">
            <h2 className="sobre-localizacao-heading">Saiba como chegar:</h2>
            <p className="sobre-localizacao-text">
              <strong>Rua: </strong>R. José Silton Pinheiro<br />
              <strong>Número: </strong>141, CASA 01 <br />
              <strong>Bairro: </strong>Paciência (Conjunto Urucânia), RJ<br />
              <strong>CEP: </strong>23573-340
            </p>
            <br />
            <p className="sobre-localizacao-text">
              Esperamos ansiosamente sua visita <span>🤍</span>
              <br />
              Venha ouvir boas novas!
            </p>
          </div>
          <div className="sobre-localizacao-map">
            <iframe
              title="Mapa da ICNV Urucânia"
              src="https://www.google.com/maps?q=R.+Jos%C3%A9+Silton+Pinheiro,+141+-+CASA+01+-+Paci%C3%AAncia,+Rio+de+Janeiro+-+RJ,+23573-340&z=17&output=embed"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>

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
                  "Mas Deus demonstra seu amor por nós: Cristo morreu em nosso favor quando ainda éramos pecadores."
                </motion.p>
                <motion.p
                  className="footer-verse"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Romanos 5:8
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
      </motion.div>
    </div>
  );
}