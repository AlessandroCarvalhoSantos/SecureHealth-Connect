import React, { useState, useEffect } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import CenteredContainer from "../../components/CenteredContainer.jsx"

import { ethers } from 'ethers';


import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';


import "../../style/paciente/PacienteCadastro.css"

const PacienteCadastro = () => {

  //Conexão com contrato
  const contractAddress = '0x7aFA950Eb3A40173703c4732834F5ac15108DcA9';

  const [contract, setContract] = useState(null);
  const [userAddress, setUserAddress] = useState('');

  const abi = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_cpf",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_descricao",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_medico",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_crm",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_sigiloso",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_tipo",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_data",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_url",
          "type": "string"
        }
      ],
      "name": "storeRecord",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_cpf",
          "type": "string"
        }
      ],
      "name": "retrieveRecords",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "descricao",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "medico",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "crm",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "sigiloso",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "tipo",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "data",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "url",
              "type": "string"
            }
          ],
          "internalType": "struct SecureHealth.MedicalRecord[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

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
  const [url, setUrl] = useState("https://www.caceres.mt.gov.br/fotos_institucional_downloads/2.pdf");
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    //validar token, implementar outro melhor
    if (locationUrl.state.token != "761f7a100635a5fc03e5063aee1eef91") {
      navigate('/'); 
    }

    async function init() {
      // Conectar ao provedor Web3
       
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        //console.log("Account:", await signer.getAddress());

      // Criar uma instÃ¢ncia do contrato
   
      const contract = new ethers.Contract(contractAddress, abi, signer);
      setContract(contract);
      const address = await signer.getAddress();
      setUserAddress(address);
      //console.log('Connected to MetaMask');
    }
    init();

  }, [navigate,contractAddress, abi]);

  const storeValue = async () => {
    const btn = document.getElementById("btnAdicionar");
    btn.innerText = "Aguarde...";
    btn.disabled = true;

    try {
        const tx = await contract.storeRecord(
            cpf,
            descricao,
            medico,
            crm,
            sigiloso ? "Sim":"Não",
            tipo,
            data,
            url
        );
        await tx.wait();
        alert('Registro médico armazenado com sucesso!');
        redirectToPacienteHome();
    } catch (error) {
        console.error("Erro ao armazenar o registro médico:", error);
        alert('Falha ao armazenar o registro médico.');
    }
  };

  const handlePdfChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const redirectToPacienteHome = () => {
    navigate('/PacienteHome', { state: { cpf, dados: medicoLogado, token } });
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
                <Button variant="contained" color="success" onClick={storeValue} className='button-paciente-cadastro' id='btnAdicionar'>
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
