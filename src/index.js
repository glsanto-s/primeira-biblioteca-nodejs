import fs from 'fs';
import chalk from "chalk";

function extrair_links(texto){
    const expressao_regular = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(expressao_regular)] //estamos pedindo para ele expandir o elemnto interável dentro de um array
    // .map percorrendo o array
    const resultados = capturas.map(captura => ({[captura[1]]:captura[2]}));
    // console.log(resultados);
    // se o tamanho do resultado for diferente ( !== ) de 0 retorna ( ? ) resultados se não ( : ) mensagem
    return resultados.length !== 0 ? resultados : 'não há links no arquivo!';
}

function tratar_erro(erro){
    // throw - lançar/jogar
    throw new Error(chalk.red(erro.code, 'não há arquivo no diretório!'));
}

// V3| Async & Await
// o async aqui serve para "avisar o javascript" que dentro do bloco dessa função vai existir código assíncrono que precisa ser resolvido antes do retorno
async function pegar_arquivo(caminho_do_arquivo){
    try{
        const encondng = 'utf-8';
        // o await precisa adicionar nos trechos de códigos onde temo que aguardar uma promessa retornar/algo ser processado
        const texto = await fs.promises.readFile(caminho_do_arquivo, encondng)
        return extrair_links(texto);
    }
    catch (erro) {
        tratar_erro(erro);
    }
    // finally{
    //     console.log(chalk.cyan("Fim da operação!"));
    // }
}
export default pegar_arquivo;

// mostrando o arquivo que pegamos
pegar_arquivo('./arquivos/texto.md');

// V2| Refatoração: código assíncrono promises com then
// function pegar_arquivo(caminho_do_arquivo){
//     const encondng = 'utf-8';
//     fs.promises.readFile(caminho_do_arquivo, encondng)
//     // Então | Serve para encadear o código
//     .then((texto) => console.log(chalk.green(texto)))
//     // Pegar | Serve para chamar a função do tratamento de erro 
//     .catch(tratar_erro)
// }

// V1 | Aqui seria um código síncrono
// function pegar_arquivo(caminho_do_arquivo){
//     const encondng = 'utf-8';
//     // 1º o arquivo que vamos ler | 2º o codificador | 3º função de erro & retorno
//     // _ serve para ex: "aqui vai um parâmetro porém ignore ele"
//     fs.readFile(caminho_do_arquivo, encondng, (erro, resposta) =>{
//         if(erro){
//             tratar_erro(erro);
//         }
//         console.log(chalk.green(resposta));
//     })
// }
