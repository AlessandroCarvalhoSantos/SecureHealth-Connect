import React, { useState, useEffect } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import CenteredContainer from "../../components/CenteredContainer.jsx"
import ValidationCpf from "../../utils/ValidationCpf.jsx"
import MaskCpf from "../../utils/MaskCpf.jsx"
import PDFViewer from '../../components/PDFViewer.jsx'; 




import "../../style/paciente/PacienteHome.css"

const PacienteHome = () => {
  const locationUrl = useLocation();
  const navigate = useNavigate();

  const [cpf, setCpf] = useState(locationUrl.state.cpf?locationUrl.state.cpf:"");
  const [isValidCpf, setIsValidCpf] = useState(true);
  const [dadosPessoas, setDadosEstaticos] = useState([]);

  const dados = locationUrl.state.dados;
  const crm = locationUrl.state.dados.crm;
  const token = locationUrl.state.token;  

  useEffect(() => {
    //validar token, implementar outro melhor
    if (locationUrl.state.token != "761f7a100635a5fc03e5063aee1eef91") {
      navigate('/'); 
    }
  }, [navigate]);

  //Pegar dados aqui, trocar depois
  const getDadosEstaticos = (cpf) => {
    const dados = [
      {
        cpf: "131.429.857-78", 
        descricao: "Atendimento de médico",
        medico: "Josué Jota Jota",
        crm: "11111/UF",
        sigiloso: "Não",
        tipo: "Ficha médica",
        data: "06/08/2023",
        url: "https://www.caceres.mt.gov.br/fotos_institucional_downloads/2.pdf"
      },
      {
        cpf: "131.429.857-78", 
        descricao: "Atendimento de médico",
        medico: "Josué Jota Jota",
        crm: "11111/UF",
        sigiloso: "Não",
        tipo: "Ficha médica",
        data: "06/08/2023",
        url: "https://www.caceres.mt.gov.br/fotos_institucional_downloads/2.pdf"
      },
    ];
  
    return dados.filter(item => item.cpf === cpf);
  };
  
  


  const buscarDados = () => {
    let dados = getDadosEstaticos(cpf);

    if(ValidationCpf(cpf)){
      if (dados.length === 0) {
        setDadosEstaticos(null); 
      } else {
        setDadosEstaticos(dados);
      }
    }
    else{
      setIsValidCpf(false)
    }

  };

  const handleCpfChange = (event) => {
    setCpf(event.target.value);
    setIsValidCpf(ValidationCpf(event.target.value))
  };

  function handleCPFInput(event) {
    const formattedCPF = MaskCpf(event.target.value);
    event.target.value = formattedCPF;
  }


  const redirectToHome = () => {
    navigate('/', { state: { crm } });
  };

  const redirectToPacienteCadastro = () => {
    const valid = ValidationCpf(cpf);
    if(valid)
        navigate('/PacienteCadastro', { state: { dados, token, cpf } });
    else
        setIsValidCpf(false);   
  };

  return (
    <CenteredContainer>

        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width={500} className="container-paciente-home">
            <Box>
                <img width={240} src="src/assets/SecureHealthTransparente.png" alt="SecureHealth Connect" />
            </Box>
            
            <Box className={`crm-data ${dados.status.toLowerCase()}`}>
                <h3>Informações pessoais</h3>
                <div><strong>Nome:</strong> {dados.nome}</div>
                <div><strong>Especialização:</strong> {dados.especializacao}</div>
                <div><strong>Estado de emissão:</strong> {dados.estadoEmissao}</div>
                <div><strong>Emissão:</strong> {dados.emissao}</div>
                <div><strong>Status:</strong> <span className={dados.status.toLowerCase()=="inativo"?"tagRed":"tagGreen"}>{dados.status}</span></div>
            </Box>
       
            <TextField 
                label="Digite o CPF do paciente" 
                variant="filled" 
                value={cpf} 
                onChange={handleCpfChange} 
                error={!isValidCpf}
                helperText={!isValidCpf ? "CPF inválido" : ""}
                onInput={handleCPFInput}
                fullWidth 
            />
            <Box className='group-button-paciente-cadastro'>
                <Button variant="contained" color="primary" onClick={buscarDados} className='button-paciente-cadastro'>
                    Buscar dados
                </Button>
                <Button variant="contained" color="success" onClick={redirectToPacienteCadastro} className='button-paciente-cadastro'>
                    Adicionar
                </Button>
                <Button variant="contained" color="error" onClick={redirectToHome} className='button-paciente-cadastro-voltar'>
                    Voltar
                </Button>
            </Box>
            {dadosPessoas === null ? (
                <Box className="dados-not-found">
                    <center>Não há dados disponíveis para o CPF informado.</center>
                </Box>
                ) : (
                dadosPessoas.length > 0 && (
                    <Box className="dados-card">
                    {dadosPessoas.map((item, index) => (
                        <Box key={index} className="dados-item">
                            <div><strong>Descrição:</strong> {item.descricao}</div>
                            <div><strong>Médico:</strong> {item.medico}</div>
                            <div><strong>CRM:</strong> {item.crm}</div>
                            <div><strong>Sigiloso:</strong> {item.sigiloso}</div>
                            <div><strong>Tipo:</strong> {item.tipo}</div>
                            <div><strong>Data:</strong> {item.data}</div>
                            <PDFViewer url={item.url} />
                        </Box>
                    ))}
                    </Box>
                ))
            }
        </Box>        
    </CenteredContainer>
  );
};

export default PacienteHome;
