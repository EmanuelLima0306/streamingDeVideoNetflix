var speed = 1;
let userLogado = null;
var filmes = [];
const urlBase = "http://127.0.0.1:5000";
/*
const filmes = [


   {id: 2, temporadas:[], title:'Cinquenta Tons Mais Escuros', trailer: '', ano:2017, genero: 'Romance',descricao: 'O longa exemplifica claramente o poder do trauma na vida de uma pessoa e como isso molda a sua personalidade. Dessa forma, temos exemplificado os gatilhos que movimentam as ações extremas de uma pessoa.', imagem: 'capa.png', imageTitle: 'Title.png', filme: 'Cinquenta.Tons.Mais.Escuros.2017.Sem.Censura.720p.BluRay.x264.DUBLADO-BLUDV.mp4', url:'videos/filmes/CinquentaTonsMaisEscuros2017/', elenco: 'Dakota Johnson, Jamie Dornan, Bella Heathcote', genero: 'Romance, Erótico, Drama', cenas: 'Jamie Dornan desabafa sobre ódio que sofreu por causa da franquia.', especificacao: 'filme', gosto: null, lista: false,currentTime: 0}
   ,{id: 3, temporadas:[], title:'After', trailer: 'Trailer.mp4', ano:2019, genero: 'Romance',descricao: 'segue a história de autodescoberta e despertar sexual de Tessa Young, uma estudante de 18 anos, que sai de casa onde mora com a mãe, uma mulher autoritária e preconceituosa, para iniciar os seus estudos na universidade de Washington.', imagem: 'maxresdefault.jpg', imageTitle: 'Title.png', filme: 'After.2019.720p.WEBRip.x264.DUBLADO-WwW.LAPUMiAFiLMES.COM.mp4', url:'videos/filmes/After2019/', elenco: 'Josephine Langford. Personagem : Tessa Young ; Hero Fiennes Tiffin,  Samuel Larsen, Dylan Arnold.', genero: 'Drama , Romance', cenas: 'O jovem Hardin testemunhou um terrível acontecimento que envolveu a sua mãe, deixando-o traumatizado. Começou a ter pesadelos', especificacao: 'filme', gosto: null, lista: null,currentTime: 0}
   ,{id: 4, temporadas:[], title:'Jiu Jitsu', trailer: 'Trailer.mp4', ano:2020, genero: 'Acção',descricao: ' Em Jiu Jitsu, uma ordem antiga de lutadores precisam enfrentar um invasor alienígena, de seis em seis anos, para garantir a segurança da Terra.', imagem: 'capa.png', imageTitle: 'Title.png', filme: 'jiujitsu.mkv', url:'videos/filmes/JiuJitsu2021/', elenco: 'Dimitri Logothetis com Nicolas Cage, Alain Moussi, Marie Avgeropoulos.', genero: 'Acção', cenas: '', especificacao: 'filme', gosto: null, lista: null,currentTime: 0}
   ,{id: 5, temporadas:[], title:'Hitman Agente 47', trailer: 'Trailer.mp4', ano:2020, genero: 'Acção',descricao: ' Em Jiu Jitsu, uma ordem antiga de lutadores precisam enfrentar um invasor alienígena, de seis em seis anos, para garantir a segurança da Terra.', imagem: 'capa.png', imageTitle: 'Title.png', filme: 'Hitman.mp4', url:'videos/filmes/HitmanAgente47/', elenco: 'Dimitri Logothetis com Nicolas Cage, Alain Moussi, Marie Avgeropoulos.', genero: 'Acção', cenas: '', especificacao: 'filme', gosto: null, lista: null,currentTime: 0}
   ,{id: 6, temporadas:[], title:'Posto de Combate', trailer: 'Trailer.mp4', ano:2020, genero: 'Acção',descricao: ' É o retrato da representação política do cinema aplaudido de pé pelos invasores do Congresso.', imagem: 'capa.png', imageTitle: 'Title.png', filme: 'postoDeCombate.mkv', url:'videos/filmes/PostoDeCombate/', elenco: 'Scott Eastwood; Staff Sergeant Clint Romesha ; Caleb Landry Jones', genero: 'Acção', cenas: '', especificacao: 'filme', gosto: null, lista: null,currentTime: 0}
   ,{id: 7, temporadas:[], title:'Uma Noite de Crime', trailer: 'Trailer.mp4', ano:2014, genero: 'Acção, Terror',descricao: 'Num futuro próximo, o governo dos Estados Unidos instituem a Noite de Crime, um evento onde os assassinatos são permitidos.', imagem: 'capa.png', imageTitle: 'Title.png', filme: 'postoDeCombate.mkv', url:'videos/filmes/UmaNoiteDeCrime14/', elenco: 'Scott Eastwood; Staff Sergeant Clint Romesha ; Caleb Landry Jones', genero: 'Acção', cenas: '', especificacao: 'filme', gosto: null, lista: null,currentTime: 0}
   ,{id: 8, temporadas:[], title:'Barbie As Espiãs', trailer: 'Trailer.mp4', ano:2016, genero: 'Acção, Terror',descricao: 'Uma agência de espionagem tecnologicamente avançada transforma Barbie e as suas amigas em agentes secretas e incumbe-as de deter uma ladra com os seus dotes de ginástica.', imagem: 'capa.webp', imageTitle: 'title.webp', filme: '1.mp4', url:'videos/anime/barbie/', elenco: 'Scott Eastwood; Staff Sergeant Clint Romesha ; Caleb Landry Jones', genero: 'Acção', cenas: '', especificacao: 'Anime', gosto: null, lista: null,currentTime: 0}
   
 

  ,{id: 1,title:'Alice In Borderland', trailer: 'Trailer.mp4', ano:2022, genero: 'Drama; Suspense',descricao: 'Tendo conhecido Usagi, Tao Tsuchiya, uma garota que se move sozinha na disputa, Arusi decide se juntar a ela para desvendar os segredos do novo mundo paralelo.', imagem: 'capa.jpg', imageTitle: 'title.png',filme: 'After.2019.720p.WEBRip.x264.DUBLADO-WwW.LAPUMiAFiLMES.COM.mp4', url:'videos/series/AliceinBorderland/', elenco: ' Kento Yamazaki, Tao Tsuchiya, Yûki Morinaga, Chota Keita Machida ; Tao Tsuchiya', especificacao: 'Série', gosto: null, lista: false,currentTime: 0,
  temporadas: [
    {title: 'A rebeliao 1',numero: 1, episodeos: [
      {numero: 1,id: 01, temporadas:[], title:'Episódio 1', ano:2022, genero: 'Drama, Suspens',descricao: 'Arisu e os amigos entram numa casa de banho pública para se esconderem da polícia. Ao saírem, descobrem que as ruas de Tóquio estão desertas.', imagem: 'capa1.jpg', imageTitle: 'Title.png', filme: '1.mkv', url:'videos/series/AliceinBorderland/', elenco: 'Itzan Escamilla,Miguel Bernardeau,Danna Paola', genero: 'Acção, Aventura, Drama', cenas: 'Jogo', especificacao: 'filme',currentTime: 0}
      ,{numero: 2,id: 02, temporadas:[], title:'Episódio 2', ano:2022, genero: 'Drama, Suspens',descricao: 'Arisu e Karube deixam o ferido Chota e avançam para ganharem mais experiência. Ao chegarem a um apartamento, espera-os um jogo da apanhada mortal.', imagem: 'capa2.jpg', imageTitle: 'Title.png', filme: '2.mkv', url:'videos/series/AliceinBorderland/', elenco: 'Itzan Escamilla,Miguel Bernardeau,Danna Paola', genero: 'Acção, Aventura, Drama', cenas: 'Jogo', especificacao: 'filme',currentTime: 0}
    ]}
  ]}

  ,{id: 8,title:'O Atirador', trailer: 'Trailer.mp4', ano:2018, genero: 'Drama; Suspense',descricao: 'Tendo conhecido Usagi, Tao Tsuchiya, uma garota que se move sozinha na disputa, Arusi decide se juntar a ela para desvendar os segredos do novo mundo paralelo.', imagem: 'capa.jpg', imageTitle: 'title.webp',filme: 'After.2019.720p.WEBRip.x264.DUBLADO-WwW.LAPUMiAFiLMES.COM.mp4', url:'videos/series/OAtirador/', elenco: ' Kento Yamazaki, Tao Tsuchiya, Yûki Morinaga, Chota Keita Machida ; Tao Tsuchiya', especificacao: 'Série', gosto: null, lista: false,currentTime: 0,
  temporadas: [
    {title: 'A rebeliao 1',numero: 1, episodeos: [
      {numero: 1,id: 01, temporadas:[], title:'Episódio 1', ano:2022, genero: 'Drama, Suspens',descricao: 'Agora a viver uma vida pacífica, o antigo atirador dos Marines Bob Lee Swagger aceita ajudar o seu antigo comandante a impedir o assassinato do presidente dos EUA.', imagem: 'capa1.jpg', imageTitle: 'Title.png', filme: '1.mp4', url:'videos/series/OAtirador/temporada1/', elenco: 'Itzan Escamilla,Miguel Bernardeau,Danna Paola', genero: 'Acção, Aventura, Drama', cenas: 'Jogo', especificacao: 'filme',currentTime: 0}
      ,{numero: 2,id: 02, temporadas:[], title:'Episódio 2', ano:2022, genero: 'Drama, Suspens',descricao: 'Colocado numa prisão federal, Bob Lee jura proteger a sua família. Isaac planeia o próximo passo. Memphis tenta entrar em contacto com a mulher de Bob Lee.', imagem: 'capa2.jpg', imageTitle: 'Title.png', filme: '2.mp4', url:'videos/series/OAtirador/temporada1/', elenco: 'Itzan Escamilla,Miguel Bernardeau,Danna Paola', genero: 'Acção, Aventura, Drama', cenas: 'Jogo', especificacao: 'filme',currentTime: 0}
    ]}
    ,{title: 'A rebeliao 2',numero: 2, episodeos: [
      {numero: 1,id: 11, temporadas:[], title:'Episódio 1', ano:2022, genero: 'Drama, Suspens',descricao: 'Bob Lee viaja para a Alemanha com Julie para assistir à cerimónia de condecoração de um Marine da sua antiga unidade. Memphis aceita uma nova oferta de emprego.', imagem: 'capa1.jpg', imageTitle: 'Title.png', filme: '1.mp4', url:'videos/series/OAtirador/temporada2/', elenco: 'Itzan Escamilla,Miguel Bernardeau,Danna Paola', genero: 'Acção, Aventura, Drama', cenas: 'Jogo', especificacao: 'filme',currentTime: 0}
    ]}
  ]}
];
*/

