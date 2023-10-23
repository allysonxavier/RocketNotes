import { RiShutDownLine } from "react-icons/ri";
import { useAuth } from "../../hooks/auth.jsx";
import { Container, Profile, Logout } from "./styles";
import {api} from "../../services/api.js";
import avatarDefault from "../../assets/avatarplaceholder.svg";
import {useNavigate} from "react-router-dom";
export function Header() {
    const { signOut, user } = useAuth();
    const navigate = useNavigate();
    function handleSignOut() {
        navigate("/");
        signOut();
    }

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarDefault;


    return (
    <Container>
      <Profile to="/profile">
        <img src={avatarUrl} alt="Foto do usuário" />
        <div>
          <span>Bem-Vindo!</span>
          <strong>{user.name}</strong>
        </div>
      </Profile>
      <Logout onClick={handleSignOut}>
        <RiShutDownLine />
      </Logout>
    </Container>
  );
}
