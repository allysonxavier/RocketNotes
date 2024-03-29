import { Container, Form } from "./styles";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { NoteItem } from "../../components/NoteItem";
import { Section } from "../../components/Section";
import { Button } from "../../components/Button";
import {useState} from "react";
import { api } from "../../services/api";
import {useNavigate} from "react-router-dom";
import {ButtonText} from "../../components/ButtonText/index.jsx";

export function New() {
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();


  function handleAddLink() {
    setLinks( prevState => [...prevState, newLink]);
    setNewLink("");

  }

  function handleRemoveLink(deleted) {
    setLinks( prevState => prevState.filter(link => link !== deleted));
  }

  function handleAddTag() {
    setTags( prevState => [...prevState, newTag]);
    setNewTag("");
  }

  function handleRemoveTag(deleted) {
    setTags( prevState => prevState.filter(tag => tag !== deleted));
  }

  async function handleSaveNote() {
    if(!title) {
      return alert("Você precisa adicionar um título para salvar a nota.");
    }

    if(newTag) {
      return alert("Você precisa adicionar o novo marcador antes de salvar a nota. Adiocione ou deixe o campo vazio.");
    }

    if(newLink) {
        return alert("Você precisa adicionar o novo link antes de salvar a nota. Adiocione ou deixe o campo vazio.");
    }

  await api.post("/notes", {
    title,
    description,
    tags,
    links
  })
    alert("Nota salva com sucesso!");
    navigate(-1);

  }

  return (
    <Container>
      <Header />
      <main>
        <Form>
          <header>
            <h1>Criar Nota</h1>
            <ButtonText title="Voltar" onClick={() => navigate(-1)} />
          </header>
          <Input placeholder="Título" onChange={e => setTitle(e.target.value) } />
          <Textarea placeholder="Observações" onChange={e => setDescription(e.target.value) } />
          <Section title="Links Úteis">

            {links.map((link, index) => (
                <NoteItem key={String(index)} value={link} onClick={() => handleRemoveLink(link)}/>
            ))}

            <NoteItem isNew placeholder="Novo Link"
                      value={newLink}
                      onChange={e =>setNewLink(e.target.value)}
                      onClick={handleAddLink} />
          </Section>
          <Section title="Marcadores">
            <div className="tags">
              {
                tags.map((tag, index) => (
                    <NoteItem
                        key={String(index)}
                        value={tag}
                        onClick={() => handleRemoveTag(tag)}
                    />
                ))

              }
              <NoteItem
                  isNew
                  placeholder="Nova Tag"
                  onChange={e => setNewTag(e.target.value)}
                  value={newTag}
                  onClick={handleAddTag}
              />
            </div>
          </Section>
          <Button
              title="Salvar"
              onClick={handleSaveNote}
          />
        </Form>
      </main>
    </Container>
  );
}
