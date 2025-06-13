import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import './styles.css';

const Home: React.FC = () => {
  const sliderImages = [
    '/src/assets/images/escolinha1.png',
    '/src/assets/images/escolinha2.png',
    '/src/assets/images/escolinha3.png',
    '/src/assets/images/escolinha4.png',
    '/src/assets/images/escolinha5.png'
  ];

  return (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="hero-title-red">Escolinha </span>
              <span className="hero-title-blue">Nova </span>
              <span className="hero-title-yellow">Geração</span>
            </h1>
            <p className="hero-description">
              Uma iniciativa da ICNV Urucânia para abençoar nossa comunidade!
              Aqui, o futebol é ensinado com valores, disciplina e muito carinho.
              <br />
              Junte-se a nós e faça parte dessa transformação!
            </p>
            <div className="hero-buttons">
              <Link to="/inscricao" className="cta-button">
                Inscreva-se
              </Link>
              <Link to="/galeria" className="cta-button gallery-button">
                Ver Galeria
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <ImageSlider images={sliderImages} />
          </div>
        </div>
        <motion.button
          className="scroll-button"
          onClick={() => {
            const professoresSection = document.querySelector('.professores-section');
            if (professoresSection) {
              professoresSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span>Saiba mais</span>
          <svg 
            className="arrow" 
            viewBox="0 0 448 512" 
            fill="currentColor"
          >
            <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
          </svg>
        </motion.button>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="professores-section"
      >
        <div className="professores-container">
          <h2 className="professores-title">Professores</h2>

          <div className="professores-top">
            <motion.div
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ duration: 0.2 }}
              className="professor-card"
            >
              <div className="professor-photo">
                <img src="/src/assets/images/professores/tio-flavinho.png" alt="Tio Flavinho" />
              </div>
              <h3 className="professor-name">Tio Flavinho</h3>
              <p className="professor-role">TÉCNICO</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ duration: 0.2 }}
              className="professor-card"
            >
              <div className="professor-photo">
                <img src="/src/assets/images/professores/tio-alex.png" alt="Tio Alex" />
              </div>
              <h3 className="professor-name">Tio Alex</h3>
              <p className="professor-role">TÉCNICO</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ duration: 0.2 }}
              className="professor-card"
            >
              <div className="professor-photo">
                <img src="/src/assets/images/professores/tio-felipe.png" alt="Tio Felipe" />
              </div>
              <h3 className="professor-name">Tio Felipe</h3>
              <p className="professor-role">TÉCNICO</p>
            </motion.div>
          </div>
          <div className="professores-bottom">
            <motion.div
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ duration: 0.2 }}
              className="professor-card"
            >
              <div className="professor-photo">
                <img src="/src/assets/images/professores/tio-mauricio.png" alt="Tio Maurício" />
              </div>
              <h3 className="professor-name">Tio Maurício</h3>
              <p className="professor-role">TÉCNICO AUXILIAR</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ duration: 0.2 }}
              className="professor-card"
            >
              <div className="professor-photo">
                <img src="/src/assets/images/professores/tio-lucas.png" alt="Tio Lucas" />
              </div>
              <h3 className="professor-name">Tio Lucas</h3>
              <p className="professor-role">TÉCNICO AUXILIAR</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ duration: 0.2 }}
              className="professor-card"
            >
              <div className="professor-photo">
                <img src="/src/assets/images/professores/tio-ronaldo.png" alt="Tio Ronaldo" />
              </div>
              <h3 className="professor-name">Tio Ronaldo</h3>
              <p className="professor-role">PREPARADOR FÍSICO</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      { /*Como Participar Section*/}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="participacao-section">
        <div className="participacao-container">
          <div className="participacao-content">
            <h2 className="participacao-title">Como participar da Escolinha?</h2>
            <p className="participacao-description">
              A Escolinha Nova Geração é totalmente gratuita e aberta para crianças de 7 a 11 anos!
            </p>
            <div className="participacao-cards">
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.2 }}
                className="participacao-card">
                <h3 className="participacao-card-title">Lista de espera</h3>
                <p className="participacao-card-description">
                  Inscreva-se na <strong>lista de espera</strong> e aguarde o contato da nossa equipe quando houver vaga disponível!
                </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.2 }}
                className="participacao-card">
                <h3 className="participacao-card-title">Itens Pessoais</h3>
                <ul className="participacao-card-list">
                  <li>
                    <span>⚽   </span>Chuteira</li>
                  <li>
                    <span>💧   </span>Garrafa de água</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      { /*Informações Importantes Section*/}	
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="info-section">
        <div className="info-container">
          <div className="info-content">
            <h2 className="info-title">Informações Importantes</h2>
            <div className="info-cards">
              <motion.div 
                className="info-card"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}>
                <h3 className="info-card-title red">Idade</h3>
                <p className="info-card-text">7 a 11 anos</p>
              </motion.div>
              <motion.div 
                className="info-card"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}>
                <h3 className="info-card-title blue">Horário</h3>
                <p className="info-card-text">Segunda-feira, 18h às 19h30</p>
              </motion.div>
              <motion.div
                className="info-card"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}>
                <h3 className="info-card-title green">Local</h3>
                <p className="info-card-text">Campo de futebol da 27, R. Dinalva Oliveira Teixeira, 107-187 - Urucânia, Rio de Janeiro - RJ</p>
              </motion.div>
            </div>
            <div className="info-map">
              <iframe
                title="Mapa da Escolinha Nova Geração"
                src="https://www.google.com/maps?q=R.+Dinalva+Oliveira+Teixeira,+107-187+-+Paci%C3%AAncia,+Rio+de+Janeiro+-+RJ,+23573-405&z=17&output=embed"
                width="100%"
                height="500"
                className="info-map-iframe"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </motion.div>

      { /*Sobre a Igreja Section*/}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="about-section"
      >
        <div className="about-container">
          <div className="about-content">
            <h2 className="about-title">Conheça Nossa Igreja</h2>
            <p className="about-description">
              A Escolinha Nova Geração é uma iniciativa da Igreja Cristã Nova Vida de Urucânia,
              que busca impactar vidas através do esporte e dos valores cristãos.
            </p>
            <Link to="/sobre" className="about-button">
              Saiba mais sobre a ICNV
            </Link>
          </div>
        </div>
      </motion.div>

      { /*Vagas Section*/}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="vagas-section"
      >
        <div className="vagas-container">
          <div className="vagas-content">
            <h2 className="vagas-title">Vagas Limitadas!</h2>
            <p className="vagas-description">
              Garanta já sua vaga na Escolinha Nova Geração!
            </p>
            <Link to="/inscricao" className="vagas-button">
              Inscreva-se
            </Link>
          </div>
        </div>
      </motion.div>

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
    </>
  );
};

export default Home; 