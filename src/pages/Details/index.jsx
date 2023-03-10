import { Container, Links, Content } from "./styles";
import { Header } from "../../components/Header/index";
import { Button } from "../../components/Button/index";
import { Section } from "../../components/Section/index";
import { Tag } from "../../components/Tag/index";
import { ButtonText } from "../../components/ButtonText";
export function Details() {
  return (
    <Container>
      <Header />
      <main>
        <Content>
          <ButtonText title="Excluir nota" />
          <h1>Introdução ao React</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor
            sit amet etLorem ipsum dolor sit amet, consectetur adipiscing Lorem
            ipsum dolor sit amet etLorem ipsum dolor sit amet, consectetur
            adipiscing Lorem ipsum dolor sit amet etLorem ipsum dolor sit amet,
            consectetur adipiscing Lorem ipsum dolor sit amet etLorem ipsum
            dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet et
          </p>

          <Section title="links úteis">
            <Links>
              <li>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/allyson-xavier-a574a0189/"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://github.com/allysonxavier" target="_blank">
                  Github
                </a>
              </li>
            </Links>
          </Section>
          <Section title="Marcadores">
            <Tag title="express" />
            <Tag title="node" />
          </Section>
          <Button title="Voltar" />
        </Content>
      </main>
    </Container>
  );
}
