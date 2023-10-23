import { useState } from "react";
import { Container, Form, Background } from "./styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
export function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const navigate = useNavigate();
  async function handleSignUp() {
    if(!name || !email || !password) {
      return  alert('Preencha todos os campos');
    }

    await api.post('/users', {name, email, password}).then(( ) => {

      alert('Usuário cadastrado com sucesso');
      navigate("/")
    }).catch(err => {
        if (err.response){
          alert(err.response.data.message);
        } else {
          alert('Não foi possível cadastrar usuário');
        }
    })
  }

  return (
    <Container>
      <Background />
      <Form>
        <h1>RocketNotes</h1>
        <p>Aplicação para gerenciamento de links úteis</p>
        <h2>Criar sua conta</h2>
        <Input placeholder="Nome" type="text" icon={FiUser} onChange={e => setName(e.target.value)} />
        <Input placeholder="E-mail" type="text" icon={FiMail} onChange={e => setEmail(e.target.value)}/>
        <Input placeholder="Senha" type="password" icon={FiLock} onChange={e => setPassword(e.target.value)}  />
        <Button title="Cadastrar" onClick={handleSignUp} />
        <Link to="/" href="#">
          Voltar para o login
        </Link>
      </Form>
    </Container>
  );
}
