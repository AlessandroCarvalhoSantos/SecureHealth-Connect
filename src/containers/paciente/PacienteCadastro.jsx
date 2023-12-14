import React, { useState, useEffect } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import CenteredContainer from "../../components/CenteredContainer.jsx"

import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';


import "../../style/paciente/PacienteCadastro.css"

const PacienteCadastro = () => {
  const locationUrl = useLocation();
  const navigate = useNavigate();


  const medicoLogado = locationUrl.state.dados; 
  const token = locationUrl.state.token; 

  const [cpf, setCpf] = useState(locationUrl.state.cpf);
  const [descricao, setDescricao] = useState("");
  const [medico, setMedico] = useState(medicoLogado.nome);
  const [crm, setCrm] = useState(medicoLogado.crm);
  const [sigiloso, setSigiloso] = useState(false);
  const [tipo, setTipo] = useState("");
  const [data, setData] = useState(new Date().toISOString().split('T')[0]);
  const [url, setUrl] = useState("");
  const [pdfFile, setPdfFile] = useState(null);




  useEffect(() => {
    //validar token, implementar outro melhor
    if (locationUrl.state.token != "761f7a100635a5fc03e5063aee1eef91") {
      navigate('/'); 
    }
  }, [navigate]);


  const handlePdfChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  
  

  const redirectToPacienteHome = () => {
    navigate('/PacienteHome', { state: { cpf, dados: medicoLogado, token } });
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
                className={"input-readonly-cadastro"}
            />

              <TextField 
                  label="Médico" 
                  variant="filled" 
                  value={medico} 
                  fullWidth 
                  InputProps={{ readOnly: true }}
                  className={"input-readonly-cadastro"}
                />

              <TextField 
                label="CRM" 
                variant="filled" 
                value={crm} 
                fullWidth 
                InputProps={{ readOnly: true }}
                className={"input-readonly-cadastro"}
              />

              <TextField
                label="Data de envio"
                type="date"
                variant="filled"
                value={data}
                fullWidth
                className="input-readonly-cadastro"
                InputProps={{ readOnly: true }}
                InputLabelProps={{
                  shrink: true,  
                }}
              />

              <TextField 
                label="Descrição" 
                variant="filled" 
                value={descricao} 
                fullWidth 
                onChange={(e) => setDescricao(e.target.value)}
                multiline  
                rows={4}   
                className={"input-descricao-cadastro"}
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={sigiloso}
                    onChange={(e) => setSigiloso(e.target.checked)}
                    name="sigiloso"
                  />
                }
                label="Sigiloso"
                className={"switch-sigiloso-cadastro"}
              />

              <FormControl variant="filled" fullWidth className="input-tipo-cadastro">
                <InputLabel id="tipo-label">Tipo</InputLabel>
                <Select
                  labelId="tipo-label"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  label="Tipo"
                >
                  <MenuItem value="Prescrição médica">Prescrição médica</MenuItem>
                  <MenuItem value="Avaliação de rotina">Avaliação de rotina</MenuItem>
                  <MenuItem value="Consulta de emergência">Consulta de emergência</MenuItem>
                  <MenuItem value="Consulta de especialidade">Consulta de especialidade</MenuItem>
                  <MenuItem value="Exame de diagnóstico">Exame de diagnóstico</MenuItem>
                  <MenuItem value="Consulta de acompanhamento">Consulta de acompanhamento</MenuItem>
                  <MenuItem value="Consulta virtual">Consulta virtual</MenuItem>
                  <MenuItem value="Terapia ou aconselhamento">Terapia ou aconselhamento</MenuItem>
                  <MenuItem value="Vacinação">Vacinação</MenuItem>
                  <MenuItem value="Check-up anual">Check-up anual</MenuItem>
                  <MenuItem value="Outros">Outros</MenuItem>

                </Select>
              </FormControl>

              <TextField
                type="file"
                accept=".pdf"
                onChange={handlePdfChange}
                fullWidth
                className={"input-file-cadastro"}
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
