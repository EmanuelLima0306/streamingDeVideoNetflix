# from limaflix.bean.temporada_bean import TemporadaBean
from limaflix.bean.temporada_bean import TemporadaBean
from limaflix.controller.filme_controller import FilmeController

class FilmeBean:
        
    def save(newFilme) :    
        if FilmeController.save(newFilme):
            filme = FilmeBean.getLast()
            for temporada in newFilme.temporadas:
                temporada.idFilme = filme.id
                TemporadaBean.save(newTemporada=temporada)
            return FilmeController.getLast()
        else :
            return None
        
    def delete(id):
        FilmeController.dele(id=id)    
        
    def getAll():
        return FilmeController.getAll()
    
    def getUsuario(self) :
        return self.usuario
    
    def getLast():
        return FilmeController.getLast()
    
    def getById(id):
        return FilmeController.getById(id=id)
    
    def getQTD():
        return FilmeController.getQTD()