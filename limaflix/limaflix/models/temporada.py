
from limaflix.models.episodeo import Episodeo


class Temporada:
    
    def __init__(self):
        self.id =0
        self.title = ""
        self.numero = 0
        self.episodeos = []
        self.idFilme =0
        
    def __init__(self, id, title, numero, episodeos, idFilme):
        self.id = id
        self.title = title
        self.numero = numero
        self.episodeos = episodeos
        self.idFilme =idFilme
        
    def jsonToTemporada(json):
            return Temporada(
                id=json.get('id'),
                title=json.get('title'), 
                numero=json.get('numero'), 
                episodeos= Episodeo.jsonsToEpisodeos(json.get('episodeos')),
                idFilme=json.get('idFilme')
                )

    def jsonsToTemporadas(jsons):
        lista = []
        for json in jsons:
            lista.append(Temporada.jsonToTemporada(json))
        return lista    