import React, { useState, useEffect } from 'react';
import { Button, TextField, Box } from '@mui/material';
import CenteredContainer from "../../components/CenteredContainer.jsx";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NotImplemented from "../../components/NotImplemented.jsx"

import "../../style/home/Login.css"

const Login= () => {

  const [password, setPassword] = useState('');
  const [isValidPassWorld, setIsValidPassWorld] = useState(true);
  const [isInvalidUser, setIsInvalidUser] = useState(false);

  const [showNotImplementedModal, setShowNotImplementedModal] = useState(false);

  const locationUrl = useLocation();
  const navigate = useNavigate(); 

  const crm = locationUrl.state?.crm
  
  useEffect(() => {
    if (!locationUrl.state?.crm) {
      navigate('/'); 
    }
  }, [crm, navigate]);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const token = "761f7a100635a5fc03e5063aee1eef91";

  const handleLogin = () => {
    let dados = getCrmData(crm);
    if(checkLogin(crm, password))
        navigate('/pacientehome', { state: { token,  dados}});  //Gerar token depois aqui automatico
  };

  
  const checkLogin = (crm, password) => {
    //Implementar serviço de login aqui, método estático por enquanto
    //Verificar senha e situação ativo
    let dados = getCrmData(crm);
    setIsInvalidUser(false)
    setIsValidPassWorld(true)
    
    if(crm.toUpperCase() == dados.crm && dados.password == password){
        if(dados.status == "Ativo")
            return true;

        setIsInvalidUser(true)
    }
    else{
        setIsValidPassWorld(false)
    }
    return false;
  };

  //Método só para trazer dados, retirar depois
  const getCrmData = (crm) => {
    //implementar serviço de dados aqui
    //Dado estático
    if(crm.toUpperCase() == "00000-ES")
    {
      return {
        nome: "NomeTeste C. Sobrenome",
        password: "1234",
        especializacao: "Cirurgião",
        estadoEmissao: "Espírito Santo",
        emissao: "11/10/2021",
        status: "Inativo", // ou "Ativo"
        crm: "00000-ES"
      }
    }else if(crm.toUpperCase() == "11111-ES"){
      console.log("0000000")
      return {
        nome: "NomeTeste C. Sobrenome",
        password: "1234",
        especializacao: "Obstetra",
        estadoEmissao: "Espírito Santo",
        emissao: "12/09/2000",
        status: "Ativo", // ou "Inativo"
        crm: "11111-ES"
      }
    }
    else{
      return null;
    }
  };

  const handleCloseModal = () => {
    setShowNotImplementedModal(false);
  };

  const handleForgotPassword = () => {
    setShowNotImplementedModal(true);
  };

  const goBack = () => {
    navigate('/', { state: { crm } });
  };

  return (
    <CenteredContainer>
      <NotImplemented active={showNotImplementedModal} onClose={handleCloseModal}/>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width={500} className="container-login">
        <Box>
            <img width={240} src="src/assets/SecureHealthTransparente.png" alt="SecureHealth Connect" />
        </Box>
        <TextField 
          label="CRM" 
          variant="filled" 
          value={crm} 
          InputProps={{ readOnly: true }}
          className={"input-crm-login"}
          fullWidth 
        />

        <TextField 
          label="Senha" 
          variant="filled" 
          type="password"
          value={password} 
          onChange={handlePasswordChange} 
          error={!isValidPassWorld}
          helperText={!isValidPassWorld ? "Senha inválida" : ""}
          fullWidth 
        />
        <Button variant="text" color="primary" onClick={handleForgotPassword} className='button-back-forget-passworld' >
            Esqueci a senha
        </Button>
        {isInvalidUser && (
            <Box className={`user-disabled`}>
                <center>Seu usuário está inativado</center>
            </Box>
        )}
        <Box className='group-button-login'>
          <Button variant="contained" color="primary" onClick={handleLogin} className='button-login'>
            Login
          </Button>
          <Button variant="contained"  color="error" onClick={goBack} className='button-login'>
            Voltar ao CRM
          </Button>
        </Box>
      </Box>
    </CenteredContainer>
  );
};

export default Login;
