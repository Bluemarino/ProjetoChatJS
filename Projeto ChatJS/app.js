var app = require('http').createServer(resposta);
var fs = require('fs');
var io = require('socket.io')(app);

app.listen(3003);
console.log("Servidor está online!");

function resposta (req, res) {
    var arquivo = "";
    if(req.url == "/"){
        arquivo = __dirname + '/index.html';
    }else{
        arquivo = __dirname + req.url;
    }
    fs.readFile(arquivo,
    function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Ocorreu um problema ao carregar a página!');
        }
    res.writeHead(200);
    res.end(data);
    });
}



    io.on("connection", function(socket){
        socket.on("enviar mensagem", function(mensagem_enviada, callback){
            mensagem_enviada = "[ " + pegarDataAtual() + " ]: " + mensagem_enviada;
     
            io.sockets.emit("atualizar", mensagem_enviada);
            callback();
        });
   });
   function pegarDataAtual(){
     var dataAtual = new Date();
     var dia = (dataAtual.getDate()<10 ? '0' : '') + dataAtual.getDate();
     var mes = ((dataAtual.getMonth() + 1)<10 ? '0' : '') + (dataAtual.getMonth() + 1);
     var ano = dataAtual.getFullYear();
     var hora = (dataAtual.getHours()<10 ? '0' : '') + dataAtual.getHours();
     var minuto = (dataAtual.getMinutes()<10 ? '0' : '') + dataAtual.getMinutes();
     var segundo = (dataAtual.getSeconds()<10 ? '0' : '') + dataAtual.getSeconds();
     
     var dataFormatada = dia + "/" + mes + "/" + ano + " " + hora + ":" + minuto + ":" + segundo;
     return dataFormatada;
   
    }
    var io = require('socket.io')(app);
var usuarios = [];
io.on("connection", function(socket){
socket.on("entrar", function(apelido, callback){
         if(!(apelido in usuarios)){
socket.apelido = apelido;
              usuarios[apelido] = socket;
              callback(true);
         }else{
              callback(false);
         }
     });
     socket.on("enviar mensagem", function(mensagem_enviada, callback){
         mensagem_enviada = "[ " + pegarDataAtual() + " ] " + socket.apelido + " diz: " + mensagem_enviada;
         io.sockets.emit("atualizar mensagens", mensagem_enviada);
         callback();
         return callback;
     });
});
