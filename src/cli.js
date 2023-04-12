// Aqui é onde vai haver o código de manipulação do java scrpt com o terminal
// Responsável por pegar os argumentos da linha de comando!

import pegar_arquivo from "./index.js";
import lista_validada from "./https-validacao.js";
import chalk from "chalk";
import fs from "fs";

// argv = valores de argumentos
const caminho = process.argv;

async function imprimir_lista(valida,resultado,identificador = ''){
    if(valida){

        console.log(chalk.yellow('Arquivo validado:'),
        chalk.magenta(identificador), 
        await lista_validada(resultado));
    }
    else{
        console.log(chalk.yellow('Arquivo:'),
        chalk.magenta(identificador), 
        resultado);
    }
}

// function async por conta q ela também precisa "esperar" a resposta de outra function async
async function processar_texto(argumentos){
    const caminho = argumentos[2];
    // aqui pega o argumento no índice 3 e só guarda se o valor for --valida
    const valida = argumentos[3] === '--valida';
    try {
        fs.statSync(caminho);
    } catch (erro) {
        if(erro.code ==="ENOENT"){
            console.log(chalk.red('Arquivo ou diretório não existe!'));
            return; //apenas para não mostrar o erro no terminal e só apenas o console.log
        }
    }

    if(fs.lstatSync(caminho).isFile()){
        const resultado = await pegar_arquivo(caminho);
        imprimir_lista(valida,resultado);
    } 
    else if(fs.lstatSync(caminho).isDirectory()){
        const arquivos = await fs.promises.readdir(caminho);

        // foreach - percore o array | array function tmb async
        arquivos.forEach( async (nome_do_arquivo) => {
            const lista = await pegar_arquivo(`${caminho}/${nome_do_arquivo}`);
            imprimir_lista(valida,lista,nome_do_arquivo);
        })
        console.log(arquivos);
    }
}
processar_texto(caminho);