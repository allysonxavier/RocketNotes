import { Container, Links } from "./styles";
import { Header } from "../../components/Header/index";
import { Button } from "../../components/Button/index";
import { Section } from "../../components/Section/index";
import { Tag } from "../../components/Tag/index";

export function Details() {
  return (
    <Container>
      <Header />
      <Section title="links úteis">
        <Links>
          <li>
            <a href="#">oioio</a>{" "}
          </li>{" "}
          <li>
            <a href="#">oioio</a>{" "}
          </li>
        </Links>
      </Section>
      <Section title="Marcadores">
        <Tag title="express" />
        <Tag title="node" />
      </Section>
      <Button title="Voltar" />
    </Container>
  );
}
