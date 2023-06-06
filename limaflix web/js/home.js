
var speed = 1;
let userLogado = null;
var vitrinesTopDez = [];
let index = 0;
let cont = 0;
const urlBase = "http://127.0.0.1:5000";

$(document).ready(function () {
    
    init();
    initComponents()

  });

  

  function initComponents(){
    trocarCorMenu(); 
    $('#btnLogout').on('click', e=>{
      logout();
    });
    
    $('#nav-episodio-tab').on('click', function (e) {
      e.preventDefault()
      $(this).tab('show');
    })
    $('#nav-comentario-tab').on('click', function (e) {
      e.preventDefault()
      $(this).tab('show');
      carregarComentarios();
    })

    $('#btnComentar').on('click', function (e) {
      e.preventDefault()
      criarComentario();
    })
  
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
  
  async function init() {
    userLogado = JSON.parse(window.localStorage.getItem('userLogado')); // pega o usuario que esta logado

    if(userLogado == null){
      window.location.replace(`index.html`);
    }else{

      $("#userLog").html("<li>"+userLogado.nome+"</li>"); //Seta o nome do usuario logado
      await put("/vitrines", userLogado ,"POST").then(async response => {
        var jsonBody = await response.json();
        if(jsonBody.status == 200){
          var vitrines = JSON.parse(jsonBody.data)
          vitrinesTopDez = vitrines;
          
          setTimeout(topDez, 0);
        }
      });
      homePage();
    }
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
    
    if (cont > vitrinesTopDez.length - 1 || cont == 5) {
      cont = 0;
    }
    let vitrine = vitrinesTopDez[cont];
    let filme = vitrine.filme;
    cont++;
  
    if (filme.gosto != false) {
      const widthTitle = $("#hero_logo").css("width"); //pega o tamanho do titlo em imagem
      $("#hero").animate({ opacity: 0 }, 50); // reduz a opacidade numa escala de 50 mil segundos
      $("#hero").css("background-image", "url(" + urlBase +"/" + filme.url + filme.imagem + ")"); // troca a imagem do fundo
      $("#hero_logo").animate({ opacity: 0 }, 0); //reduz o tamanho do titlo
      $("#hero").animate({ opacity: 1 }, 500); // aumenta a opacidade
      $("#hero_logo").animate({ opacity: 1 }, 4000); // Aumenta o tamanho do titlo
      $("#hero_logo").attr("src", "" + urlBase +"/" + filme.url + filme.imageTitle + ""); // troca a imagem do titlo
      $("#hero").data("vitrine", vitrine); // Adiciona o objecto filme na vitrine
      setTimeout(topDez, 10000);
    } else {
      setTimeout(topDez, 10000);
    }
  }
  
  function pesquisar() {
    // Faz a pesquisa apartir do campo no menu
    sorted($("#searchMove").val(), "Resulta da Pesquisa");
  }
  
  async function sorted(value, title) {
    // busca de acordo o valor passado
    if (!value) {
      init();
    } else {
      $("#main-content").empty();

      await response(`/vitrinesSorted/${userLogado.id}/${value}`, "GET").then(async response => {
        var jsonBody = await response.json();
        if(jsonBody.status == 200){
          var vitrines = JSON.parse(jsonBody.data)
          
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
      
          vitrines.forEach((vitrine) => {
              componete += addFilme(vitrine);
          });
      
          componete += `</ul>
              </div>
            </section>
            `;
          
          $("#main-content").append(componete);
        }
        addEventoPlayVideoToCard();
        addEventosToCard();
        // prevAndNextMovies();
      });
    }
  }
  
  async function sourchMove() {
    // carrega tudo que é filme
    $("#main-content").empty();
    await addMovies("Filme", "Filmes");
    addEventoPlayVideoToCard();
    addEventosToCard();
    prevAndNextMovies();
  }
  
  async function sourchSerie() {
    // carrega tudo que e serie
    $("#main-content").empty();
    await addMovies("Série", "Séries");
    addEventoPlayVideoToCard();
    addEventosToCard();
    prevAndNextMovies();
  }
  
  async function sourchAnime() {
    // Carrega tudo que e Anime
    $("#main-content").empty();
    await addMovies("Anime", "Animes");
    addEventoPlayVideoToCard();
    addEventosToCard();
    prevAndNextMovies();
  }
  
  async function homePage() {
    // carrga todas as series, filmes e animes
    $("#main-content").empty();
    await addMovies("Filme", "Filmes");
    await addMovies("Série", "Séries");
    await addMovies("Anime", "Desenhos Animados");
    addEventoPlayVideoToCard();
    addEventosToCard();
    prevAndNextMovies();
  }
  
  async function sourchLike() {
    // Carregada todos com gosto
    await response(`/vitrinesLike/${userLogado.id}`, "GET").then(async response => {
      var jsonBody = await response.json();
      if(jsonBody.status == 200){
        var vitrines = JSON.parse(jsonBody.data)
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
          vitrines.forEach((vitrine)=>{
          componete += addFilme(vitrine);
        });
  
        componete += `</ul>
        </div>
        </section>
        `;
  
        $("#main-content").append(componete);
        addEventoPlayVideoToCard();
        addEventosToCard();
        prevAndNextMovies();
      }else{
        alert('Não Existe filme na sua Lista de Gostos')
      }
    });
  }
  
  function sourchLista() {
    // Carrega todos da lista +
    response(`/vitrinesFavoritos/${userLogado.id}`, "GET").then(async response => {
      var jsonBody = await response.json();
      if(jsonBody.status == 200){
        var vitrines = JSON.parse(jsonBody.data)
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
      
        vitrines.forEach((vitrine) => {
            componete += addFilme(vitrine);
        });
      
        componete += `</ul>
            </div>
          </section>
          `;
      
        $("#main-content").append(componete);
        addEventoPlayVideoToCard();
        addEventosToCard();
        prevAndNextMovies();
      }else{
        alert('Não Existe filme na sua Lista de Favoritos')
      }
    });
  }
  
  async function getFilmeById(id){
    let result = {};
    body = {idUsuario: userLogado.id, idFilme: id};
    await put("/vitrineFilmeUser",body, "POST").then(async response=>{
      jsonBody = await response.json();
      if(jsonBody.status == 200){
        result = JSON.parse(jsonBody.data);
      }else{
        return {};
      }
    })
    return result;
  }

  async function getEpisodeoById(idEpisodeo){
    let result = {};
    body = {idUsuario: userLogado.id, idFilme: idEpisodeo};
    await put("/vitrineEpisodeoUser",body, "POST").then(async response=>{
      jsonBody = await response.json();
      if(jsonBody.status == 200){
        result = JSON.parse(jsonBody.data);
      }else{
        return {};
      }
    })
    return result;
  }
  
  function addEventosToCard() {
    // adiciona eventos gostar,nao gostar, lista na modal e na home
  
    $(".gosto").click( async function (e) {
      // adiciona gosto sem abrir a  modal
      const id = this.id;
      const idFilme = id.split("-")[1];
      var vitrine = await getFilmeById(idFilme);
       if (id.toLowerCase() === `gostoVideo-${idFilme}`.toLowerCase()) {
        vitrine.gosto = vitrine.gosto == true ? null : true;
      }else{
        vitrine.gosto = vitrine.gosto == false ? null : false;
      }
      put(`/updateVitrineLike`,vitrine,'POST').then(result=>{
        result.json().then(value=>{
          if (vitrine.gosto) {
            $(`.gostoVideo-${idFilme}`).removeClass("opacity-50");
            $(`.gostoVideo-${idFilme}`).addClass("opacity-100");
            $(`.naoGostoVideo-${idFilme}`).removeClass("opacity-100");
            $(`.naoGostoVideo-${idFilme}`).addClass("opacity-50");
          } else if(vitrine.gosto == false) {
              $(`.naoGostoVideo-${idFilme}`).removeClass("opacity-50");
              $(`.naoGostoVideo-${idFilme}`).addClass("opacity-100");
              $(`.gostoVideo-${idFilme}`).removeClass("opacity-100");
              $(`.gostoVideo-${idFilme}`).addClass("opacity-50");
          }else{
            $(`.gostoVideo-${idFilme}`).removeClass("opacity-100");
            $(`.gostoVideo-${idFilme}`).addClass("opacity-50");
            $(`.naoGostoVideo-${idFilme}`).removeClass("opacity-100");
            $(`.naoGostoVideo-${idFilme}`).addClass("opacity-50");
          }
        });
      });
    });
  
    $(".addLista").click(async function (e) {
      // adiciona nao gosto sem abrir a  modal
      const idFilme = this.id.split("-")[1];
      var vitrine = await getFilmeById(idFilme);
      vitrine.lista = vitrine.lista == true ? null : true;
      put(`/updateVitrineLike`,vitrine,'POST').then(result=>{
        result.json().then(value=>{
          if (vitrine.lista) {
            $(`.addLista-${idFilme}`).removeClass("opacity-50");
            $(`.addLista-${idFilme}`).addClass("opacity-100");
          } else {
            $(`.addLista-${idFilme}`).removeClass("opacity-100");
            $(`.addLista-${idFilme}`).addClass("opacity-50");
          }
        })
      })

    });

    $(".fa-star").click(async function (e) {  // evento para adicionar estrela ao clicar
      const idFilme = this.id.split("-")[1];
      const qtdEstrela = this.id.split("-")[0];
      var vitrine = await getFilmeById(idFilme);
      vitrine.qtdEstrela = vitrine.qtdEstrela == qtdEstrela? 0 : qtdEstrela;
      
      put(`/updateVitrineLike`,vitrine,'POST').then(result=>{
        result.json().then(value=>{
          $(`.addStar-${idFilme}`).removeClass("starCked");
          if(vitrine.qtdEstrela >= 3){
            $(`#1-${idFilme}`).addClass("starCked");
            $(`#2-${idFilme}`).addClass("starCked");
            $(`#3-${idFilme}`).addClass("starCked");
          }else if(vitrine.qtdEstrela >= 2 && vitrine.qtdEstrela < 3){
            $(`#1-${idFilme}`).addClass("starCked");
            $(`#2-${idFilme}`).addClass("starCked");
          }else if(vitrine.qtdEstrela == 1){
            $(`#1-${idFilme}`).addClass("starCked");
          }
          
        })
      })
    })
  }
  
  function addEventoPlayVideoToCard() {
    // Adiciona evento assistir no cartao da home
    $(".playVideo").on("click", async function (e) {
      //  reproduz o video ao clicar no play sem abri a modal
      const idFilme = this.id.split("-")[1];
      let vitrine = await getFilmeById(idFilme);
      reproduzir(vitrine);
    });
  }
  
  async function filmModal(id) {
    // carega a modal do fime passado por indice
    let vitrine = await getFilmeById(id);
    modal(vitrine);
  }
  
  async function addMovies(genero, cabecalho) {
    // Adiciona filmes de acordo ogenero
    await response(`/vitrinesGenero/${userLogado.id}/${genero}`, "GET").then(async response => {
      var jsonBody = await response.json();
      if(jsonBody.status == 200){

        var vitrines = JSON.parse(jsonBody.data);
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

            vitrines.forEach((vitrine) => {
                componete += addFilme(vitrine);
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
    });
    
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
  
  function addFilme(vitrine) {
    //Adiciona o filme na homePage
    var filme = vitrine.filme;
    var gosto = vitrine.gosto ? "opacity-100" : "opacity-50";
    var naoGosto = vitrine.gosto == false ? "opacity-100" : "opacity-50";
    var lista = vitrine.lista == true ? "opacity-100" : "opacity-50";
    var star1 = vitrine.qtdEstrela >= 1?"starCked":"";
    var star2 = vitrine.qtdEstrela >= 2?"starCked":"";
    var star3 = vitrine.qtdEstrela >= 3?"starCked":"";

    //index = filmes.findIndex((i) => i.id === filme.id && i.title === filme.title);
    id = filme.id;
  
    var component = `
    <li class="filme">
    <img src='${ urlBase +"/" +filme.url + filme.imagem}' class="img-fluid image-movie" data-bs-toggle="modal" data-bs-target="#modal-filme" onclick=filmModal(${id})>
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
        <svg class="fa-star addStar-${id} ${star1}" id= "1-${id}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20pt" height="20pt" viewBox="0 0 20 20" version="1.1">
          <path fill:#000; d="M 4.046875 19.285156 C 3.96875 19.285156 3.890625 19.246094 3.808594 19.207031 C 3.691406 19.125 3.613281 18.929688 3.652344 18.769531 L 5.398438 12.261719 L 0.15625 8.015625 C 0 7.9375 -0.0390625 7.738281 0 7.578125 C 0.0390625 7.421875 0.199219 7.300781 0.355469 7.300781 L 7.101563 6.945313 L 9.523438 0.636719 C 9.601563 0.515625 9.761719 0.398438 9.921875 0.398438 C 10.078125 0.398438 10.238281 0.515625 10.277344 0.636719 L 12.699219 6.945313 L 19.445313 7.300781 C 19.601563 7.300781 19.761719 7.421875 19.800781 7.578125 C 19.839844 7.738281 19.800781 7.894531 19.683594 8.015625 L 14.445313 12.261719 L 16.191406 18.769531 C 16.230469 18.929688 16.191406 19.089844 16.03125 19.207031 C 15.914063 19.285156 15.714844 19.324219 15.59375 19.207031 L 9.921875 15.554688 L 4.246094 19.207031 C 4.167969 19.285156 4.125 19.285156 4.046875 19.285156 Z "/>
        </svg>
        <svg class="fa-star addStar-${id} ${star2}" id= "2-${id}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20pt" height="20pt" viewBox="0 0 20 20" version="1.1">
          <path fill:#000; d="M 4.046875 19.285156 C 3.96875 19.285156 3.890625 19.246094 3.808594 19.207031 C 3.691406 19.125 3.613281 18.929688 3.652344 18.769531 L 5.398438 12.261719 L 0.15625 8.015625 C 0 7.9375 -0.0390625 7.738281 0 7.578125 C 0.0390625 7.421875 0.199219 7.300781 0.355469 7.300781 L 7.101563 6.945313 L 9.523438 0.636719 C 9.601563 0.515625 9.761719 0.398438 9.921875 0.398438 C 10.078125 0.398438 10.238281 0.515625 10.277344 0.636719 L 12.699219 6.945313 L 19.445313 7.300781 C 19.601563 7.300781 19.761719 7.421875 19.800781 7.578125 C 19.839844 7.738281 19.800781 7.894531 19.683594 8.015625 L 14.445313 12.261719 L 16.191406 18.769531 C 16.230469 18.929688 16.191406 19.089844 16.03125 19.207031 C 15.914063 19.285156 15.714844 19.324219 15.59375 19.207031 L 9.921875 15.554688 L 4.246094 19.207031 C 4.167969 19.285156 4.125 19.285156 4.046875 19.285156 Z "/>
        </svg>
        <svg class="fa-star addStar-${id} ${star3}" id= "3-${id}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20pt" height="20pt" viewBox="0 0 20 20" version="1.1">
          <path fill:#000; d="M 4.046875 19.285156 C 3.96875 19.285156 3.890625 19.246094 3.808594 19.207031 C 3.691406 19.125 3.613281 18.929688 3.652344 18.769531 L 5.398438 12.261719 L 0.15625 8.015625 C 0 7.9375 -0.0390625 7.738281 0 7.578125 C 0.0390625 7.421875 0.199219 7.300781 0.355469 7.300781 L 7.101563 6.945313 L 9.523438 0.636719 C 9.601563 0.515625 9.761719 0.398438 9.921875 0.398438 C 10.078125 0.398438 10.238281 0.515625 10.277344 0.636719 L 12.699219 6.945313 L 19.445313 7.300781 C 19.601563 7.300781 19.761719 7.421875 19.800781 7.578125 C 19.839844 7.738281 19.800781 7.894531 19.683594 8.015625 L 14.445313 12.261719 L 16.191406 18.769531 C 16.230469 18.929688 16.191406 19.089844 16.03125 19.207031 C 15.914063 19.285156 15.714844 19.324219 15.59375 19.207031 L 9.921875 15.554688 L 4.246094 19.207031 C 4.167969 19.285156 4.125 19.285156 4.046875 19.285156 Z "/>
        </svg>
      </div>
      <p>T3:Ep5 <text>${filme.title + " " + filme.ano}</text></p>
    </div>
  </li>
  `;
    return component;
  }
  
  function reproduzir(vitrine) {
    // reproduz o filme

    const filme = vitrine.filme;
    var url = urlBase +"/"+filme.url;

    if(vitrine.filme.hasOwnProperty("temporadas")){ // Verifica se o filme tem um atributo temporada
      url += filme.temporadas.length > 0 ? filme.trailer : filme.filme; // Verifica se e serie pega o filme
   }else{
    url += filme.filme; // pega o filme
   }
    
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
          <button type="button" class="btn  dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onclick="setSpeed(0.75)">
                <label class="form-check-label" for="flexRadioDefault2">
                  0.75x
                </label>
              </div>
              </li>
              <li>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" checked onclick="setSpeed(1)">
                  <label class="form-check-label" for="flexRadioDefault3">
                    1x(Normal)
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" onclick="setSpeed(1.25)">
                  <label class="form-check-label" for="flexRadioDefault4">
                    1.25x
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault5" onclick="setSpeed(2)">
                  <label class="form-check-label" for="flexRadioDefault5">
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
    media.currentTime = vitrine.currentTime; // inicia o video de onde parou da ultima vez
    media.addEventListener("timeupdate", function (event) {
      // altera o tempo da ultima vizualizacao emquanto apresenta
      media.playbackRate = speed;
      vitrine.currentTime = media.currentTime;
      if(vitrine.filme.hasOwnProperty("temporadas")){
        put('/updateVitrine',vitrine,'POST'); // acturaliza o ultimo tempo do filme viste no servidor
     }else{
        put('/updateVitrineEpisodeo',vitrine,'POST');// actualiza o ultimo tempo do episodio visto no servidor
     }
       // Actualiza a ultima visualizacao no servidor enquando o fime decorrer
       
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
    const media = document.querySelector("#video_screen");
    media.pause();
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
    if(!media)
      return;
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
  
  function modal(vitrine) {
    //Adicionar 
    $("#m-hero").data("vitrine", vitrine); // Adiciona o objecto filme na modal
    // chama a modal de informacoes sobre o filme
    //const filme = filmes[indice];
    var gosto = vitrine.gosto ? "opacity-100" : "opacity-50";
    var naoGosto = vitrine.gosto == false ? "opacity-100" : "opacity-50";
    var lista = vitrine.lista == true ? "opacity-100" : "opacity-50";
    var star1 = vitrine.qtdEstrela >= 1?"starCked":"";
    var star2 = vitrine.qtdEstrela >= 2?"starCked":"";
    var star3 = vitrine.qtdEstrela >= 3?"starCked":"";

    let filme = vitrine.filme;
    var id = vitrine.filme.id;
    
    $("#m-hero").css("background-image", "url("+ urlBase +"/" + filme.url + filme.imagem + ")");
    $("#hero_image_title").attr("src", ""+ urlBase +"/" + filme.url + filme.imageTitle +"");
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
    <span class="fa fa-star addStar-${id} ${star1}" id= "1-${id}"></span>
    <span class="fa fa-star addStar-${id} ${star2}" id= "2-${id}"></span>
    <span class="fa fa-star addStar-${id} ${star3}" id= "3-${id}"></span>
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
    $("#txtComentario").val(""); // limpa o campo de comentario

    if (filme.temporadas.length > 0) { //Verifica se tem temporadas
      
      $("#nav-episodio-tab").show(); // esconde a aba de episodeos
      $("#nav-comentarios-tab").removeClass("active");// activa o tab como activa
      $("#nav-episodio-tab").tab('show'); // esconde a aba de episodeos

      var component = ` <div class="col-7">
      <h3 class="text-white">Episodios</h3>
    </div>`;
      limparComentarios();
      if (filme.temporadas.length > 1) {
        // Verifica se tem mais de uma temporada
        $("#nav-episodio-tab").show();
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
    }else{
      $("#nav-episodio-tab").hide(); // esconde a aba de episodeos
      $("#nav-comentarios-tab").addClass("active");// activa o tab como activa
      $("#nav-comentario-tab").tab('show'); // esconde a aba de episodeos
      carregarComentarios();

    }
  
    
    addEventosToCard();
  }
  
  function play() {
    // reproduz o filme apartir da home page
    reproduzir($("#m-hero").data().vitrine);
  }
  
  function playVitrine() {
    // reproduz o filme da vitrine no topo do site
    reproduzir($("#hero").data().vitrine);
  }
  
  function showMoreInfo() {
    // mostra modal sobre o filme
    const vitrine = $("#hero").data().vitrine;
    // const indice = filmes.findIndex(
    //   (i) => i.id === filme.id && i.title === filme.title
    // );
    modal(vitrine);
  }
  
  function selectTemporada() {
    // Carrega os episodios ao selecionar a temporada
  
    var indice = $("#cbo_temporadas option:selected").val();
    const temporada = $("#m-hero").data().vitrine.filme.temporadas[indice];
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
        <img class="img-fluid" src="${urlBase +"/" +episodeo.url + episodeo.imagem}" alt="">
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
  
  async function reproduzirEpisodeo(numero) {
    // reproduz o Episodeo com base o numero passado
    var indice = $("#cbo_temporadas option:selected").val();
    indice = indice != null ? indice : 0;
    const temporada = $("#m-hero").data().vitrine.filme.temporadas[indice];
    for (var i = 0; i < temporada.episodeos.length; i++) {
      if (temporada.episodeos[i].numero == numero) {
        vitrine = await getEpisodeoById(temporada.episodeos[i].id)
        reproduzir(vitrine);
        break;
      }
    }
  }

  function limparComentarios(){
    $("#tbodyComentarios").empty();
  }

  function carregarComentarios(){

    var vitrine = $("#m-hero").data().vitrine;
    limparComentarios();
    response(`/comentariosFilme/${vitrine.filme.id}`,'GET').then(async response=>{
      const jsonBody = await response.json();
      if(jsonBody.status == 200){
        comentarios = JSON.parse(jsonBody.data);
        var lista = "";
        comentarios.forEach(c =>{
          lista += `
          <tr>
            <td> <span><span>${c.usuario.nome}</span></td>
            <td>${c.descricao}</td>
          </tr>`;
        });
      }else{
        lista = 'Nenhum Comentário Encontrado'
      }
      $("#tbodyComentarios").append(lista);
    })
  }

  function criarComentario(){

    var vitrine = $("#m-hero").data().vitrine;
    var descricao = $("#txtComentario").val();
    body = {id:0,usuario:userLogado,filme:vitrine.filme,descricao:descricao};
    put(`/saveComentarioFilme`,body,'POST').then(async response=>{
      const jsonBody = await response.json();
      if(jsonBody.status == 200){
        $("#txtComentario").val("");
        carregarComentarios();
      }else{
        alert(jsonBody.message)
      }
    }).catch(ex=>{
      console.log(ex)
      alert('Verifica a sua conexao com a interner')
    })
  }
  
  
  
  function logout(){
    response('/logout',"POST").then(response=>{
      window.localStorage.setItem('userLogado',null); // altera o usuario em uma sessao para null
      window.location.replace(`index.html`);
    });
  }
  