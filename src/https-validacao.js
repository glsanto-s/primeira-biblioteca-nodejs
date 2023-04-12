//toda lógica para pegar a lista de links, extrair as urls, validar as mesma e retornar o resuldado
import chalk from "chalk";

function extrair_links(array_de_links) {
  return array_de_links.map((objeto_link) => Object.values(objeto_link).join());
  // map - percorrendo o array | object.values - extrai os links |.join - converte para string ( fora dos [] )
}

async function checar_status(lista_url) {
  const array_status = await Promise.all(
    lista_url.map(async (url) => {
      try {
        // o retorno do fetch é uma promessa
        // fetch lida com um recurso por vez
        const response = await fetch(url);
        // status resposta
        return `${response.status} - ${response.statusText} `;
      } catch (erro) {
        return tratar_erro(erro);
      }
    })
  );
  return array_status;
}

function tratar_erro(erro) {
  if (erro.cause.code === "ENOTFOUND") {
    return "link não encontrado";
  } else {
    return "houve um problema :(";
  }
}

export default async function lista_validada(lista_de_links) {
  const links = extrair_links(lista_de_links);
  const status = await checar_status(links);
  // console.log(status);

  return lista_de_links.map((objeto, indice) => ({
    ...objeto,
    status: status[indice],
  }));
}

// [gatinho salsicha](http://gatinhosalsicha.com.br/)
