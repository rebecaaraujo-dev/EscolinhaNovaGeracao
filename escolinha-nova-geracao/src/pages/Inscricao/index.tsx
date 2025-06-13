import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { PatternFormat } from 'react-number-format';
import '../../index.css';
import './styles.css';
import { supabase } from '../../supabaseClient';

const DDDs = [
  { value: '21', label: '21' },
  { value: '11', label: '11' },
  { value: '31', label: '31' },
  { value: '41', label: '41' },
  { value: '51', label: '51' },
  { value: '61', label: '61' },
  { value: '71', label: '71' },
  { value: '81', label: '81' },
  { value: '91', label: '91' },
  { value: '27', label: '27' }
];

interface FormData {
  firstName: string;
  lastName: string;
  age: string;
  guardianFirstName: string;
  guardianLastName: string;
  whatsapp: string;
  relationship: string;
  guardian2FirstName: string;
  guardian2LastName: string;
  whatsapp2: string;
  relationship2: string;
  sameAddress: boolean;
  differentAddressGuardian: '1' | '2' | '';
  studentAddress: {
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
  };
  guardianAddress: {
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
  };
  ddd: string;
  ddd2: string;
}

const Inscricao: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    age: '',
    guardianFirstName: '',
    guardianLastName: '',
    whatsapp: '',
    relationship: '',
    guardian2FirstName: '',
    guardian2LastName: '',
    whatsapp2: '',
    relationship2: '',
    sameAddress: true,
    differentAddressGuardian: '',
    studentAddress: {
      street: '',
      number: '',
      complement: '',
      neighborhood: ''
    },
    guardianAddress: {
      street: '',
      number: '',
      complement: '',
      neighborhood: ''
    },
    ddd: '21',
    ddd2: '21'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressChange = (type: 'student' | 'guardian', field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [`${type}Address`]: {
        ...prev[`${type}Address`],
        [field]: value
      }
    }));
  };

  const handleSameAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      sameAddress: e.target.value === 'sim'
    }));
  };

  const handleDifferentAddressGuardianChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      differentAddressGuardian: e.target.value as '1' | '2' | ''
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validação básica
      if (!formData.firstName || !formData.lastName || !formData.age) {
        throw new Error('Por favor, preencha todos os campos obrigatórios.');
      }

      if (!formData.guardianFirstName || !formData.guardianLastName || !formData.whatsapp || !formData.relationship) {
        throw new Error('Por favor, preencha todos os dados do primeiro responsável.');
      }

      if (!formData.studentAddress.street || !formData.studentAddress.number || !formData.studentAddress.neighborhood) {
        throw new Error('Por favor, preencha o endereço completo do aluno.');
      }

      if (!formData.sameAddress && (!formData.guardianAddress.street || !formData.guardianAddress.number || !formData.guardianAddress.neighborhood)) {
        throw new Error('Por favor, preencha o endereço completo do responsável.');
      }

      const { error } = await supabase
        .from('inscricoes')
        .insert([{
          nome_aluno: formData.firstName,
          sobrenome_aluno: formData.lastName,
          idade_aluno: parseInt(formData.age),
          
          // Responsável 1
          nome_responsavel1: formData.guardianFirstName,
          sobrenome_responsavel1: formData.guardianLastName,
          whatsapp_responsavel1: `+55${formData.ddd}${formData.whatsapp.replace(/\D/g, '')}`,
          relacionamento_responsavel1: formData.relationship,
          
          // Responsável 2
          nome_responsavel2: formData.guardian2FirstName || null,
          sobrenome_responsavel2: formData.guardian2LastName || null,
          whatsapp_responsavel2: formData.whatsapp2 ? `+55${formData.ddd2}${formData.whatsapp2.replace(/\D/g, '')}` : null,
          relacionamento_responsavel2: formData.relationship2 || null,
          
          // Endereço
          mesmo_endereco: formData.sameAddress,
          
          // Endereço do Aluno
          endereco_aluno_rua: formData.studentAddress.street,
          endereco_aluno_numero: formData.studentAddress.number,
          endereco_aluno_complemento: formData.studentAddress.complement || null,
          endereco_aluno_bairro: formData.studentAddress.neighborhood,
          
          // Endereço do Responsável (quando diferente)
          endereco_responsavel_rua: !formData.sameAddress ? formData.guardianAddress.street : null,
          endereco_responsavel_numero: !formData.sameAddress ? formData.guardianAddress.number : null,
          endereco_responsavel_complemento: !formData.sameAddress ? formData.guardianAddress.complement : null,
          endereco_responsavel_bairro: !formData.sameAddress ? formData.guardianAddress.neighborhood : null,
          
          // Status inicial
          status: 'pending'
        }]);

      if (error) {
        throw new Error(error.message);
      }

      navigate('/success');
    } catch (error) {
      console.error('Erro ao enviar inscrição:', error);
      setError(error instanceof Error ? error.message : 'Ocorreu um erro ao enviar a inscrição. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="inscricao-container">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="inscricao-content"
      >
        <h1 className="inscricao-title">Lista de Espera</h1>
        <p className="inscricao-description">
          Preencha os dados abaixo para inscrever o aluno na lista de espera da Escolinha Nova Geração.
        </p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="inscricao-form">
          {/* Dados do Aluno */}
          <div className="dados-aluno-section">
            <h2>Dados do Aluno</h2>
            <div className="dados-aluno-group">
              <div className="dados-aluno-row">
                <div className="dados-aluno-field">
                  <label htmlFor="firstName" className="dados-aluno-label">Nome:</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="dados-aluno-input"
                    placeholder="Nome"
                    required
                  />
                </div>
                <div className="dados-aluno-field">
                  <label htmlFor="lastName" className="dados-aluno-label">Sobrenome:</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="dados-aluno-input"
                    placeholder="Sobrenome"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="age" className="dados-aluno-label">Idade (7 a 11 anos):</label>
                <select
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="dados-aluno-select"
                  required
                >
                  <option value="">Selecione a idade</option>
                  {[7, 8, 9, 10, 11].map(age => (
                    <option key={age} value={age}>{age} anos</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Dados do Responsável */}
          <div className="dados-responsavel-section">
            <h2>Dados do Responsável</h2>
            <p className="dados-responsavel-description">
              Pedimos os contatos de dois responsáveis para que, em caso de emergência, possamos agir com mais agilidade e garantir o melhor cuidado para os nossos alunos.
            </p>
            
            {/* Responsável 1 */}
            <h3 className="dados-responsavel-subtitle">Responsável 1</h3>
            <div className="dados-responsavel-group">
              <div className="dados-responsavel-row">
                <div className="dados-responsavel-field">
                  <label htmlFor="guardianFirstName" className="dados-responsavel-label">Nome:</label>
                  <input
                    type="text"
                    id="guardianFirstName"
                    name="guardianFirstName"
                    value={formData.guardianFirstName}
                    onChange={handleChange}
                    className="dados-responsavel-input"
                    placeholder="Nome"
                    required
                  />
                </div>
                <div className="dados-responsavel-field">
                  <label htmlFor="guardianLastName" className="dados-responsavel-label">Sobrenome:</label>
                  <input
                    type="text"
                    id="guardianLastName"
                    name="guardianLastName"
                    value={formData.guardianLastName}
                    onChange={handleChange}
                    className="dados-responsavel-input"
                    placeholder="Sobrenome"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="relationship" className="dados-responsavel-label">Relacionamento com o aluno:</label>
                <select
                  id="relationship"
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleChange}
                  className="dados-responsavel-select"
                  required
                >
                  <option value="">Selecione o relacionamento</option>
                  <option value="pai/mae">Pai / Mãe</option>
                  <option value="padrasto/madrasta">Padrasto / Madrasta</option>
                  <option value="irmao/irma">Irmão / Irmã</option>
                  <option value="avo">Avô / Avó</option>
                  <option value="tio/tia">Tio / Tia</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div>
                <label htmlFor="whatsapp" className="dados-responsavel-label">WhatsApp / Telefone:</label>
                <div className="phone-input-container">
                  <span className="country-code">+55</span>
                  <select
                    name="ddd"
                    value={formData.ddd}
                    onChange={handleChange}
                    className="ddd-select"
                  >
                    {DDDs.map(ddd => (
                      <option key={ddd.value} value={ddd.value}>
                        {ddd.label}
                      </option>
                    ))}
                  </select>
                  <PatternFormat
                    format="#####-####"
                    mask="_"
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onValueChange={(values) => {
                      setFormData(prev => ({
                        ...prev,
                        whatsapp: values.value
                      }));
                    }}
                    className="phone-input"
                    placeholder="99999-9999"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="dados-responsavel-divider"></div>

            {/* Responsável 2 */}
            <h3 className="dados-responsavel-subtitle">Responsável 2</h3>
            <div className="dados-responsavel-group">
              <div className="dados-responsavel-row">
                <div className="dados-responsavel-field">
                  <label htmlFor="guardian2FirstName" className="dados-responsavel-label">Nome:</label>
                  <input
                    type="text"
                    id="guardian2FirstName"
                    name="guardian2FirstName"
                    value={formData.guardian2FirstName}
                    onChange={handleChange}
                    className="dados-responsavel-input"
                    placeholder="Nome"
                  />
                </div>
                <div className="dados-responsavel-field">
                  <label htmlFor="guardian2LastName" className="dados-responsavel-label">Sobrenome:</label>
                  <input
                    type="text"
                    id="guardian2LastName"
                    name="guardian2LastName"
                    value={formData.guardian2LastName}
                    onChange={handleChange}
                    className="dados-responsavel-input"
                    placeholder="Sobrenome"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="relationship2" className="dados-responsavel-label">Relacionamento com o aluno:</label>
                <select
                  id="relationship2"
                  name="relationship2"
                  value={formData.relationship2}
                  onChange={handleChange}
                  className="dados-responsavel-select"
                >
                  <option value="">Selecione o relacionamento</option>
                  <option value="pai/mae">Pai / Mãe</option>
                  <option value="padrasto/madrasta">Padrasto / Madrasta</option>
                  <option value="irmao/irma">Irmão / Irmã</option>
                  <option value="avo">Avô / Avó</option>
                  <option value="tio/tia">Tio / Tia</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div>
                <label htmlFor="whatsapp2" className="dados-responsavel-label">WhatsApp / Telefone:</label>
                <div className="phone-input-container">
                  <span className="country-code">+55</span>
                  <select
                    name="ddd2"
                    value={formData.ddd2}
                    onChange={handleChange}
                    className="ddd-select"
                  >
                    {DDDs.map(ddd => (
                      <option key={ddd.value} value={ddd.value}>
                        {ddd.label}
                      </option>
                    ))}
                  </select>
                  <PatternFormat
                    format="#####-####"
                    mask="_"
                    type="tel"
                    id="whatsapp2"
                    name="whatsapp2"
                    value={formData.whatsapp2}
                    onValueChange={(values) => {
                      setFormData(prev => ({
                        ...prev,
                        whatsapp2: values.value
                      }));
                    }}
                    className="phone-input"
                    placeholder="99999-9999"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Seção de Endereço */}
          <div className="dados-endereco-section">
            <h2>Endereço</h2>
            <div className="dados-endereco-group">
              <div>
                <label className="dados-endereco-label">O aluno e responsável moram no mesmo endereço?</label>
                <div className="dados-endereco-radio-group">
                  <label className="dados-endereco-radio-label">
                    <input
                      type="radio"
                      name="sameAddress"
                      value="sim"
                      checked={formData.sameAddress === true}
                      onChange={handleSameAddressChange}
                      className="dados-endereco-radio-input"
                    />
                    Sim
                  </label>
                  <label className="dados-endereco-radio-label">
                    <input
                      type="radio"
                      name="sameAddress"
                      value="nao"
                      checked={formData.sameAddress === false}
                      onChange={handleSameAddressChange}
                      className="dados-endereco-radio-input"
                    />
                    Não
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="studentStreet" className="dados-endereco-label">Endereço do Aluno:</label>
                <input
                  type="text"
                  id="studentStreet"
                  placeholder="Rua"
                  value={formData.studentAddress.street}
                  onChange={(e) => handleAddressChange('student', 'street', e.target.value)}
                  className="dados-endereco-input"
                  required
                />
                <div className="dados-endereco-row">
                  <div className="dados-endereco-field">
                    <input
                      type="text"
                      id="studentNumber"
                      placeholder="Número"
                      value={formData.studentAddress.number}
                      onChange={(e) => handleAddressChange('student', 'number', e.target.value)}
                      className="dados-endereco-input"
                      required
                    />
                  </div>
                  <div className="dados-endereco-field">
                    <input
                      type="text"
                      id="studentComplement"
                      placeholder="Complemento (opcional)"
                      value={formData.studentAddress.complement}
                      onChange={(e) => handleAddressChange('student', 'complement', e.target.value)}
                      className="dados-endereco-input"
                    />
                  </div>
                </div>
                <input
                  type="text"
                  id="studentNeighborhood"
                  placeholder="Bairro"
                  value={formData.studentAddress.neighborhood}
                  onChange={(e) => handleAddressChange('student', 'neighborhood', e.target.value)}
                  className="dados-endereco-input"
                  required
                />
              </div>

              {!formData.sameAddress && (
                <div>
                  <label htmlFor="guardianStreet" className="dados-endereco-label">Endereço do Responsável:</label>
                  <div className="dados-endereco-guardian-select">
                    <label htmlFor="differentAddressGuardian" className="dados-endereco-label">O endereço a ser preenchido é de qual responsável?</label>
                    <select
                      id="differentAddressGuardian"
                      name="differentAddressGuardian"
                      value={formData.differentAddressGuardian}
                      onChange={handleDifferentAddressGuardianChange}
                      className="dados-endereco-select"
                      required
                    >
                      <option value="">Selecione o responsável</option>
                      {formData.guardianFirstName && formData.guardianLastName && (
                        <option value="1">
                          {formData.guardianFirstName} {formData.guardianLastName}
                        </option>
                      )}
                      {formData.guardian2FirstName && formData.guardian2LastName && (
                        <option value="2">
                          {formData.guardian2FirstName} {formData.guardian2LastName}
                        </option>
                      )}
                    </select>
                  </div>
                  <input
                    type="text"
                    id="guardianStreet"
                    placeholder="Rua"
                    value={formData.guardianAddress.street}
                    onChange={(e) => handleAddressChange('guardian', 'street', e.target.value)}
                    className="dados-endereco-input"
                    required
                  />
                  <div className="dados-endereco-row">
                    <div className="dados-endereco-field">
                      <input
                        type="text"
                        id="guardianNumber"
                        placeholder="Número"
                        value={formData.guardianAddress.number}
                        onChange={(e) => handleAddressChange('guardian', 'number', e.target.value)}
                        className="dados-endereco-input"
                        required
                      />
                    </div>
                    <div className="dados-endereco-field">
                      <input
                        type="text"
                        id="guardianComplement"
                        placeholder="Complemento (opcional)"
                        value={formData.guardianAddress.complement}
                        onChange={(e) => handleAddressChange('guardian', 'complement', e.target.value)}
                        className="dados-endereco-input"
                      />
                    </div>
                  </div>
                  <input
                    type="text"
                    id="guardianNeighborhood"
                    placeholder="Bairro"
                    value={formData.guardianAddress.neighborhood}
                    onChange={(e) => handleAddressChange('guardian', 'neighborhood', e.target.value)}
                    className="dados-endereco-input"
                    required
                  />
                </div>
              )}
            </div>
          </div>

          <div className="form-buttons-container">
            <button
              type="submit"
              className="cta-button"
              disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Enviar Inscrição'}
            </button>

            <Link to="/" className="inscricao-back-button">
              ← Voltar para a Página Inicial
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Inscricao; 