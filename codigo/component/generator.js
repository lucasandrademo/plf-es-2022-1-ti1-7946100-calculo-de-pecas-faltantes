function id(length) {
    let resultado = '';
    let characteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let characteresTamanho = characteres.length;
    for ( let i = 0; i < length; i++ ) {
        resultado += characteres.charAt(Math.floor(Math.random() * characteresTamanho));
    }
    return resultado;
}
export {id}
