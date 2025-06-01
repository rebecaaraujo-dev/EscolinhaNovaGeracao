import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import criancasFutebol from './assets/criancas-futebol.jpg'; // Removendo a importação da imagem antiga
import bgFutebol from './assets/bg-futebol.jpg';
import coroa from './assets/coroa-espinhos.jpg';
import familiaPastoral from './assets/familia-pastoral.jpg';
import { motion } from 'framer-motion';
import { useState } from 'react';
import React from 'react';
import { supabase } from './supabaseClient';

const COLORS = {
  red: '#d00000',
  darkRed: '#9a0000',
  yellow: '#ffba08',
  blue: '#4e87d1',
  darkBlue: '#162c48',
  green: '#54775c',
  white: '#ffffff',
  black: '#00121c',
  lightBlack: 'rgb(75, 75, 75)',
  lightGray: '#f8f9fa',
  lightGrayTranslucent: 'rgba(248, 249, 250, 0.93)',
  blueTranslucent: 'rgba(78,135,209, 0.83)',
  yellowTranslucent: 'rgba(255, 186, 8, 0.83)',
  greenTranslucent: 'rgba(84, 119, 92, 0.83)',
};

// Add Google Font
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Barriecito&family=Open+Sans:wght@300;400&family=Roboto:wght@400;500;700&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

// Add global styles
const globalStyle = document.createElement('style');
globalStyle.textContent = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body, #root {
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
  }

  #root {
    display: flex;
    flex-direction: column;
  }

  .sobre-text {
    font-family: 'Open Sans', sans-serif;
    font-weight: 300;
  }

  .sobre-text strong {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
  }

  .sobre-heading {
    font-family: 'Roboto', sans-serif;
  }

  .button-hover:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px 0 ${COLORS.red}33;
  }

  .link-hover:hover {
    background: #d3d9df;
  }

  @media (max-width: 768px) {
    form > div:last-child {
      position: static !important;
      flex-direction: column-reverse !important;
      gap: 20px !important;
      margin-top: 30px !important;
    }
    form > div:last-child a,
    form > div:last-child button {
      width: 100% !important;
      text-align: center !important;
    }
  }
