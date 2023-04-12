import chalk from 'chalk';
//const chalk = require('chalk'); | mesma forma que o import (antiga)

// console.log(chalk.white.bgMagenta.bold(' olá mundo '));
// console.log(chalk.blue(' aqui ',' há ',' algo! '));
// console.log(chalk.red(' diferente ', chalk.underline.magenta(' diferenciado ')));
// console.log(
//     `
//     CPU: ${chalk.red('90%')}
//     RAM: ${chalk.green('40%')}
//     DISK: ${chalk.yellow('70%')}
//     `
// );

// Function async por conta do Promise
function promessa(bool){
    const x = bool;
    return new Promise((resolve,reject) => {
        if(!x){
            reject(new Error(chalk.red('falha na promessa!')));
        }
        resolve('Sucesso na promessa!');
    });
}
function exibir_resposta(texto_resposta){
    console.log(chalk.green(texto_resposta));
}
promessa(true)
.then((texto)=> exibir_resposta(texto))