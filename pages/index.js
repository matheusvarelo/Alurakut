import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(propriedades) {
  //console.log(propriedades);
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.gituhubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.gituhubUser}`}>
          @{propriedades.gituhubUser}
        </a>
      </p>

      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>

  )
}

function ProfileRelationsBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title}  ({propriedades.items.length})
      </h2>
      <ul>
        {/*seguidores.map((itemAtual) => {
          return (
            <li key={itemAtual}>
              <a href={`https://github.com/${itemAtual.login}.png`} >
                <img src={(itemAtual.image)} />
                {/*<img src={`https://github.com/${itemAtual}.png`}/> }
                <span>{itemAtual.title}</span>
              </a>
            </li>
          )
        })*/}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {

  const usuarioAleatorio = 'matheusvarelo';
  const [comunidades, setComunidades] = React.useState([{
    id: '12314123112',
    title: 'Eu odeio Acordar Cedo',
    image: 'http://alurakut.vercel.app/capa-comunidade-01.jpg'
  }


  ]);
  // pega o numero[] e faz algo com de acordo com a posição a
  // const comunidades = comunidades[0];
  // const comunidades = comunidades[1];
  console.log('nosso teste', comunidades);
  //const comunidades=['Alurakut'];

  const pessoasFavoritas = [
    'omariosouto',
    'peas',
    'rafaballerini'
  ]
  const [seguidores, setSeguidores] = React.useState([]);
  // 0 - Pegar o array de dados do github
  React.useEffect(function () {
    fetch('https://api.github.com/users/peas/followers')
      .then(function (respostadoServidor) {
        return respostadoServidor.json();
      })
      .then(function (respostaCompleta) {
        setSeguidores(respostaCompleta);
      })

  }, [])

  console.log('seguidores antes do return', seguidores);
  // 1 - Criar um box que vai ter um map, baseado nos items do array
  // que pegamos do GitHub







  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar gituhubUser={usuarioAleatorio} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem Vindo(a)</h1>
            <OrkutNostalgicIconSet></OrkutNostalgicIconSet>
          </Box>
          <Box>
            <h2 className="subTitle">
              Oque voce vai fazer?
            </h2>

            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();
              // pedindo pra pegar  e transformar os dados e retornar eles
              const dadosDoForm = new FormData(e.target);
              //console.log(e);
              console.log('Campo', dadosDoForm.get('title'));
              console.log('Campo', dadosDoForm.get('image'));

              // objeto das comunidades
              const Comunidade = {
                id: new Date().toISOString(),
                titulo: dadosDoForm.get('title'),
                image: dadosDoForm.get('image'),
              }

              // comunidades.push('alura Stars'); 
              // os ... inserem dentro de um array o item
              const comunidadesAtualizadas = [...comunidades, 'Alura Stars'];
              setComunidades(comunidadesAtualizadas)
              console.log(comunidades);
              {/** */ }


            }}>
              <div>
                <input
                  placeholder="Qual vai ser o nome?"
                  name="title"
                  aria-label=""
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="coloque o link"
                  name="imagem"
                  aria-label="coloque o link"
                  type=""
                />
              </div>
              <button>
                Criar Comunidade
              </button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBox title="Seguidores" items={seguidores} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`} >
                      <img src={(itemAtual.image)} />
                      {/*<img src={`https://github.com/${itemAtual}.png`}/> */}
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`} >
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>

      </MainGrid>
    </>
  )

}
