import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import CenteredContainer from "../../components/CenteredContainer.jsx"
import NotImplemented from "../../components/NotImplemented.jsx"
import ValidationCrm  from "../../utils/ValidationCrm.jsx"



import "../../style/home/Home.css"


const Home = () => {
  const locationUrl = useLocation();
  const navigate = useNavigate();

  const [crm, setCrm] = useState(locationUrl.state?.crm?locationUrl.state?.crm: "");
  const [isValidCrm, setIsValidCrm] = useState(true);
  const [crmData, setCrmData] = useState(null);
  const [crmDataNotFound, setCrmDataNotFound] = useState(false);
  const [showNotImplementedModal, setShowNotImplementedModal] = useState(false);


  const getCrmData = (crm) => {
    //implementar serviço de dados aqui
    //Dado estático
    if(crm.toUpperCase() == "00000-ES")
    {
      return {
        nome: "NomeTeste C. Sobrenome",
        especializacao: "Cirurgião",
        estadoEmissao: "Espírito Santo",
        emissao: "11/10/2021",
        status: "Inativo", // ou "Ativo"
      }
    }else if(crm.toUpperCase() == "11111-ES"){
      console.log("0000000")
      return {
        nome: "NomeTeste C. Sobrenome",
        especializacao: "Obstetra",
        estadoEmissao: "Espírito Santo",
        emissao: "12/09/2000",
        status: "Ativo", // ou "Inativo"
      }
    }
    else{
      return null;
    }
  };

  const handleCrmChange = (event) => {
    setCrm(event.target.value);
  };

  const validateCrm = () => {
    const isValidCrm = ValidationCrm(crm)

    setIsValidCrm(isValidCrm);
    setCrmDataNotFound(false);
    setCrmData(null);

    if(isValidCrm)
    {
      let crmData = getCrmData(crm);
      if(crmData)
        setCrmData(crmData);
      else
        setCrmDataNotFound(true);
    }
  };

  const handleCloseModal = () => {
    setShowNotImplementedModal(false);
  };

  const redirectToLogin = () => {
    let isValid = ValidationCrm(crm);
    let possuiRegistro = false

    if(isValid){
      if(getCrmData(crm))
        possuiRegistro = true
    }

    if(isValid && possuiRegistro)
      navigate('/login', { state: { crm } });
    else 
      setShowNotImplementedModal(true);
  };

  return (
    <CenteredContainer>
        <NotImplemented active={showNotImplementedModal} onClose={handleCloseModal} msg="Digite um crm válido, ou um crm cadastrado."/>

        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width={500} className="container-home">
            <Box>
                <img width={240} src="src/assets/SecureHealthTransparente.png" alt="SecureHealth Connect" />
            </Box>
            <TextField 
                label="Digite o CRM" 
                variant="filled" 
                value={crm} 
                onChange={handleCrmChange} 
                error={!isValidCrm}
                helperText={!isValidCrm ? "CRM inválido" : ""}
                fullWidth 
                className="input-crm"
            />
            {crmDataNotFound && (
              <Box className={`crm-data-not-found`}>
                <center>Informações do profissional não encontrado.</center>
              </Box>
            )}

           {crmData && (
              <Box className={`crm-data ${crmData.status.toLowerCase()}`}>
                <div><strong>Nome:</strong> {crmData.nome}</div>
                <div><strong>Especialização:</strong> {crmData.especializacao}</div>
                <div><strong>Estado de emissão:</strong> {crmData.estadoEmissao}</div>
                <div><strong>Emissão:</strong> {crmData.emissao}</div>
                <div><strong>Status:</strong> <span className={crmData.status.toLowerCase()=="inativo"?"tagRed":"tagGreen"}>{crmData.status}</span></div>
              </Box>
            )}

            <Box className='group-button-home'>
                <Button variant="contained" color="primary" onClick={validateCrm} className='button-login'>
                    Verificar CRM
                </Button>
                <Button variant="contained" color="success" onClick={redirectToLogin} className='button-login'>
                    Ir para Login
                </Button>
            </Box>
        </Box>
        
    </CenteredContainer>
  );
};

export default Home;
