from limaflix.models.filme import Filme
from limaflix.models.usuario import Usuario


class Comentario :
    def __init__(self,id,usuario,filme,descricao):
        self.id=id
        self.usuario=usuario
        self.filme=filme
        self.descricao=descricao
        
    def jsonToComentario(json):
        return Comentario(
            id=json.get('id'),
            usuario=Usuario.jsonToUsuario(json=json.get('usuario')),
            filme=Filme.jsonToFilme(json=json.get('filme')),
            descricao=json.get('descricao')
            )    