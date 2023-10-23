import { useEffect, useState } from "react";
import { Container, Links, Content } from "./styles";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/index";
import { Button } from "../../components/Button/index";
import { Section } from "../../components/Section/index";
import { Tag } from "../../components/Tag/index";
import { ButtonText } from "../../components/ButtonText";
import { api } from "../../services/api";
export function Details() {
  const [data, setData] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  function handleBack() {
    navigate(-1);
  }

    async function handleDelete() {
    const confirm = window.confirm("Tem certeza que deseja excluir esta nota?");
    if(confirm) {
       await api.delete(`/notes/${params.id}`);
        navigate(-1);
    }
  }

  useEffect(() => {
    async function getNote() {
        const response = await api.get(`/notes/${params.id}`);
        setData(response.data);
    }
    getNote();

  }, []);

  return (
    <Container>
      <Header />
      {
        data &&
        <main>
        <Content>
          <ButtonText onClick={handleDelete} title="Excluir nota"/>
          <h1>{data.title}</h1>
          <p>{data.description}</p>

          {
            data.links &&

          <Section title="links úteis">
            <Links>

              {
                data.links.map(link => (
                <li key={String(link.id)}>
                <a
                    href={link.url}
                    target="_blank">
                  {link.url}
                </a>
              </li>
              ))}
            </Links>
          </Section>

          }

          {

            data.tags &&
            <Section title="Marcadores">
              {
                data.tags.map(tag => (
                <Tag key={String(tag.id)} title={tag.name}/> ))
              }

          </Section>

          }

          <Button onClick={handleBack} title="Voltar"/>
        </Content>
      </main>
      }
    </Container>
  );
}
