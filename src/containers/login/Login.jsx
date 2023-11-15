import React, { useState, useEffect } from 'react';
import { Button, TextField, Box } from '@mui/material';
import CenteredContainer from "../../components/CenteredContainer.jsx";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NotImplemented from "../../components/NotImplemented.jsx"

import "../../style/home/Login.css"

const Login= () => {

  const [password, setPassword] = useState('');
  const [showNotImplementedModal, setShowNotImplementedModal] = useState(false);

  const locationUrl = useLocation();
  const crm = locationUrl.state?.crm
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!locationUrl.state?.crm) {
      navigate('/'); 
    }
  }, [crm, navigate]);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Implementar lógica de login
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
            <img width={240} src="src/assets/SecureHealthTransparente.png" alt="Imagem Centralizada" />
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
          fullWidth 
        />
        <Button variant="text" color="primary" onClick={handleForgotPassword} className='button-back-forget-passworld' >
            Esqueci a senha
        </Button>
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
