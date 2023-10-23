import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { Container, Form, Avatar } from "./styles";
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from "react-icons/fi";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { api } from "../../services/api";
import avatarDefault from "../../assets/avatarplaceholder.svg";
export function Profile() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [passwordOld, setPasswordOld] = useState();
  const [passwordNew, setPasswordNew] = useState();

  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarDefault;
  const [avatar, setAvatar] = useState(avatarUrl);
  const [avatarFile, setAvatarFile] = useState(null);

async function handleUpdate() {
    const updated = {
        name,
        email,
        password: passwordNew,
        old_password: passwordOld
    }

    const userupdated = Object.assign(user, updated);

    await updateProfile({user: userupdated, avatarFile});
}

function handleChangeAvatar(e) {
  const file = e.target.files[0];
  setAvatarFile(file);

  const imagePreview = URL.createObjectURL(file);
    setAvatar(imagePreview);

}

  return (
    <Container>
      <header>
        <button type="button" onClick={() => navigate(-1)} >
          <FiArrowLeft />
        </button>
      </header>
      <Form>
        <Avatar>
          <img
            src={avatar}
            alt="Foto de Perfil do Usuário"
          />
          <label htmlFor="avatar">
            <FiCamera />

            <input type="file" id="avatar" onChange={handleChangeAvatar}/>
          </label>
        </Avatar>
        <Input placeholder="Nome" type="text" icon={FiUser} value={name} onChange={e => setName(e.target.value)}/>
        <Input placeholder="E-mail" type="text" icon={FiMail} value={email} onChange={e => setEmail(e.target.value)}/>
        <Input placeholder="Senha Atual" type="password" icon={FiLock} onChange={e => setPasswordOld(e.target.value)}/>
        <Input placeholder="Nova Senha" type="password" icon={FiLock} onChange={e => setPasswordNew(e.target.value)}/>
        <Button title="Salvar" onClick={handleUpdate}/>
      </Form>
    </Container>
  );
}
