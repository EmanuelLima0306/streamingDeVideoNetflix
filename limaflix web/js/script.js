let userLogado = null;
const urlBase = "http://127.0.0.1:5000";

$(document).ready(function () {
  init();
  initComponents();
});

function init(){
  const usuario = JSON.parse(window.localStorage.getItem('userLogado'));
  console.log(usuario)
  if(usuario != null){
    window.location.replace(`home.html`);
  }
}


function initComponents(){

  $('#formLogin').on('submit', e=>{
      e.preventDefault();
      nome_user = $('#email').val();
      senha = $('#senha').val();
      login(nome_user,senha);
  });

  $('#btnCreateUser').on('click', e=>{
    gravarUsuario();
  });

  $('#btnCancelCreateUser').on('click', e=>{
    limparNovaConta();
  });

}

/* Criacao de conta de Usuario */

function limparLogin(){
  $('#email').val("");
  $('#senha').val("");
}

function limparNovaConta(){
  $('#newNome').val("");
  $('#newEmail').val("");
  $('#newSenha').val("");
  $('#newConfirmarSenha').val("");
  limparLogin();
}

function gravarUsuario(){

  newNome = $('#newNome').val();
  newEmail = $('#newEmail').val();
  newSenha = $('#newSenha').val();
  newConfirmarSenha = $('#newConfirmarSenha').val();
  // alert(newNome);
  if(newNome.toLowerCase() === '' || newEmail.toLowerCase() === '' || newSenha.toLowerCase() === ''){
    alert('Preencha os Campos em Branco');
  }else{
    if(newSenha.toLowerCase() === newConfirmarSenha.toLowerCase()){
      body = {nome:newNome, nome_user:newEmail, senha:newSenha}
      put('/create',body,'POST').then(async response=>{
        var jsonBody = await response.json();
        if(jsonBody.status == 200){
          userLogado = JSON.parse(jsonBody.data);
          limparNovaConta();
          alert('Conta Criada Com Sucesso');
          login(userLogado.nome_user,userLogado.senha);
        }else{
          alert(jsonBody.message)
        }
      });
    }else{
      alert('As Senhas Não Condizem');
    }
  }
}

function login(nome_user,senha){
 
  body={nome_user:nome_user, senha:senha}; 
  put('/',body,'POST').then( async response =>{
    var jsonBody = await response.json();
      if(jsonBody.status==200){
        userLogado = JSON.parse(jsonBody.data); // transforme o objecto usuario em json
        window.location.replace(`home.html`); // redireciona o usuario a home
        window.localStorage.setItem('userLogado',JSON.stringify(userLogado)); // adiciona o usuario em uma sessao
        limparLogin();
      }else{
        window.location.replace(`index.html`); // redireciona o usuario no index( login )
      }
  }).catch(ex=>{
    alert('Verifica a sua Conexão a internet')
  });
}

async function response(url, method) {
  var response = await fetch(`${urlBase}${url}`, {
    method: `${method}`,
    mode: "cors",
    cache: "default",
    headers:{
      "Content-type":"application/json; charset=utf-8"
    }
  });
  return response;
}
async function put(url, body,method) {
  
  var response = await fetch(`${urlBase}${url}`, {
    method: method,
    body: JSON.stringify(body),
    headers:{
      "Content-type":"application/json; charset=utf-8"
    }
  });
  return response;
}



