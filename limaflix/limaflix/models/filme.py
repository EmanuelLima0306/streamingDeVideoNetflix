# limaflix:models:filme

from limaflix.models.temporada import Temporada


class Filme:
    
    def __init__(self) -> None:
        self.id = 0
        self.temporadas = []
        self.title = ""
        self.trailer = ""
        self.ano = 0
        self.genero = ""
        self.descricao = ""
        self.imagem = ""
        self.imageTitle = ""
        self.filme = ""
        self.url = ""
        self.elenco = ""
        self.cenas = ""
        self.especificacao = ""
        self.gosto = ""
        self.lista = ""
        self.currentTime = 0
    
    def __init__(self,id, title , temporadas, trailer, ano, genero, descricao, imagem, imageTitle, filme, url, elenco, cenas, especificacao, gosto, lista, currentTime):
    
        self.id = id
        self.temporadas = temporadas
        self.title = title
        self.trailer = trailer
        self.ano = ano
        self.genero = genero
        self.descricao = descricao
        self.imagem = imagem
        self.imageTitle = imageTitle
        self.filme = filme
        self.url = url
        self.elenco = elenco
        self.cenas = cenas
        self.especificacao = especificacao
        self.gosto = gosto
        self.lista = lista
        self.currentTime = currentTime

    def jsonToFilme(json):
        return Filme(
            id=json.get('id'), 
            title=json.get('title') , 
            temporadas=Temporada.jsonsToTemporadas(json.get('temporadas')), 
            trailer=json.get('trailer'), 
            ano=json.get('ano'), 
            genero=json.get('genero'), 
            descricao=json.get('descricao'), 
            imagem=json.get('imagem'), 
            imageTitle=json.get('imageTitle'), 
            filme=json.get('filme'), 
            url=json.get('url'), 
            elenco=json.get('elenco'), 
            cenas=json.get('cenas'), 
            especificacao=json.get('especificacao'),
            gosto=json.get('gosto'), 
            lista=json.get('lista'), 
            currentTime=json.get('currentTime')
            )