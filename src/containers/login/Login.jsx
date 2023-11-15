import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import CenteredContainer from "../../components/CenteredContainer.jsx";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import "../../style/home/Login.css"



const Login= () => {

  const [password, setPassword] = useState('');

  const locationUrl = useLocation();
  const crm = locationUrl.state?.crm
  const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Implementar lógica de login
  };

  const handleForgotPassword = () => {
    // Implementar lógica de esqueci a senha
  };

  const goBack = () => {
    navigate('/', { state: { crm } });
  };

  return (
    <CenteredContainer>
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
        <Button variant="text" color="primary" onClick={handleForgotPassword} >
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