`;
document.head.appendChild(globalStyle);

const globalStyles = {
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 24px',
    width: '100%',
  },
  button: {
    display: 'inline-block',
    padding: '16px 32px',
    background: COLORS.red,
    color: COLORS.white,
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: 700,
    fontSize: '1.5rem',
    boxShadow: `0 4px 12px 0 ${COLORS.red}22`,
    transition: 'all 0.3s ease',
    border: 'none',
    cursor: 'pointer',
  },
  buttonHover: {
    transform: 'translateY(-2px)',
    boxShadow: `0 6px 16px 0 ${COLORS.red}33`,
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '1rem',
    boxSizing: 'border-box' as const,
    backgroundColor: COLORS.lightGray,
    cursor: 'pointer',
    outline: 'none',
    color: `${COLORS.darkBlue}`,
  },
  h2: {
    color: `${COLORS.black}`,
    fontSize: '2.25rem',
    fontWeight: '700',
    marginBottom: '32px',
    textAlign: 'center' as const,
  },
  h3: {    
    color:`${COLORS.black}`, 
    marginBottom: '.5rem', 
    fontSize: '1.3rem',
    fontWeight: '800',
  }
};

function Landing() {
  return (
    <div style={{
      minHeight: '410vh',
      width: '100%',
      margin: 0,
      padding: 0,
      overflowX: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      backgroundImage: `url(${bgFutebol})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'repeat',
    }}>
      {/* Hero Section */}
      <div
        className="hero-section"
        style={{
          background: COLORS.darkBlue,
          padding: '5rem',
          width: '100%',
          flex: 1,
        }}>
        <div style={{
          ...globalStyles.container,
          width: '100%',
          maxWidth: '100%',
          padding: '0 2rem',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 64,
            flexWrap: 'wrap',
            width: '100%',
          }}>
            <div style={{ flex: 1, minWidth: 300 }}>
              <h1 style={{
                fontWeight: 800,
                fontSize: '4rem',
                lineHeight: 1.2,
                marginBottom: 24,
                fontFamily: 'Barriecito, cursive',
              }}>
                <span style={{ color: COLORS.red }}>Escolinha</span>{' '}
                <span style={{ color: COLORS.blue }}>Nova</span>{' '}
                <span style={{ color: COLORS.yellow }}>Geração</span>
              </h1>
              <p style={{
                color: COLORS.white,
                fontWeight: 500,
                fontSize: '1.25rem',
                lineHeight: 1.6,
                marginBottom: 32,
              }}>
                Uma iniciativa da ICNV Urucânia para abençoar nossa comunidade!
                Aqui, o futebol é ensinado com valores, disciplina e muito carinho.
                <br />
                Junte-se a nós e faça parte dessa transformação!
              </p>
              <Link
                to="/inscricao"
                style={{
                  ...globalStyles.button,
                  background: COLORS.red,
                  color: COLORS.white,
                  padding: '20px 40px',
                  boxShadow: `0 6px 16px ${COLORS.red}33`,
                }}
                className="button-hover">
                <div
                  style={{ display: 'inline-block' }}
                >
                  Inscreva-se
                </div>
              </Link>
            </div>
            <div style={{ flex: 1, minWidth: 300, display: 'flex', justifyContent: 'center' }}>
              <img
                src={'https://cdn-eyr-optimised.b-cdn.net/wp-content/uploads/2023/03/blog-inserts-2023-03-03T111016.685.png'}
                alt="Imagem de fundo de futebol"
                style={{
                  maxWidth: '100%',
                  borderRadius: '20px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  aspectRatio: '16/9',
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Professores Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          padding: '60px 0 40px 0',
          width: '100%',
        }}>
        <div style={{
          ...globalStyles.container,
          width: '100%',
          maxWidth: '100%',
          padding: '0 2rem',
        }}>
          <h2 style={{
            ...globalStyles.h2,
          }}>
            Professores
          </h2>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 32,
            justifyContent: 'center',
          }}>
            <motion.div
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ duration: 0.2 }}
              style={{ background: COLORS.lightGrayTranslucent, borderRadius: 16, padding: 24, minWidth: 220, maxWidth: 300, boxShadow: '0 2px 8px #0001', textAlign: 'center' }}>
              <h3 style={{ color: COLORS.red, fontSize: '1.25rem' }}>Tio Flavinho</h3>
              <p style={{ color: COLORS.darkBlue, fontWeight: 600, marginBottom: 15, fontSize: '.9rem' }}>PROFESSOR PRINCIPAL</p>
              <p style={{ color: COLORS.darkBlue, fontSize: '1rem' }}>Responsável técnico e pedagógico, com experiência em ensino de futebol para crianças.</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ duration: 0.2 }}
              style={{ background: COLORS.lightGrayTranslucent, borderRadius: 16, padding: 24, minWidth: 220, maxWidth: 300, boxShadow: '0 2px 8px #0001', textAlign: 'center' }}>
              <h3 style={{ color: COLORS.red, fontSize: '1.25rem' }}>Tio Alex</h3>
              <p style={{ color: COLORS.darkBlue, fontWeight: 600, marginBottom: 15, fontSize: '.9rem' }}>INSTRUTOR</p>
              <p style={{ color: COLORS.darkBlue, fontSize: '1rem' }}>Auxilia nos treinos e acompanhamento das crianças em campo.</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ duration: 0.2 }}
              style={{ background: COLORS.lightGrayTranslucent, borderRadius: 16, padding: 24, minWidth: 220, maxWidth: 300, boxShadow: '0 2px 8px #0001', textAlign: 'center' }}>
              <h3 style={{ color: COLORS.red, fontSize: '1.25rem' }}>Tio Lucas</h3>
              <p style={{ color: COLORS.darkBlue, fontWeight: 600, marginBottom: 15, fontSize: '.9rem' }}>INSTRUTOR</p>
              <p style={{ color: COLORS.darkBlue, fontSize: '1rem' }}>Apoio nos treinos e incentivo ao desenvolvimento esportivo e social.</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          padding: '60px 0',
          width: '100%',
        }}>
        <div style={{
          ...globalStyles.container,
          width: '100%',
          maxWidth: '100%',
          padding: '0 2rem',
        }}>
          <div style={{
            background: COLORS.blueTranslucent,
            borderRadius: '20px',
            padding: '48px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            width: '100%',
          }}>
            <h2 style={{
              ...globalStyles.h2,
              color: COLORS.white,
              marginBottom: '0px',
            }}>
              Informações Importantes
            </h2>
            <div className='informacoes'>
              <motion.div 
                className='card-professores'
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                style={{ background: COLORS.lightGrayTranslucent }}>
                <h3 style={{ color: COLORS.red, marginBottom: 12, fontSize: '1.35rem' }}>Idade</h3>
                <p style={{ color: COLORS.darkBlue, fontSize: '1rem' }}>7 a 11 anos</p>
              </motion.div>
              <motion.div 
                className='card-professores'
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                style={{ background: COLORS.lightGrayTranslucent }}>
                <h3 style={{ color: COLORS.blue, marginBottom: 12, fontSize: '1.35rem' }}>Horário</h3>
                <p style={{ color: COLORS.darkBlue, fontSize: '1rem' }}>Segunda-feira, 18h às 19h30</p>
              </motion.div>
              <motion.div
                className='card-professores'
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                style={{ background: COLORS.lightGrayTranslucent }}>
                <h3 style={{ color: COLORS.green, marginBottom: 12, fontSize: '1.35rem' }}>Local</h3>
                <p style={{ color: COLORS.darkBlue, fontSize: '1rem' }}>Campo de futebol da 27, R. Dinalva Oliveira Teixeira, 107-187 - Urucânia, Rio de Janeiro - RJ</p>
              </motion.div>
            </div>
            <div className='mapa'>
              <iframe
                title="Mapa da Escolinha Nova Geração"
                src="https://www.google.com/maps?q=R.+Dinalva+Oliveira+Teixeira,+107-187+-+Paci%C3%AAncia,+Rio+de+Janeiro+-+RJ,+23573-405&z=17&output=embed"
                width="100%"
                height="500"
                style={{
                  border: 0,
                  borderRadius: '16px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* New About Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              background: COLORS.lightGrayTranslucent,
              borderRadius: '20px',
              padding: '48px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
              width: '100%',
              marginTop: '40px',
              textAlign: 'center',
            }}>
            <h2 style={{
              ...globalStyles.h2,
              marginBottom: '1.5rem',
            }}>
              Conheça Nossa Igreja
            </h2>
            <p style={{
              color: COLORS.darkBlue,
              fontSize: '1.2rem',
              lineHeight: 1.6,
              marginBottom: '2rem',
              maxWidth: '800px',
              margin: '0 auto 2rem auto',
            }}>
              A Escolinha Nova Geração é uma iniciativa da Igreja Cristã Nova Vida de Urucânia,
              que busca impactar vidas através do esporte e dos valores cristãos.
            </p>
            <Link
              to="/sobre"
              style={{
                ...globalStyles.button,
                backgroundColor: COLORS.blue,
                display: 'inline-block',
                padding: '16px 32px',
                fontSize: '1.2rem',
              }}>
              Saiba mais sobre a ICNV
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Vagas Limitadas Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          padding: '60px 0',
          width: '100%',
        }}>
        <div style={{
          ...globalStyles.container,
          width: '100%',
          maxWidth: '100%',
          padding: '0 2rem',
        }}>
          <div style={{
            background: 'rgba(255, 186, 8, 0.8)',
            borderRadius: '20px',
            padding: '48px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            width: '100%',
            textAlign: 'center',
          }}>
            <h2 style={{
              ...globalStyles.h2,
            }}>
              Vagas Limitadas!
            </h2>
            <p style={{
              color: COLORS.darkBlue,
              fontSize: '1.25rem',
              fontWeight: 500,
              marginBottom: 32,
              maxWidth: '700px',
              margin: '0 auto 32px auto',
            }}>
              Garanta já sua vaga na Escolinha Nova Geração!
            </p>
            <Link
              to="/inscricao"
              style={{
                ...globalStyles.button,
                background: COLORS.red,
                color: COLORS.white,
                padding: '20px 40px',
                boxShadow: `0 6px 16px ${COLORS.red}33`,
              }}
              className="button-hover">
              <div
                style={{ display: 'inline-block' }}
              >
                Inscreva-se
              </div>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer style={{
        background: COLORS.darkBlue,
        color: COLORS.white,
        padding: '40px 0',
        textAlign: 'center',
        width: '100%',
      }}>
        <div style={{
          ...globalStyles.container,
          width: '100%',
          maxWidth: '100%',
          padding: '0 2rem',
        }}>
          <p style={{ margin: 0, fontSize: '1.25rem', fontStyle: 'italic', marginBottom: 5 }}>"Tudo o que fizerem, façam de todo o coração, como para o Senhor, não para os homens, sabendo que receberão do Senhor a recompensa da herança, pois é a Cristo, o Senhor, a quem vocês servem."</p>
          <p style={{ margin: 0, fontSize: '1.1rem', marginBottom: 50 }}>Colossenses 3:23-24</p>
          <p style={{ margin: 0 }}>© 2024 Escolinha Nova Geração, ICNV Urucânia. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

