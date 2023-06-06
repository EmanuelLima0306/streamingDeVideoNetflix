from limaflix.controller.episodeo_controller import  EpisodeoController

class EpisodeoBean:
    def __init__(self) -> None:
        pass
    
    def save(newEpisodeo) :    
        if EpisodeoController.save(newEpisodeo=newEpisodeo):
            return EpisodeoController.getLast()
        else :
            return None
        
    def getAll():
        return EpisodeoController.getAll()
    
    def getUsuario(self) :
        return self.usuario
    def getLast():
        return EpisodeoController.getLast()
    
    def getByIdTemporada(idTemporada):
        return EpisodeoController.getByIdTemporada(idTempora=idTemporada)
    
    def getById(id):
        return EpisodeoController.getById(id=id)
    
    