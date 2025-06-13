import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import './styles.css';

const Success: React.FC = () => {
  const scrollToInfo = () => {
    const infoSection = document.querySelector('.success-info-section');
    if (infoSection) {
      infoSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="success-page">
      <motion.div
        className="success-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="success-container">
          <div className="success-content">
            <h1 className="success-title">
              🎉 Inscrição realizada com sucesso!
            </h1>

            <p className="success-message">
              Estamos ansiosos para te ver em campo!
              <br />
              No momento, as vagas estão esgotadas e a criança foi incluída na <strong>lista de espera</strong>.
              Aguarde nosso contato para saber quando poderá iniciar as aulas.
              <br />
              Prepare-se para aprender, crescer e se divertir muito em breve! ⚽💙
            </p>

            <div className="mais-info">
              <span className="mais-info-text">
                Mais informações
              </span>
              <motion.div
                onClick={scrollToInfo}
                whileHover={{ y: 5 }}
                className="scroll-button-success"
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="scroll-arrow-success"
                >
                  ↓
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/*Info Section*/}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="success-info-section"
      >
        <div className="success-info-content">
          <div className="success-info-top">
            <h2 className="success-info-title">Informações Importantes</h2>
          </div>
          <div className="success-info-bottom"><div className="success-info-cards">
            <motion.div
              className="success-info-card"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="success-info-card-title">Itens Pessoais</h3>
              <ul className="success-info-card-text">
                <li><span>⚽   </span>Chuteira</li>
                <li><span>💧   </span>Garrafa de água</li>
              </ul>
            </motion.div>
            <motion.div
              className="success-info-card"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="success-info-card-title">Horário</h3>
              <p className="success-info-card-text">Segunda-feira, 18h às 19h30</p>
            </motion.div>
            <motion.div
              className="success-info-card"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="success-info-card-title">Local</h3>
              <p className="success-info-card-text">Campo de futebol da 27
                <br />
                R. Dinalva Oliveira Teixeira, 107-187 - Paciência (Conjunto Urucânia), RJ / CEP: 23573-405</p>
            </motion.div>
          </div>
            <div className="success-info-map">
              <iframe
                title="Mapa da Escolinha Nova Geração"
                src="https://www.google.com/maps?q=R.+Dinalva+Oliveira+Teixeira,+107-187+-+Paci%C3%AAncia,+Rio+de+Janeiro+-+RJ,+23573-405&z=17&output=embed"
                className="success-info-map-iframe"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
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

export default Success; 