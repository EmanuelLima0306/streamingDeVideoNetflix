# limaflix:bean:usuario
from limaflix.controller.usuario_controller import UsuarioController

class UsuarioBean:
    
        
    def login(nome_user, senha) :
        return UsuarioController.login(nome_user, senha)
        
    def save(newUsuario) :    
        if UsuarioController.save(newUsuario=newUsuario):
            return UsuarioController.getLast()
        else :
            return None
        
    def getAll():
        return UsuarioController.getAll()
    
    def getUsuario(self) :
        return self.usuario
    
    def getLast():
        return UsuarioController.getLast()

    def getById(id):
        return UsuarioController.getById(id=id)