function Inscricao() {
  const navigate = useNavigate();
  const [studentFirstName, setStudentFirstName] = useState('');
  const [studentLastName, setStudentLastName] = useState('');
  const [studentAge, setStudentAge] = useState('');
  const [guardianFirstName, setGuardianFirstName] = useState('');
  const [guardianLastName, setGuardianLastName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [sameAddress, setSameAddress] = useState(true);
  const [studentAddress, setStudentAddress] = useState({
    street: '', number: '', complement: '', neighborhood: ''
  });
  const [guardianAddress, setGuardianAddress] = useState({
    street: '', number: '', complement: '', neighborhood: ''
  });

  const handleAddressChange = (type: 'student' | 'guardian', field: keyof typeof studentAddress, value: string) => {
    if (type === 'student') {
      setStudentAddress(prev => ({ ...prev, [field]: value }));
    } else if (type === 'guardian') {
      setGuardianAddress(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSameAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSameAddress(event.target.value === 'sim');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { error } = await supabase
        .from('inscricoes')
        .insert([
          {
            nome_aluno: studentFirstName,
            sobrenome_aluno: studentLastName,
            idade_aluno: parseInt(studentAge),
            nome_responsavel: guardianFirstName,
            sobrenome_responsavel: guardianLastName,
            whatsapp: whatsapp,
            mesmo_endereco: sameAddress,
            endereco_aluno_rua: studentAddress.street,
            endereco_aluno_numero: studentAddress.number,
            endereco_aluno_complemento: studentAddress.complement,
            endereco_aluno_bairro: studentAddress.neighborhood,
            endereco_responsavel_rua: sameAddress ? null : guardianAddress.street,
            endereco_responsavel_numero: sameAddress ? null : guardianAddress.number,
            endereco_responsavel_complemento: sameAddress ? null : guardianAddress.complement,
            endereco_responsavel_bairro: sameAddress ? null : guardianAddress.neighborhood,
          }
        ]);

      if (error) throw error;

      // Reset form
      setStudentFirstName('');
      setStudentLastName('');
      setStudentAge('');
      setGuardianFirstName('');
      setGuardianLastName('');
      setWhatsapp('');
      setSameAddress(true);
      setStudentAddress({ street: '', number: '', complement: '', neighborhood: '' });
      setGuardianAddress({ street: '', number: '', complement: '', neighborhood: '' });

      // Redirect to success page
      navigate('/sucesso');

    } catch (error) {
      console.error('Erro ao enviar inscrição:', error);
      alert('Erro ao enviar inscrição. Por favor, tente novamente.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: '100vh',
        width: '100%',
        margin: 0,
        padding: '60px 20px',
        backgroundImage: `url(${bgFutebol})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
      }}>
      <h1 style={{
        color: COLORS.black,
        fontSize: '2.5rem',
        fontWeight: 700,
        marginBottom: '20px',
        textAlign: 'center',
      }}>Formulário de Inscrição</h1>
      <p style={{
        color: COLORS.black,
        fontSize: '1rem',
        marginBottom: '30px',
        textAlign: 'center',
      }}>
        Preencha os dados abaixo para inscrever o aluno na Escolinha Nova Geração.
      </p>

      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        maxWidth: '800px',
        margin: '0 auto',
        position: 'relative',
        paddingBottom: '80px',
      }}>
        {/* Seção do Aluno */}
        <div style={{
          background: COLORS.blueTranslucent,
          padding: '30px',
          borderRadius: '15px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        }}>
          <h2 style={{
            ...globalStyles.h2,
            color: COLORS.white,
            fontSize: '1.8rem',
            marginBottom: '20px',
          }}>Dados do Aluno</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', color: COLORS.white, fontWeight: 600, marginBottom: '8px' }} htmlFor="studentFirstName">Nome:</label>
                <input
                  type="text"
                  id="studentFirstName"
                  value={studentFirstName}
                  onChange={(e) => setStudentFirstName(e.target.value)}
                  placeholder='Nome'
                  required
                  style={{
                    ...globalStyles.input,
                    border: `1px solid ${COLORS.blue}`,
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', color: COLORS.white, fontWeight: 600, marginBottom: '8px' }} htmlFor="studentLastName">Sobrenome:</label>
                <input
                  type="text"
                  id="studentLastName"
                  value={studentLastName}
                  onChange={(e) => setStudentLastName(e.target.value)}
                  placeholder='Sobrenome'
                  required
                  style={{
                    ...globalStyles.input,
                    border: `1px solid ${COLORS.blue}`,
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', color: COLORS.white, fontWeight: 600, marginBottom: '8px' }} htmlFor="studentAge">Idade (7 a 11 anos):</label>
              <select
                id="studentAge"
                value={studentAge}
                onChange={(e) => setStudentAge(e.target.value)}
                required
                style={{
                  ...globalStyles.input,
                  border: `1px solid ${COLORS.blue}`,
                  color: studentAge === '' ? '#aaa' : COLORS.darkBlue,
                  cursor: 'pointer',
                }}
              >
                <option value="">Selecione a idade</option>
                {[7, 8, 9, 10, 11].map(age => (
                  <option key={age} value={age}>{age} anos</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Seção do Responsável */}
        <div style={{
          background: COLORS.greenTranslucent,
          padding: '30px',
          borderRadius: '15px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        }}>
          <h2 style={{
            ...globalStyles.h2,
            color: COLORS.white,
            fontSize: '1.8rem',
            marginBottom: '20px',
          }}>Dados do Responsável</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', color: COLORS.white, fontWeight: 600, marginBottom: '8px' }} htmlFor="guardianFirstName">Nome:</label>
                <input
                  type="text"
                  id="guardianFirstName"
                  value={guardianFirstName}
                  onChange={(e) => setGuardianFirstName(e.target.value)}
                  placeholder='Nome'
                  required
                  style={{
                    ...globalStyles.input,
                    border: `1px solid ${COLORS.green}`,
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', color: COLORS.white, fontWeight: 600, marginBottom: '8px' }} htmlFor="guardianLastName">Sobrenome:</label>
                <input
                  type="text"
                  id="guardianLastName"
                  value={guardianLastName}
                  onChange={(e) => setGuardianLastName(e.target.value)}
                  placeholder='Sobrenome'
                  required
                  style={{
                    ...globalStyles.input,
                    border: `1px solid ${COLORS.green}`,
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', color: COLORS.white, fontWeight: 600, marginBottom: '8px' }} htmlFor="whatsapp">WhatsApp / Telefone:</label>
              <input
                type="text"
                id="whatsapp"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                required
                style={{
                  ...globalStyles.input,
                  border: `1px solid ${COLORS.green}`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Seção de Endereço */}
        <div style={{
          background: COLORS.lightGrayTranslucent,
          padding: '30px',
          borderRadius: '15px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        }}>
          <h2 style={{
            ...globalStyles.h2,
            color: COLORS.darkBlue,
            fontSize: '1.8rem',
            marginBottom: '20px',
          }}>Endereço</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', color: COLORS.darkBlue, fontWeight: 600, marginBottom: '8px' }}>O aluno e responsável moram no mesmo endereço?</label>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div>
                  <input
                    type="radio"
                    id="sameAddressYes"
                    name="sameAddress"
                    value="sim"
                    checked={sameAddress === true}
                    onChange={handleSameAddressChange}
                    style={{ marginRight: '5px', cursor: 'pointer' }}
                  />
                  <label style={{ color: COLORS.darkBlue }} htmlFor="sameAddressYes">Sim</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="sameAddressNo"
                    name="sameAddress"
                    value="nao"
                    checked={sameAddress === false}
                    onChange={handleSameAddressChange}
                    style={{ marginRight: '5px', cursor: 'pointer' }}
                  />
                  <label style={{ color: COLORS.darkBlue }} htmlFor="sameAddressNo">Não</label>
                </div>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', color: COLORS.darkBlue, fontWeight: 600, marginBottom: '8px' }} htmlFor="studentStreet">Endereço do Aluno:</label>
              <input
                type="text"
                id="studentStreet"
                placeholder="Rua"
                value={studentAddress.street}
                onChange={(e) => handleAddressChange('student', 'street', e.target.value)}
                required
                style={{
                  ...globalStyles.input,
                  border: `1px solid ${COLORS.darkBlue}`,
                  marginBottom: '1rem',
                }}
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  id="studentNumber"
                  placeholder="Número"
                  value={studentAddress.number}
                  onChange={(e) => handleAddressChange('student', 'number', e.target.value)}
                  required
                  style={{
                    ...globalStyles.input,
                    width: 'calc(50% - 5px)',
                    border: `1px solid ${COLORS.darkBlue}`,
                    marginBottom: '1rem',
                  }}
                />
                <input
                  type="text"
                  id="studentComplement"
                  placeholder="Complemento (opcional)"
                  value={studentAddress.complement}
                  onChange={(e) => handleAddressChange('student', 'complement', e.target.value)}
                  style={{
                    ...globalStyles.input,
                    width: 'calc(50% - 5px)',
                    border: `1px solid ${COLORS.darkBlue}`,
                    marginBottom: '1rem',
                  }}
                />
              </div>
              <input
                type="text"
                id="studentNeighborhood"
                placeholder="Bairro"
                value={studentAddress.neighborhood}
                onChange={(e) => handleAddressChange('student', 'neighborhood', e.target.value)}
                required
                style={{
                  ...globalStyles.input,
                  border: `1px solid ${COLORS.darkBlue}`,
                }}
              />
            </div>

            {!sameAddress && (
              <div>
                <label style={{ display: 'block', color: COLORS.darkBlue, fontWeight: 600, marginBottom: '8px' }} htmlFor="guardianStreet">Endereço do Responsável:</label>
                <input
                  type="text"
                  id="guardianStreet"
                  placeholder="Rua"
                  value={guardianAddress.street}
                  onChange={(e) => handleAddressChange('guardian', 'street', e.target.value)}
                  required
                  style={{
                    ...globalStyles.input,
                    border: `1px solid ${COLORS.darkBlue}`,
                    marginBottom: '1rem',
                  }}
                />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    id="guardianNumber"
                    placeholder="Número"
                    value={guardianAddress.number}
                    onChange={(e) => handleAddressChange('guardian', 'number', e.target.value)}
                    required
                    style={{
                      ...globalStyles.input,
                      width: 'calc(50% - 5px)',
                      border: `1px solid ${COLORS.darkBlue}`,
                      marginBottom: '1rem',
                    }}
                  />
                  <input
                    type="text"
                    id="guardianComplement"
                    placeholder="Complemento (opcional)"
                    value={guardianAddress.complement}
                    onChange={(e) => handleAddressChange('guardian', 'complement', e.target.value)}
                    style={{
                      ...globalStyles.input,
                      width: 'calc(50% - 5px)',
                      border: `1px solid ${COLORS.darkBlue}`,
                      marginBottom: '1rem',
                    }}
                  />
                </div>
                <input
                  type="text"
                  id="guardianNeighborhood"
                  placeholder="Bairro"
                  value={guardianAddress.neighborhood}
                  onChange={(e) => handleAddressChange('guardian', 'neighborhood', e.target.value)}
                  required
                  style={{
                    ...globalStyles.input,
                    border: `1px solid ${COLORS.darkBlue}`,
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Link
            to="/"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              background: COLORS.lightGray,
              color: COLORS.darkBlue,
              textDecoration: 'none',
              borderRadius: '5px',
              fontSize: '1rem',
              fontWeight: 600,
              transition: 'all 0.3s ease',
            }}
            className="link-hover">
            ← Voltar para a Página Inicial
          </Link>

          <button type="submit" style={{
            ...globalStyles.button,
            backgroundColor: COLORS.red,
            border: `1px solid ${COLORS.darkRed}`,
            boxShadow: `0 10px 12px 0 ${COLORS.green}50`,
            color: COLORS.white,
            fontSize: '1.5rem',
          }}>
            Enviar Inscrição
          </button>
        </div>
      </form>
    </motion.div>
  );
}

function Admin() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Área Administrativa</h1>
      <p>Gerencie inscrições e lista de chamada.</p>
      <Link to="/" style={{ display: 'inline-block', padding: '10px 20px', background: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '5px', marginTop: '20px' }}>
        Voltar
      </Link>
    </motion.div>
  );
}

function SuccessPage() {
  const scrollToInfo = () => {
    const infoSection = document.getElementById('info-section');
    infoSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      className="success-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        width: '100%',
        margin: 0,
        backgroundImage: `url(${bgFutebol})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
        display: 'flex',
        flexDirection: 'column',
      }}>
      <div style={{
        ...globalStyles.container,
        width: '100%',
        maxWidth: '100%',
        padding: '0 2rem',
      }}>
        <div style={{
          padding: '40px',
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}>
          <div className="success-container" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
            maxWidth: '600px',
            width: '100%',
          }}>
            <h1 style={{
              color: COLORS.black,
              fontSize: '2.5rem',
              fontWeight: 700,
              textAlign: 'center',
            }}>
              🎉 Inscrição realizada com sucesso!
            </h1>

            <p style={{
              color: COLORS.black,
              fontSize: '1.2rem',
              lineHeight: 1.6,
              textAlign: 'center',
              marginTop: '2rem',
            }}>
              Estamos ansiosos para te ver em campo!
              <br />
              As aulas terão início no dia <strong>15 de abril</strong> de 2024, às <strong>18h</strong>.
              <br />
              Prepare-se para aprender, crescer e se divertir muito! ⚽💙
            </p>

            <div className='mais-info' style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
            }}>
              <span style={{
                color: COLORS.black,
                fontSize: '1.2rem',
                fontWeight: 500,
              }}>
                Mais informações abaixo
              </span>
              <motion.div
                onClick={scrollToInfo}
                whileHover={{ y: 5 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  padding: '1rem',
                  background: COLORS.blue,
                  borderRadius: '50%',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  width: '60px',
                  height: '60px',
                  justifyContent: 'center',
                }}
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  style={{ fontSize: '2rem' }}
                >
                  ↓
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        <div id="info-section" style={{
          width: '100%',
          marginBottom: '40px',
          marginTop: '30vh',
        }}>
          <div style={{
            background: COLORS.blueTranslucent,
            borderRadius: '20px',
            padding: '48px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            width: '100%',
          }}>
            <h2 style={{
              ...globalStyles.h2,
              color: COLORS.white,
            }}>
              Informações Importantes
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 32,
              marginBottom: 40,
              width: '100%',
            }}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                style={{ background: COLORS.lightGrayTranslucent, padding: 24, borderRadius: 12 }}>
                <h3 style={{ color: COLORS.red, marginBottom: 12, fontSize: '1.35rem' }}>Idade</h3>
                <p style={{ color: COLORS.darkBlue, fontSize: '1rem' }}>7 a 11 anos</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                style={{ background: COLORS.lightGrayTranslucent, padding: 24, borderRadius: 12 }}>
                <h3 style={{ color: COLORS.blue, marginBottom: 12, fontSize: '1.35rem' }}>Horário</h3>
                <p style={{ color: COLORS.darkBlue, fontSize: '1rem' }}>Segunda-feira, 18h às 19h30</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                style={{ background: COLORS.lightGrayTranslucent, padding: 24, borderRadius: 12 }}>
                <h3 style={{ color: COLORS.green, marginBottom: 12, fontSize: '1.35rem' }}>Local</h3>
                <p style={{ color: COLORS.darkBlue, fontSize: '1rem' }}>Campo de futebol da 27, R. Dinalva Oliveira Teixeira, 107-187 - Urucânia, Rio de Janeiro - RJ</p>
              </motion.div>
            </div>
            <div style={{ margin: '40px 0', width: '100%' }}>
              <iframe
                title="Mapa da ICNV Urucânia"
                src="https://www.google.com/maps?q=R.+Jos%C3%A9+Silton+Pinheiro,+141+-+CASA+01+-+Paci%C3%AAncia,+Rio+de+Janeiro+-+RJ,+23573-340&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link to="/" style={{
            display: 'inline-block',
            padding: '10px 20px',
            marginBottom: '2.5rem',
            background: COLORS.lightGray,
            color: COLORS.darkBlue,
            textDecoration: 'none',
            borderRadius: '5px',
            fontSize: '1rem',
            fontWeight: 600,
            transition: 'all 0.3s ease',
          }}>
            ← Voltar para a Página Inicial
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function Sobre() {
  const sobreColors = {
    gold: '#E6BB49',
    brown: '#99582a',
    black: '#000000',
    white: '#FFFFFF',
    lightGold: '#FFF8DC',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: '100vh',
        width: '100%',
        margin: 0,
        padding: 0,
        backgroundColor: sobreColors.white,
        fontFamily: 'Open Sans, sans-serif',
        fontWeight: 300,
      }}>
      
      {/* Hero Section */}
      <div 
        className="hero-section"
        style={{
          width: '100%',
          height: '60vh',
          position: 'relative',
          overflow: 'hidden',
          background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${coroa})`,
          backgroundSize: '100%',
          backgroundPosition: 'left 35% bottom 45%',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#000',
        }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: sobreColors.white,
          width: '100%',
          padding: '0 2rem',
        }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: '700',
              marginBottom: '1rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}>
            ICNV URUCÂNIA
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: 'clamp(1rem, 3vw, 1.5rem)',
              maxWidth: '800px',
              margin: '0 auto',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            }}>
            Uma comunidade de discípulos que formam discípulos
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 2rem',
      }}>
        {/* História */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            marginBottom: '6rem',
            textAlign: 'center',
          }}>
          <h2 style={{
            color: sobreColors.brown,
            fontSize: 'clamp(1.8rem, 4vw, 1.5rem)',
            marginBottom: '2rem',
            fontWeight: '600',
            fontFamily: 'Roboto, sans-serif',
          }} className="sobre-heading">Nossa História</h2>
          <p style={{
            color: sobreColors.black,
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            lineHeight: 1.8,
            maxWidth: '800px',
            margin: '0 auto',
          }} className="sobre-text">
            A Igreja Cristã Nova Vida de Urucânia surgiu há 19 anos, a partir do desejo de levar a Palavra de Deus à nossa comunidade. 
            Tudo começou quando um membro da ICNV de Paciência compartilhou com o Pr. Evandro a necessidade de uma congregação em Urucânia. 
            Sensível à direção de Deus, o pastor atendeu ao chamado e, desde então, temos sido um ponto de luz e esperança neste lugar.
          </p>
        </motion.div>

        {/* Pastor e Família */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            marginBottom: '6rem',
            background: sobreColors.brown,
            padding: '4rem 0',
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
            marginRight: 'calc(-50vw + 50%)',
          }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 2rem',
            display: 'flex',
            gap: '4rem',
            alignItems: 'center',
            flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
          }}>
            <div style={{ 
              flex: window.innerWidth <= 768 ? '0 0 auto' : '0 0 400px',
              width: window.innerWidth <= 768 ? '100%' : 'auto',
              maxWidth: '400px',
            }}>
              <img
                src={familiaPastoral}
                alt="Família Pastoral"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{
                color: sobreColors.white,
                fontSize: 'clamp(1.8rem, 4vw, 1.5rem)',
                marginBottom: '2rem',
                fontWeight: '600',
                fontFamily: 'Roboto, sans-serif',
              }} className="sobre-heading">Nosso Pastor e Família</h2>
              <p style={{
                color: sobreColors.white,
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                lineHeight: 1.8,
              }} className="sobre-text">
                A liderança da Igreja Cristã Nova Vida de Urucânia está sob os cuidados do Pr. Jeremias Fernandes, que foi consagrado ao ministério pastoral em 2011. 
                Desde então, tem conduzido a igreja com fé, dedicação e sensibilidade à direção de Deus. 
                Ao seu lado está sua esposa, irmã Lídia Lopes, uma mulher de oração e apoio constante na obra do Senhor.
              </p>
            </div>
          </div>
        </motion.div>

        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            color: sobreColors.black,
            fontSize: '1.8rem',
            lineHeight: 1.8,
            margin: '5rem 0',
            textAlign: 'center',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: '500',
            position: 'relative',
            padding: '1rem 2rem',
            display: 'block',
            width: 'fit-content',
            marginLeft: 'auto',
            marginRight: 'auto',
            borderTop: `2px solid ${sobreColors.black}`,
            borderBottom: `2px solid ${sobreColors.black}`,
            letterSpacing: '1px',
          }} className="sobre-heading">
          Venha fazer uma visita!
        </motion.p>

        {/* Horários */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            marginBottom: '6rem',
            textAlign: 'center',
          }}>
          <h2 style={{
            color: sobreColors.brown,
            fontSize: 'clamp(1.8rem, 4vw, 2rem)',
            marginBottom: '3rem',
            fontWeight: '600',
            fontFamily: 'Roboto, sans-serif',
          }} className="sobre-heading">Nossos Encontros</h2>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'left',
          }}>
            <div>
              <p style={{
                color: sobreColors.black,
                fontSize: '1rem',
                lineHeight: 1.8,
                textAlign: 'center',
              }}><strong>Domingos:</strong><br />
                9h00 Culto de Oração<br />
                10h00 Escola Bíblica Dominical<br />
                19h00 Culto de Louvor e Adoração
              </p>
            </div>

            <div>
              <p style={{
                color: sobreColors.black,
                fontSize: '1rem',
                lineHeight: 1.8,
                textAlign: 'center',
              }}><strong>Terça-feira: </strong>19h30 Oração das Mulheres
              </p>
            </div>

            <div>
              <p style={{
                color: sobreColors.black,
                fontSize: '1rem',
                lineHeight: 1.8,
                textAlign: 'center',
              }}><strong>Quarta-feira: </strong>19h30 Culto de Louvor e Adoração
              </p>
            </div>

            <div>
              <p style={{
                color: sobreColors.black,
                fontSize: '1rem',
                lineHeight: 1.8,
                textAlign: 'center',
              }}><strong>Sexta-feira: </strong>20h00 Oração dos Homens (a cada 15 dias)
              </p>
            </div>

            <div>
              <p style={{
                color: sobreColors.black,
                fontSize: '1rem',
                lineHeight: 1.8,
                textAlign: 'center',
              }}><strong>Sábado: </strong>19h00 Culto de Louvor e Adoração
              </p>
            </div>
          </div>
        </motion.div>

        {/* Localização */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: 'center',
          }}>
          <h2 style={{
            color: sobreColors.brown,
            fontSize: 'clamp(1.8rem, 4vw, 1.5rem)',
            marginBottom: '2rem',
            fontWeight: '600',
            textAlign: 'center',
            fontFamily: 'Roboto, sans-serif',
          }} className="sobre-heading">Localização</h2>
          <p style={{
            color: sobreColors.black,
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            lineHeight: 1.8,
            marginBottom: '2rem',
            textAlign: 'center',
          }} className="sobre-text">
            R. José Silton Pinheiro, 141 - CASA 01<br />
            Paciência, Rio de Janeiro - RJ<br />
            CEP: 23573-340
          </p>
          <div style={{
            width: '100%',
            height: 'clamp(300px, 50vw, 400px)',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(62, 62, 62, 0.15)',
          }}>
            <iframe
              title="Mapa da ICNV Urucânia"
              src="https://www.google.com/maps?q=R.+Jos%C3%A9+Silton+Pinheiro,+141+-+CASA+01+-+Paci%C3%AAncia,+Rio+de+Janeiro+-+RJ,+23573-340&z=17&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer style={{
        background: sobreColors.brown,
        color: sobreColors.white,
        padding: '4rem 2rem',
        marginTop: '4rem',
        textAlign: 'center',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            marginBottom: '1rem',
          }} className="sobre-text">
            "No centro da nossa confissão está o Evangelho de Jesus Cristo – a verdade gloriosa de que Jesus Cristo morreu e ressuscitou para que pecadores fossem reconciliados com Deus."
          </p>
          <Link
            to="/"
            style={{
              display: 'inline-block',
              padding: '12px 32px',
              background: sobreColors.white,
              color: sobreColors.brown,
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
              fontWeight: '500',
              marginTop: '2rem',
              transition: 'all 0.3s ease',
            }}
            className="link-hover">
            Voltar para a Página Inicial
          </Link>
        </div>
      </footer>

      {/* Adicionando estilos responsivos */}
      <style>
        {`
          @media (max-width: 768px) {
            .main-content {
              padding: 2rem 1rem;
            }
            .hero-section {
              background-size: 180% !important;
            }
            .footer {
              padding: 2rem 1rem;
            }
            .pastor-section {
              flex-direction: column;
              gap: 2rem;
            }
            .pastor-image {
              width: 100%;
              max-width: 400px;
            }
          }
        `}
      </style>
    </motion.div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/inscricao" element={<Inscricao />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/sucesso" element={<SuccessPage />} />
        <Route path="/sobre" element={<Sobre />} />
      </Routes>
    </Router>
  );
}

export default App;
