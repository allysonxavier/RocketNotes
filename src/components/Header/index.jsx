import { RiShutDownLine } from "react-icons/ri";
import { Container, Profile, Logout } from "./styles";
export function Header() {
  return (
    <Container>
      <Profile to="/profile">
        <img src="http://github.com/allysonxavier.png" alt="Foto do usuário" />
        <div>
          <span>Bem-Vindo!</span>
          <strong>Allyson Xavier</strong>
        </div>
      </Profile>
      <Logout>
        <RiShutDownLine />
      </Logout>
    </Container>
  );
}