let index = 0;
let cont = 0;

$(document).ready(function () {
  trocarCorMenu();
  //homePage(); // carregas todos o videos
  init();

  //setTimeout(topDez, 0);

  initComponents()
});



function initComponents(){

  $('#formLogin').on('submit', e=>{
      e.preventDefault();
      nome_user = $('#email').val();
      senha = $('#senha').val();
      login(nome_user,senha);
  });

  $('#btnLogout').on('click', e=>{
    logout();
  });

  $('#btnCreateUser').on('click', e=>{
    gravarUsuario();
  });

  $('#btnCancelCreateUser').on('click', e=>{
    limparNovaConta();
  });

  
  // 
}

function trocarCorMenu() {
  // adiciona cor do menu apos 200px do scroll

  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 100) {
      $("#navBar").addClass("corMenu");
    } else {
      $("#navBar").removeClass("corMenu");
    }
  });
}

function logar(){
  
}

function init() {
  response("/filmes", "GET").then((response) => {
    response.json().then((value) => {
      filmes = value;
      homePage();
      setTimeout(topDez, 0);
    });
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

function topDez() {
  // Mostra os 10 filmes em forma de sugestao

  if (cont > filmes.length - 1 || cont == 5) {
    cont = 0;
  }
  let filme = filmes[cont];
  cont++;

  if (filme.gosto != false) {
    const widthTitle = $("#hero_logo").css("width"); //pega o tamanho do titlo em imagem
    $("#hero").animate({ opacity: 0 }, 50); // reduz a opacidade numa escala de 50 mil segundos
    $("#hero").css("background-image", "url(" + filme.url + filme.imagem + ")"); // troca a imagem do fundo
    $("#hero_logo").animate({ opacity: 0 }, 0); //reduz o tamanho do titlo
    $("#hero").animate({ opacity: 1 }, 500); // aumenta a opacidade
    $("#hero_logo").animate({ opacity: 1 }, 4000); // Aumenta o tamanho do titlo
    $("#hero_logo").attr("src", "" + filme.url + filme.imageTitle + ""); // troca a imagem do titlo
    $("#hero").data("filme", filme); // Adiciona o objecto filme na vitrine
    setTimeout(topDez, 10000);
  } else {
    setTimeout(topDez, 10000);
  }
}

function pesquisar() {
  // Faz a pesquisa apartir do campo no menu
  sorted($("#searchMove").val(), "Resulta da Pesquisa");
}

function sorted(value, title) {
  // busca de acordo o valor passado
  if (!value) {
    homePage();
  } else {
    $("#main-content").empty();
    var componete = `
    <section>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h5 class="text-white">${title}</h5>
        </div>
      </div>
    </div>
    <div class="col-12">
      <ul class="filme_lista">
    `;

    filmes.forEach((movie) => {
      if (
        movie.title.toLowerCase().includes(value.toLowerCase()) ||
        movie.genero.toLowerCase().includes(value.toLowerCase()) ||
        movie.descricao.toLowerCase().includes(value.toLowerCase()) ||
        String(movie.ano).toLowerCase().includes(value.toLowerCase())
      ) {
        componete += addFilme(movie);
      }
    });

    componete += `</ul>
        </div>
      </section>
      `;

    $("#main-content").append(componete);
    addEventoPlayVideoToCard();
    addEventosToCard();
    prevAndNextMovies();
  }
}

function sourchMove() {
  // carrega tudo que é filme
  $("#main-content").empty();
  addMovies(filmes, "Filme", "Filmes");
  addEventoPlayVideoToCard();
  addEventosToCard();
  prevAndNextMovies();
}

function sourchSerie() {
  // carrega tudo que e serie
  $("#main-content").empty();
  addMovies(filmes, "Série", "Séries");
  addEventoPlayVideoToCard();
  addEventosToCard();
  prevAndNextMovies();
}

function sourchAnime() {
  // Carrega tudo que e Anime
  $("#main-content").empty();
  addMovies(filmes, "Anime", "Animes");
  addEventoPlayVideoToCard();
  addEventosToCard();
  prevAndNextMovies();
}

function homePage() {
  // carrga todas as series, filmes e animes
  $("#main-content").empty();
  addMovies(filmes, "Filme", "Filmes");
  addMovies(filmes, "série", "Séries");
  addMovies(filmes, "Anime", "Desenhos Animados");
  addEventoPlayVideoToCard();
  addEventosToCard();
  prevAndNextMovies();
}

function sourchLike() {
  // Carregada todos com gosto
  response("/filmesLike", "GET").then((response) => {
    response.json().then((results) => {
      
      //filmes = values; // pega Todos os filmes com Gosto

      $("#main-content").empty();
      var componete = `
        <section>
        <div class="container">
          <div class="row">
            <div class="col-12">
              <h5 class="text-white">Lista de Gostos</h5>
            </div>
          </div>
        </div>
        <div class="col-12">
          <ul class="filme_lista">
        `;
        results.forEach((filme)=>{
        componete += addFilme(filme);
      });

      console.log(componete);
      componete += `</ul>
      </div>
      </section>
      `;

      $("#main-content").append(componete);
      addEventoPlayVideoToCard();
      addEventosToCard();
      prevAndNextMovies();
    });
  });
}

function sourchLista() {
  // Carrega todos da lista +
  $("#main-content").empty();
  var componete = `
  <section>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h5 class="text-white">Lista de Favoritos</h5>
      </div>
    </div>
  </div>
  <div class="col-12">
    <ul class="filme_lista">
  `;

  filmes.forEach((movie) => {
    if (movie.lista == true) {
      componete += addFilme(movie);
    }
  });

  componete += `</ul>
      </div>
    </section>
    `;

  $("#main-content").append(componete);
  addEventoPlayVideoToCard();
  addEventosToCard();
  prevAndNextMovies();
}

function getFilmeById(id){
  let result = {};
  filmes.forEach((filme)=>{
    if(filme.id==id){
      return result = filme;
    }
  });
  return result;
}

function addEventosToCard() {
  // adiciona eventos gostar,nao gostar, lista na modal e na home

  $(".gosto").click(function (e) {
    // adiciona gosto sem abrir a  modal
    const id = this.id;
    const indice = id.split("-")[1];
    let filme = getFilmeById(indice);
    
     if (id.toLowerCase() === `gostoVideo-${indice}`.toLowerCase()) {
      filme.gosto = filme.gosto == true ? null : true;
    }else{
      filme.gosto = filme.gosto == false ? null : false;
    }
    put(`/filmes/update/${indice}`,filme,'PUT').then(result=>{
      result.json().then(value=>{
        if (filme.gosto) {
          $(`.gostoVideo-${indice}`).removeClass("opacity-50");
          $(`.gostoVideo-${indice}`).addClass("opacity-100");
          $(`.naoGostoVideo-${indice}`).removeClass("opacity-100");
          $(`.naoGostoVideo-${indice}`).addClass("opacity-50");
        } else if(filme.gosto == false) {
            $(`.naoGostoVideo-${indice}`).removeClass("opacity-50");
            $(`.naoGostoVideo-${indice}`).addClass("opacity-100");
            $(`.gostoVideo-${indice}`).removeClass("opacity-100");
            $(`.gostoVideo-${indice}`).addClass("opacity-50");
        }else{
          $(`.gostoVideo-${indice}`).removeClass("opacity-100");
          $(`.gostoVideo-${indice}`).addClass("opacity-50");
          $(`.naoGostoVideo-${indice}`).removeClass("opacity-100");
          $(`.naoGostoVideo-${indice}`).addClass("opacity-50");
        }
      });
    });
  });

  $(".addLista").click(function (e) {
    // adiciona nao gosto sem abrir a  modal
    const indice = this.id.split("-")[1];
    filmes[indice].lista = filmes[indice].lista == true ? null : true;
    if (filmes[indice].lista) {
      $(`.addLista-${indice}`).removeClass("opacity-50");
      $(`.addLista-${indice}`).addClass("opacity-100");
    } else {
      $(`.addLista-${indice}`).removeClass("opacity-100");
      $(`.addLista-${indice}`).addClass("opacity-50");
    }
  });
}

function addEventoPlayVideoToCard() {
  // Adiciona evento assistir no cartao da home
  $(".playVideo").on("click", function (e) {
    //  reproduz o video ao clicar no play sem abri a modal
    const indice = this.id.split("-")[1];
    let filme = getFilmeById(indice);
    reproduzir(filme);
  });
}

function filmModal(id) {
  // carega a modal do fime passado por indice
  let filme = getFilmeById(id);
  modal(filme);
}

function addMovies(movies, genero, cabecalho) {
  // Adiciona filmes de acordo ogenero

  //Cria um Id para
  var idLista = "id" + $.trim(cabecalho);

  var componete = `
  <section>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h5 class="text-white">${cabecalho}</h5>
      </div>
    </div>
  </div>
  <div class="col-12 carousel" id="carouselExampleControls" data-bs-ride="carousel">
    <ul class="filme_lista carousel-inner" id="${idLista}">
  `;

  movies.forEach((movie) => {
    if (movie.especificacao.toLowerCase() === genero.toLowerCase()) {
      componete += addFilme(movie);
    }
  });

  componete += `</ul>
    <button class="carousel-control-prev button-carousel" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev" id="prev-${idLista}">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next button-carousel" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next" id="next-${idLista}">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
  </div>
    </section>
    `;
  $("#main-content").append(componete);
}

function prevAndNextMovies() {
  // Move para mostrar os outros filmes da home

  var multipleCardCarousel = document.querySelector("#carouselExampleControls");
  if (window.matchMedia("(min-width: 768px)").matches) {
    var carousel = new bootstrap.Carousel(multipleCardCarousel, {
      interval: false,
    });
    var carouselWidth = $(".carousel-inner")[0].scrollWidth;
    var cardWidth = $(".filme").width();
    var scrollPosition = 0;
    $("#carouselExampleControls .carousel-control-next").on(
      "click",
      function () {
        const idLista = this.id.split("-")[1]; //pega apenas o id da lista clicada
        if (scrollPosition < carouselWidth - cardWidth * 4) {
          scrollPosition += cardWidth * 4;
          $(`#carouselExampleControls #${idLista}`).animate(
            { scrollLeft: scrollPosition },
            600
          );
        }
      }
    );
    $("#carouselExampleControls .carousel-control-prev").on(
      "click",
      function () {
        const idLista = this.id.split("-")[1]; //pega apenas o id da lista clicada
        if (scrollPosition > 0) {
          scrollPosition -= cardWidth * 4;
          $(`#carouselExampleControls #${idLista}`).animate(
            { scrollLeft: scrollPosition },
            600
          );
        }
      }
    );
  } else {
    $(multipleCardCarousel).addClass("slide");
  }
}

function addFilme(filme) {
  //Adiciona o filme na homePage

  var gosto = filme.gosto ? "opacity-100" : "opacity-50";
  var naoGosto = filme.gosto == false ? "opacity-100" : "opacity-50";
  var lista = filme.lista == true ? "opacity-100" : "opacity-50";
  //index = filmes.findIndex((i) => i.id === filme.id && i.title === filme.title);
  id = filme.id;

  var component = `
  <li class="filme">
  <img src='${filme.url + filme.imagem}' class="img-fluid image-movie" data-bs-toggle="modal" data-bs-target="#modal-filme" onclick=filmModal(${id})>
  <div class="filme_info">
    <div class="col-12">
      <a class="btn-custom-round btn btn-light rounded-circle playVideo" id="playVideo-${id}">
        <span class="mdi mdi-play"></span>
      </a>
      <button href="" class="btn-custom-round border-white btn rounded-circle ${gosto} gosto gostoVideo-${id}" id ="gostoVideo-${id}">
        <span class="mdi mdi-thumb-up text-white"></span>
      </button>
      <button href="" class="btn-custom-round border-white btn  ${naoGosto} rounded-circle opacity-50 gosto naoGostoVideo-${id}" id ="naoGostoVideo-${id}">
        <span class="mdi mdi-thumb-down text-white"></span>
      </button>
      <button href="" class="btn-custom-round border-white btn rounded-circle ${lista} opacity-50 addLista addLista-${id}" id ="addLista-${id}">
        <span class="mdi mdi-plus text-white"></span>
      </button>
    </div>
    <p>T3:Ep5 <text>${filme.title + " " + filme.ano}</text></p>
  </div>
</li>
`;
  return component;
}

function reproduzir(filme) {
  // reproduz o filme

  var url = filme.url;
  url += filme.temporadas.length > 0 ? filme.trailer : filme.filme;
  var component = `
  <div class="container-fluid mw-100" id="div_video">
    <div class="row" id="container_top_video">
      <div class="col">
        <button class="btn-custom-round btn  opacity-100 btn_top_video" id="btn_video_close" onclick="closeScreenVideo()">
          <span class="mdi mdi-arrow-left text-white"></span>
        </button>
      </div>
      <div class="col text-right">
        <button class="btn-custom-round btn  opacity-100 btn_top_video text-right" id="btn_video_info">
        <span class="mdi mdi-information-variant text-white"></span>
        </button>
      </div>
    </div>
      <video class="bg-l" autoplay style="height: 100%; width: 773px;" tabindex="-1" id="video_screen" onclick="playAndStopVideo()">
        <source src='${url}' type="video/mp4">
        <source src='${url}' type="video/ogg">
        <source src='${url}' type="video/webm">
      Your browser does not support the video tag.
    </video>

    <div class="row" id="container_controls">
      <div class="col">
        <button class="btn-custom-round btn  opacity-100 btn_playAndPause" onclick="playAndStopVideo()">
          <span class="mdi mdi-pause text-white" id="btn_playAndPause"></span>
        </button>
      </div>
      <div class="col">
        <button class="btn-custom-round btn  opacity-100 btn_restart" id="btn_restar" onclick="restartVideo()">
          <span class="mdi mdi-restart text-white"></span>
        </button>
      </div>
      <div class="col">
        <button class="btn-custom-round btn  opacity-100 btn_rewind" id="btn_forward" onclick="openFullscreen()">
          <span class="mdi mdi-fullscreen text-white" id="btn_screen"></span>
        </button>
      </div>
      <div class="col timer">
        <div id="timerBar"></div>
        <span id="timer">00:00</span>
      </div>
      <div class="col">
        <button class="btn-custom-round btn  opacity-100 btn_rewind" id="btn_rewind" onclick="rewindVideo()">
          <span class="mdi mdi-rewind-10 text-white"></span>
        </button>
      </div>
      <div class="col">
        <button class="btn-custom-round btn  opacity-100 btn_rewind" id="btn_forward" onclick="forwardVideo()">
          <span class="mdi mdi-fast-forward-10 text-white"></span>
        </button>
      </div>
      <div class="col" id="volumeControl">
        <div class="row">
          <div class="col">
            <input type="range" id="volume" min="0" max="1" step="0.1" value="1">
          </div>
          <div class="col">
            <h6 id="volumeValue">100%</h6>
          </div>
        </div>
      </div>
      <div class="col btn-group dropup">
        <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          <span class="mdi mdi-speedometer text-white"></span>
        </button>
        <ul class="dropdown-menu">
          <li>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onclick="setSpeed(0.5)">
              <label class="form-check-label" for="flexRadioDefault1">
                0.5x
              </label>
            </div>
          </li>
          <li>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onclick="setSpeed(0.75)">
            <label class="form-check-label" for="flexRadioDefault1">
              0.75x
            </label>
          </div>
          </li>
          <li>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked onclick="setSpeed(1)">
              <label class="form-check-label" for="flexRadioDefault1">
                1x(Normal)
              </label>
            </div>
          </li>
          <li>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onclick="setSpeed(1.25)">
              <label class="form-check-label" for="flexRadioDefault1">
                1.25x
              </label>
            </div>
          </li>
          <li>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onclick="setSpeed(2)">
              <label class="form-check-label" for="flexRadioDefault1">
                2x
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>
   </div>
  `;
  $("body").append(component); //adiciona o video
  $("body").css("overflow-y", "hidden"); // ocultar o scroll do navegador

  const media = document.querySelector("#video_screen"); // pega o video a ser apresentado
  speed = 1;
  media.currentTime = filme.currentTime; // inicia o video de onde parou da ultima vez
  media.addEventListener("timeupdate", function (event) {
    // altera o tempo da ultima vizualizacao emquanto apresenta
    media.playbackRate = speed;
    filme.currentTime = media.currentTime;
    setTime();
    isHover();
    volume();
  });
}

function volume() {
  $("#volume").on("change", function () {
    $("#video_screen").prop("volume", this.value);
    $("#volumeValue").text(`${this.value * 100}`);
  });
}

function setSpeed(value) {
  // altera a velocidade do filme
  speed = value;
}

function isHover() {
  // da o eventu ao passa o mouse por cima do video

  $("#video_screen").mousemove(function () {
    if (!$("#container_top_video").show()) {
      $("#container_controls").show("slow");
      $("#container_top_video").show("slow");
      $("#video_screen").css("cursor", "auto");
    } else {
      $("#container_controls").show();
      $("#container_top_video").show();
      $("#video_screen").css("cursor", "auto");
    }
    setTimeout(function () {
      if (window.innerHeight == screen.height) {
        // Ocultar se estiver em fullscreen

        if (
          !$("#container_controls").is(":hover") &&
          !$("#container_top_video").is(":hover") &&
          !$(".dropup").is(":hover")
        ) {
          $("#container_controls").hide("slow");
          $("#container_top_video").hide("slow");
          $("#video_screen").css("cursor", "none");
        }
      }
    }, 10000);
  });

  $("#container_controls #container_top_video").mousemove(function () {
    $("#container_controls").show();
    $("#container_top_video").show();
  });
}

/* Funcoes de control da apresentacao dos filmes */
function closeScreenVideo() {
  // feicha o video
  $("#div_video").remove();
  $("body").css("overflow-y", "auto");
}

function playAndStopVideo() {
  // coloca  o video no pause e play

  $("#btn_playAndPause").removeClass("mdi-play");
  $("#btn_playAndPause").removeClass("mdi-pause");
  const media = document.querySelector("#video_screen");

  if (media.paused) {
    $("#btn_playAndPause").addClass("mdi-pause");
    media.play();
  } else {
    $("#btn_playAndPause").addClass("mdi-play");
    media.pause();
  }
}

function restartVideo() {
  // reincia o filme do 0

  $("#btn_playAndPause").removeClass("mdi-play");
  $("#btn_playAndPause").removeClass("mdi-pause");
  const media = document.querySelector("#video_screen");
  media.currentTime = 0;
  media.play();
  $("#btn_playAndPause").addClass("mdi-pause");
}

function rewindVideo() {
  // recua 10 min o video
  const media = document.querySelector("#video_screen");
  media.currentTime -= 10;
}

function forwardVideo() {
  // avanca 10 min o video
  const media = document.querySelector("#video_screen");
  media.currentTime += 10;
}

function setTime() {
  // faz update do tempo e da barra
  const timer = $("#timer");
  const timerlabel = $(".timer");
  const media = document.querySelector("#video_screen");
  const minutes = Math.floor(media.currentTime / 60);
  const seconds = Math.floor(media.currentTime - minutes * 60);

  const minuteValue = minutes.toString().padStart(2, "0");
  const secondValue = seconds.toString().padStart(2, "0");

  const mediaTime = `${minuteValue}:${secondValue}`;
  timer.text(mediaTime);
  const barLength =
    timerlabel.css("width").split("px")[0] *
    (media.currentTime / media.duration);
  $("#timerBar").width(`${barLength}px`);
}

function openFullscreen() {
  // Abri o video em fullscreen e fechar

  const media = document.querySelector("#div_video");
  $("#btn_screen").removeClass("mdi-fullscreen"); // remove os icons
  $("#btn_screen").removeClass("mdi-fullscreen-exit"); //remove os icons

  if (window.innerHeight == screen.height) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
    $("#btn_screen").addClass("mdi-fullscreen");
  } else {
    if (media.requestFullscreen) {
      media.requestFullscreen();
    } else if (media.webkitRequestFullscreen) {
      /* Safari */
      media.webkitRequestFullscreen();
    } else if (media.msRequestFullscreen) {
      /* IE11 */
      media.msRequestFullscreen();
    }
    $("#btn_screen").addClass("mdi-fullscreen-exit");
  }
}

/* Close fullscreen */
function closeFullscreen(elem) {
  if (elem.exitFullscreen) {
    elem.exitFullscreen();
  } else if (elem.webkitExitFullscreen) {
    /* Safari */
    elem.webkitExitFullscreen();
  } else if (elem.msExitFullscreen) {
    /* IE11 */
    elem.msExitFullscreen();
  }
}

function modal(filme) {
  // chama a modal de informacoes sobre o filme
  //const filme = filmes[indice];
  console.log("TITLE :::::::: "+filme.title);
  var gosto = filme.gosto ? "opacity-100" : "opacity-50";
  var naoGosto = filme.gosto == false ? "opacity-100" : "opacity-50";
  var lista = filme.lista == true ? "opacity-100" : "opacity-50";
  var id = filme.id;
  $("#m-hero").css("background-image", "url(" + filme.url + filme.imagem + ")");
  $("#hero_image_title").attr("src", "" + filme.url + filme.imageTitle +"");
  /* descricao do filme */
  $(".filme_descricao").remove();
  $("#descricao_filme").append(
    `<p class="filme_descricao">${filme.descricao}</p>`
  );
  /* Pintar gosto,nao gosto, add Lista */

  //data-bs-dismiss="modal" *Codigo para ocultar a modal*
  var componetButtons = `
  <button class="btn btn-lg btn-custum-white play"  id="play" onclick="play()"  >
    <span class="mdi mdi-play"></span> Assistir
  </button>
  <button href="" class="btn-custom-round border-white btn btn-lg rounded-circle ${gosto} gosto gostoVideo-${id}" id="gostoVideo-${id}">
    <span class="mdi mdi-thumb-up text-white"></span>
  </button>
  <button href="" class="btn-custom-round border-white btn btn-lg rounded-circle ${naoGosto} gosto naoGostoVideo-${id}" id="naoGostoVideo-${id}">
    <span class="mdi mdi-thumb-down text-white"></span>
  </button>
  <button href="" class="btn-custom-round border-white btn btn-lg rounded-circle ${lista} addLista addLista-${id}" id="addListaVideo-${id}">
    <span class="mdi mdi-plus"></span>
  </button>
  `;

  $("#modal-buttons").empty();
  $("#modal-buttons").append(componetButtons);

  /* informacoes extras */
  $(".filme_elenco").remove();
  $("#elenco").append(
    `<p class="filme_elenco">
    Elenco: <text>${filme.elenco}</text>
    <br/>
    <br/>
    Gênero: <text>${filme.genero}</text>
    <br/>
    <br/>
    Cenas e momentos: <text>${filme.cenas}</text>
  </p>`
  );
  $(".info-temp").empty(); // limpa as informacoes do filme

  if (filme.temporadas.length > 0) {
    //Verifica se tem temporadas

    var component = ` <div class="col-7">
    <h3 class="text-white">Episodios</h3>
  </div>`;

    if (filme.temporadas.length > 1) {
      // Verifica se tem mais de uma temporada

      component += `<div class="col-5 text-right">
      <select name="" id="cbo_temporadas" class="form-control" onchange="selectTemporada()">`;
      for (var i = 0; i < filme.temporadas.length; i++) {
        component += `<option value="${i}"><h1>Temporada ${i + 1}</h6> ( ${
          filme.temporadas[i].episodeos.length
        } Episódios )</h6></option>`;
      }
      component += ` </select></div>`;
    }

    $("#info_temporadas").append(component);
    $("#episodeos").append('<ul id="lista_episodeos"></ul>');

    if (filme.temporadas.length > 0) {
      // verifica se tem temporadas e adiciona a primeira temporada.
      carregarEpisodeos(filme.temporadas[0]);
    }
  }

  $("#m-hero").data("filme", filme); // Adiciona o objecto filme na modal
  addEventosToCard();
}

function play() {
  // reproduz o filme apartir da home page
  reproduzir($("#m-hero").data().filme);
}

function playVitrine() {
  // reproduz o filme da vitrine no topo do site
  reproduzir($("#hero").data().filme);
}

function showMoreInfo() {
  // mostra modal sobre o filme
  const filme = $("#hero").data().filme;
  // const indice = filmes.findIndex(
  //   (i) => i.id === filme.id && i.title === filme.title
  // );
  modal(filme);
}

function selectTemporada() {
  // Carrega os episodios ao selecionar a temporada

  var indice = $("#cbo_temporadas option:selected").val();
  const temporada = $("#m-hero").data().filme.temporadas[indice];
  carregarEpisodeos(temporada);
}

function carregarEpisodeos(temporada) {
  // mostra os elpisodios da temporada Selecionada
  var component = "";
  temporada.episodeos.forEach((t) => {
    component += episodio(t);
  });
  $("#lista_episodeos").empty(); // limpa os episodios
  $("#lista_episodeos").append(component); // Adiciona novos episodios
}

function episodio(episodeo) {
  // constroi a estrutura completa dos episodios

  //data-bs-dismiss="modal" codigo para ocultar a modal
  var component = `
  <li class="item_episodeo" onclick=reproduzirEpisodeo(${episodeo.numero})>
  <div class="row">
    <div class="col-1 my-auto text-center">
      <h3 class="text-white">${episodeo.numero}</h3>
    </div>
    <div class="col-4">
      <img class="img-fluid" src="${episodeo.url + episodeo.imagem}" alt="">
    </div>
    <div class="col-7">
      <h6 class="text-white">${episodeo.title}</h6>
      <p class="text-muted">${episodeo.descricao}</p>
    </div>
  </div>
</li>

  `;
  return component;
}

function reproduzirEpisodeo(numero) {
  // reproduz o Episodeo com base o numero passado
  var indice = $("#cbo_temporadas option:selected").val();
  indice = indice != null ? indice : 0;
  const temporada = $("#m-hero").data().filme.temporadas[indice];
  for (var i = 0; i < temporada.episodeos.length; i++) {
    if (temporada.episodeos[i].numero == numero) {
      reproduzir(temporada.episodeos[i]);
      break;
    }
  }
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
      
      put('/create',body,'POST').then((response)=>{
        response.json().then((value)=>{
          userLogado = value;
          if(userLogado != null){
              limparNovaConta()
            alert('Conta Criada Com Sucesso')
            login(userLogado.nome_user,userLogado.senha);
          }
          else  
            alert('Conta ja Existe')
        })
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
        userLogado = JSON.parse(jsonBody.data);
        window.location.replace(`${urlBase}/home`);
        $('#lbNomeUser').append(userLogado.nome);
        $('#email').val("");
        $('#senha').val("");
      }else{
        alert(jsonBody.message);
        window.location.replace(`${urlBase}/`);
      }
  });
}

function logout(){
  response("/logout","POST").then(response=>{

    window.location.replace(`${urlBase}/`);
  });
}

