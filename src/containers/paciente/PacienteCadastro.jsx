import React, { useState, useEffect } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import CenteredContainer from "../../components/CenteredContainer.jsx"


import "../../style/paciente/PacienteCadastro.css"

const PacienteCadastro = () => {
  const locationUrl = useLocation();
  const navigate = useNavigate();

  const [cpf, setCpf] = useState(locationUrl.state.cpf);
  const [descricao, setDescricao] = useState("");
  const [medico, setMedico] = useState("");
  const [crm, setCrm] = useState("");
  const [sigiloso, setSigiloso] = useState("");
  const [tipo, setTipo] = useState("");
  const [data, setData] = useState("");
  const [url, setUrl] = useState("");

  const dados = locationUrl.state.dados; 
  const token = locationUrl.state.token; 

  useEffect(() => {
    //validar token, implementar outro melhor
    if (locationUrl.state.token != "761f7a100635a5fc03e5063aee1eef91") {
      navigate('/'); 
    }
  }, [navigate]);




  const redirectToPacienteHome = () => {
    navigate('/PacienteHome', { state: { cpf, dados, token } });
  };

  const adicionarDadosPessoa = () => {

  };

  return (
    <CenteredContainer>

        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width={500} className="container-paciente-home">
            <Box>
                <img width={240} src="src/assets/SecureHealthTransparente.png" alt="SecureHealth Connect" />
            </Box>
       
            <TextField 
                label="CPF do paciente" 
                variant="filled" 
                value={cpf} 
                fullWidth 
                InputProps={{ readOnly: true }}
                className={"input-cpf-cadastro"}
            />

            <TextField 
                label="Descrição" 
                variant="filled" 
                value={descricao} 
                fullWidth 
                onChange={(e) => setDescricao(e.target.value)}
                className={"input-descricao-cadastro"}
              />

              <TextField 
                  label="Médico" 
                  variant="filled" 
                  value={medico} 
                  fullWidth 
                  onChange={(e) => setMedico(e.target.value)}
                  className={"input-medico-cadastro"}
                />

              <TextField 
                label="CRM" 
                variant="filled" 
                value={crm} 
                fullWidth 
                onChange={(e) => setCrm(e.target.value)}
                className={"input-crm-cadastro"}
              />

            <TextField 
                label="Sigiloso" 
                variant="filled" 
                value={sigiloso} 
                fullWidth 
                onChange={(e) => setSigiloso(e.target.value)}
                className={"input-sigiloso-cadastro"}
              />

            <TextField 
                label="Tipo" 
                variant="filled" 
                value={tipo} 
                fullWidth 
                onChange={(e) => setTipo(e.target.value)}
                className={"input-tipo-cadastro"}
              />

            <TextField 
                label="Data" 
                variant="filled" 
                value={data} 
                fullWidth 
                onChange={(e) => setData(e.target.value)}
                className={"input-data-cadastro"}
              />

            <TextField 
                label="URL" 
                variant="filled" 
                value={url} 
                fullWidth 
                onChange={(e) => setUrl(e.target.value)}
                className={"input-url-cadastro"}
              />

            <Box className='group-button-paciente-home'>
                <Button variant="contained" color="success" onClick={adicionarDadosPessoa} className='button-paciente-cadastro'>
                    Adicionar
                </Button>
                <Button variant="contained" color="error" onClick={redirectToPacienteHome} className='button-paciente-cadastro'>
                    Cancelar
                </Button>
            </Box>
        </Box>
    </CenteredContainer>
  );
};

export default PacienteCadastro;
