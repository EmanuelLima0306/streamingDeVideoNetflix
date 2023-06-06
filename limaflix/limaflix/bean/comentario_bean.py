
from limaflix.controller.comentario_controller import ComentarioController

class ComentarioBean:
    
    def save(newComentario) :    
        if ComentarioController.save(newComentario=newComentario):
            return ComentarioBean.getLast()
        else :
            return None
        
    def update(vitrine):
        return ComentarioController.update(newComentario=vitrine)    
        
        
    def getAll():
        return ComentarioController.getAll()
    
    def getLast():
        return ComentarioController.getLast()
    
    def getByIdFilme(idFilme):
        return ComentarioController.getByIdFilme(idFilme=idFilme)
    
    