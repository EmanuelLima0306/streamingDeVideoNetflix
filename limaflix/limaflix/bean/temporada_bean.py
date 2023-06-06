from limaflix.bean.episodeo_bean import EpisodeoBean
from limaflix.controller.temporada_controller import TemporadaController

class TemporadaBean:
    
    def save(newTemporada) :    
        if TemporadaController.save(newTemporada=newTemporada):
            temporada = TemporadaBean.getLast()
            for episodio in newTemporada.episodeos:
                episodio.idTemporada = temporada.id
                EpisodeoBean.save(episodio)
            return TemporadaBean.getLast()
        else :
            return None
        
    def getAll():
        return TemporadaController.getAll()
    
    def getUsuario(self) :
        return self.usuario
    def getLast():
        return TemporadaController.getLast()
    
    def getByIdFilme(idFilme):
        return TemporadaController.getByIdFilme(idFilme=idFilme)