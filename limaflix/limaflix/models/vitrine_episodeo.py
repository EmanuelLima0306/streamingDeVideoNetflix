
from limaflix.models.episodeo import Episodeo
from limaflix.models.usuario import Usuario


class VitrineEpisodeo:
    def __init__(self):
        self.id = 0
        self.currentTime = 0
        self.filme = None
        self.usuario = None
        
    def __init__(self, id ,currentTime , filme, usuario):
        self.id = id
        self.currentTime = currentTime
        self.filme = filme
        self.usuario = usuario
        
    def jsonToVitrine(json):
            return VitrineEpisodeo(
                id=json.get('id'),
                currentTime=json.get('currentTime'),
                filme=Episodeo.jsonToEpisodeo(json=json.get('filme')),
                usuario=Usuario.jsonToUsuario(json=json.get('usuario'))
            )
     