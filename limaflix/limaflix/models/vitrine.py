
from limaflix.models.filme import Filme
from limaflix.models.usuario import Usuario


class Vitrine:
    def __init__(self):
        self.id = 0
        self.gosto = ""
        self.lista = ""
        self.qtdEstrela = 0
        self.currentTime = 0
        self.filme = None
        self.usuario = None
        
    def __init__(self, id, gosto, lista, qtdEstrela, currentTime, filme, usuario):
        self.id = id
        self.gosto = gosto
        self.lista = lista
        self.qtdEstrela = qtdEstrela
        self.currentTime = currentTime
        self.filme = filme
        self.usuario = usuario
        
    def jsonToVitrine(json):
            return Vitrine(
                id=json.get('id'),
                gosto=json.get('gosto'), 
                lista=json.get('lista'), 
                qtdEstrela=json.get('qtdEstrela'),
                currentTime=json.get('currentTime'),
                filme=Filme.jsonToFilme(json=json.get('filme')),
                usuario=Usuario.jsonToUsuario(json=json.get('usuario'))
            )
     