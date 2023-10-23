import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Container, Brand, Menu, Search, Content, NewNote } from "./styles";
import { Header } from "../../components/Header";
import { ButtonText } from "../../components/ButtonText";
import { FiPlus, FiSearch } from "react-icons/fi";
import { Input } from "../../components/Input";
import { Section } from "../../components/Section";
import { Note } from "../../components/Note";
import { api } from "../../services/api";

export function Home() {
    const [tags, setTags] = useState([]);
    const [tagsSelected, setTagsSelected] = useState([]);
    const [search, setSearch] = useState("");
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();
    function  handleDetails(id) {
        navigate(`/details/${id}`);
    }
    function handleSelectTag(tagName) {
        if(tagName === 'all') {
            return setTagsSelected([]);
        }

        const alreadySelected = tagsSelected.includes(tagName);

        if(alreadySelected) {
            const filteredTags = tagsSelected.filter(item => item !== tagName);
            setTagsSelected(filteredTags);

        } else {
            setTagsSelected(prevState =>  [...prevState, tagName]  );
        }
    }



    useEffect(() => {
        async function getTags() {
            const response = await api.get("/tags");
            setTags(response.data);
            console.log('tags',response.data);
        }

        getTags();
    }, [])

    useEffect(() => {
        async function getNotes() {
            const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`);
            setNotes(response.data);
            console.log('notes',response.data);
        }

        getNotes()

    }, [tagsSelected, search])


  return (
    <Container>
      <Brand>
        <h1>RocketNotes</h1>
      </Brand>
      <Header></Header>
      <Menu>
        <li>
          <ButtonText title="Todos"
                      onClick={() => handleSelectTag('all')}
                      isActive={tagsSelected.length === 0}
            />
        </li>

          {
              tags && tags.map(tag => (
                    <li key={String(tag.id)}>
                        <ButtonText
                            title={tag.name}
                            onClick={() => handleSelectTag(tag.name)}
                            isActive={tagsSelected.includes(tag.name)}
                        />
                    </li>
                ))
          }

      </Menu>
      <Search>
        <Input placeholder="Pesquisar Pelo Título"
               icon={FiSearch}
               onChange={(e) => setSearch(e.target.value)} />
      </Search>
      <Content>
        <Section title="Minhas notas">
            {
            notes.map(note => (
                <Note
                    key={String(note.id)}
                    data={note}
                    onClick={() => handleDetails(note.id)}
                />
            ))}
        </Section>
      </Content>
      <NewNote to="/new">
        <FiPlus />
        Criar Nota
      </NewNote>
    </Container>
  );
}
