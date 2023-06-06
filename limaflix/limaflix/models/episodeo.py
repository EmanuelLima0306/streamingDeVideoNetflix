
class Episodeo:
    def __init__(self) -> None:
        self.id = 0
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
        self.idTemporada = 0
    
    def __init__(self,id,title , trailer, ano, genero, descricao, imagem, imageTitle, filme, url, elenco, cenas, especificacao, gosto, lista, currentTime, idTemporada):
    
        self.id = id
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
        self.idTemporada = idTemporada
    
    def jsonToEpisodeo(json):
        return Episodeo(
            id=json.get('id'), 
            title=json.get('title') , 
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
            currentTime=json.get('currentTime'),
            idTemporada=json.get('idTemporada')
            )
        
    def jsonsToEpisodeos(jsons):
        lista = []
        for json in jsons:
            lista.append(Episodeo.jsonToEpisodeo(json))
        return lista         
