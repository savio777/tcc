const signalhub = require('signalhub')

const hub = signalhub('my-app', ['http://localhost:8080'])


hub.subscribe('update').on('data', (data) => {
    document.getElementById('mensagem').textContent = data + '\n'
    console.log(data)
})

document.getElementById('enviar').addEventListener('click', () => {
    hub.broadcast('update', document.getElementById('suaMensagem').value)
})

/* //a cada segundo enviar dados para as pontas atualizarem 
setInterval(() => {
    hub.broadcast('update', window.location.hash)
}, 1000)
*/
