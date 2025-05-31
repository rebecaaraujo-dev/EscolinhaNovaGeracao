import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import criancasFutebol from './assets/criancas-futebol.jpg'; // Removendo a importação da imagem antiga
import bgFutebol from './assets/bg-futebol.jpg';
import { motion } from 'framer-motion';
import { useState } from 'react';
import React from 'react';
import { supabase } from './supabaseClient';

// Add Google Font
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Barriecito&display=swap';
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

  
`;
document.head.appendChild(globalStyle);

const COLORS = {
  red: '#d00000',
  darkRed: '#9a0000',
  yellow: '#ffba08',
  blue: '#4e87d1',
  darkBlue: '#162c48',
  green: '#54775c',
  white: '#ffffff',
  black: '#00121c',
  lightGray: '#f8f9fa',
  lightGrayTranslucent: 'rgba(248, 249, 250, 0.93)',
  blueTranslucent: 'rgba(78,135,209, 0.83)',
  yellowTranslucent: 'rgba(255, 186, 8, 0.83)',
  greenTranslucent: 'rgba(84, 119, 92, 0.83)',
};

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
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: `0 6px 16px 0 ${COLORS.red}33`,
    },
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
        style={{
          background: COLORS.darkBlue,
          padding: '80px 0',
          width: '100%',
          flex: 1,
        }}>
        <div style={globalStyles.container}>
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
                }}>
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
        <div style={globalStyles.container}>
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
        <div style={globalStyles.container}>
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
        <div style={globalStyles.container}>
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
                boxShadow: `0 4px 12px ${COLORS.red}22`,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: `0 6px 16px ${COLORS.red}33`,
                },
              }}>
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
        <div style={globalStyles.container}>
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
  const [studentName, setStudentName] = useState('');
  const [studentAge, setStudentAge] = useState('');
  const [guardianName, setGuardianName] = useState('');
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
      const { data, error } = await supabase
        .from('inscricoes')
        .insert([
          {
            nome_aluno: studentName,
            idade_aluno: parseInt(studentAge),
            nome_responsavel: guardianName,
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
      setStudentName('');
      setStudentAge('');
      setGuardianName('');
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
            <div>
              <label style={{ display: 'block', color: COLORS.white, fontWeight: 600, marginBottom: '8px' }} htmlFor="studentName">Nome do Aluno:</label>
              <input
                type="text"
                id="studentName"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder='Nome do aluno'
                required
                style={{
                  ...globalStyles.input,
                  border: `1px solid ${COLORS.blue}`,
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: COLORS.white, fontWeight: 600, marginBottom: '8px' }} htmlFor="studentAge">Idade do Aluno (7 a 11 anos):</label>
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
            <div>
              <label style={{ display: 'block', color: COLORS.white, fontWeight: 600, marginBottom: '8px' }} htmlFor="guardianName">Nome do Responsável:</label>
              <input
                type="text"
                id="guardianName"
                value={guardianName}
                onChange={(e) => setGuardianName(e.target.value)}
                required
                style={{
                  ...globalStyles.input,
                  border: `1px solid ${COLORS.green}`,
                }}
              />
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
          <Link to="/" style={{
            display: 'inline-block',
            padding: '10px 20px',
            background: COLORS.lightGray,
            color: COLORS.darkBlue,
            textDecoration: 'none',
            borderRadius: '5px',
            fontSize: '1rem',
            fontWeight: 600,
            transition: 'all 0.3s ease',
            '&:hover': {
              background: '#d3d9df',
            },
          }}>
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

      {/* Add a style tag for responsive design */}
      <style>
        {`
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
        `}
      </style>
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
        height: '270vh',
        width: '100%',
        margin: 0,
        backgroundImage: `url(${bgFutebol})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
        display: 'flex',
        flexDirection: 'column',
      }}>
      <div style={globalStyles.container}>
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
              marginTop:'2rem',
            }}>
              Estamos ansiosos para te ver em campo!
              <br />
              As aulas terão início no dia <strong>15 de abril</strong> de 2024, às <strong>18h</strong>.
              <br />
              Prepare-se para aprender, crescer e se divertir muito! ⚽💙
            </p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              marginTop: '2rem',
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
          <h2 style={{
            ...globalStyles.h2,
            color: COLORS.black,
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
              style={{ background: COLORS.white, padding: 24, borderRadius: 12 }}>
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
            />
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link to="/" style={{
            display: 'inline-block',
            padding: '10px 20px',
            background: COLORS.lightGray,
            color: COLORS.darkBlue,
            textDecoration: 'none',
            borderRadius: '5px',
            fontSize: '1rem',
            fontWeight: 600,
            transition: 'all 0.3s ease',
            '&:hover': {
              background: '#d3d9df',
            },
          }}>
            ← Voltar para a Página Inicial
          </Link>
        </div>
      </div>
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
      </Routes>
    </Router>
  );
}

export default App;
