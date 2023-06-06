from limaflix.bean.episodeo_bean import EpisodeoBean
from limaflix.bean.usuario_bean import UsuarioBean
from limaflix.controller.filme_controller import FilmeController
from limaflix.controller.vitrine_episodeo_controller import VitrineEpisodeoController
from limaflix.models.vitrine_episodeo import VitrineEpisodeo

class VitrineEpisodeoBean:
    
    def save(newVitrine) :    
        if VitrineEpisodeoController.save(newVitrine=newVitrine):
            return VitrineEpisodeoBean.getLast()
        else :
            return None
        
    def update(vitrine):
        return VitrineEpisodeoController.update(newVitrine=vitrine)    
    
    def updateLike(vitrine):
        return VitrineEpisodeoController.update(newVitrine=vitrine)    
    
    def updateLista(vitrine):
        return VitrineEpisodeoController.update(newVitrine=vitrine)    
    
    def updateStar(vitrine):
        return VitrineEpisodeoController.update(newVitrine=vitrine)    
        
    def getAll():
        return VitrineEpisodeoController.getAll()
    
    def getLast():
        return VitrineEpisodeoController.getLast()
    
    def getByFilmeAndUsuario(idFilme, idUsuario):
        vitrine = VitrineEpisodeoController.getByIdFilmeAndIdUsuario(idFilme=idFilme,idUsuario=idUsuario)
        if vitrine is None:
            filme = EpisodeoBean.getById(id=idFilme)
            usuario = UsuarioBean.getById(id=idUsuario)
            vitrine = VitrineEpisodeo(id=0,currentTime=0,filme=filme,usuario=usuario)
            return VitrineEpisodeoBean.save(newVitrine=vitrine)
        return vitrine
    