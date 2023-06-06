from limaflix.controller.filme_controller import FilmeController
from limaflix.controller.vitrine_controller import VitrineController
from limaflix.models.vitrine import Vitrine

class VitrineBean:
    
    def save(newVitrine) :    
        if VitrineController.save(newVitrine=newVitrine):
            return VitrineBean.getLast()
        else :
            return None
        
    def update(vitrine):
        return VitrineController.update(newVitrine=vitrine)    
    
    def updateLike(vitrine):
        return VitrineController.update(newVitrine=vitrine)    
    
    def updateLista(vitrine):
        return VitrineController.update(newVitrine=vitrine)    
    
    def updateStar(vitrine):
        return VitrineController.update(newVitrine=vitrine)    
        
    def getAll():
        return VitrineController.getAll()
    
    def getLast():
        return VitrineController.getLast()
    
    def getByFilmeAndUsuario(idFilme, idUsuario):
        return VitrineController.getByIdFilmeAndIdUsuario(idFilme=idFilme,idUsuario=idUsuario)
    
    def getByUsuario(usuaruio):
        if usuaruio is None:
            return None
        qtdVitrine = VitrineBean.getQTDByUsuario(idUsuario=usuaruio.id)
        qtdFilme = FilmeController.getQTD()
        if qtdVitrine < qtdFilme:
            VitrineBean.createVitrine(usuario=usuaruio)
        return VitrineBean.getByIdUsuario(idUsuario=usuaruio.id)    
    
    def getByUsuarioLike(usuaruio):
        if usuaruio is None:
            return None
        return VitrineController.getByIdUsuarioLike(idUsuario=usuaruio.id)    
    
    def getByUsuarioFavoritos(usuaruio):
        if usuaruio is None:
            return None
        return VitrineController.getByIdUsuarioFavoritos(idUsuario=usuaruio.id)    
    
    def getByIdUsuarioSorted(usuaruio,value):
        if usuaruio is None:
            return None
        return VitrineController.getByIdUsuarioSorted(idUsuario=usuaruio.id,value=value)   
     
    def getByIdUsuarioGenero(usuaruio,genero):
        if usuaruio is None:
            return None
        return VitrineController.getByIdUsuarioGenero(idUsuario=usuaruio.id,genero=genero)    
                
    def getByIdUsuario(idUsuario):
        return VitrineController.getByIdUsuario(idUsuario=idUsuario)
    
    
    def getQTDByUsuario(idUsuario):
        return VitrineController.getQTDByUsuario(idUsuario=idUsuario)
    
    def createVitrine(usuario):
        
        for filme in FilmeController.getAll():
            if VitrineBean.getByFilmeAndUsuario(idFilme=filme.id, idUsuario=usuario.id) == None:
                vitrine = Vitrine(id=0,gosto=None,lista=None,qtdEstrela=0,currentTime=0,filme=filme,usuario=usuario)
                salvo = VitrineController.save(newVitrine=vitrine)
                if  salvo:
                    print('Salvo com Sucesso!!!!')
                else :
                    print('Erro ao Salvar')    