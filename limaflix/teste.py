# import json
# from flask import jsonify
from limaflix.bean.filme_bean import FilmeBean
from limaflix.bean.temporada_bean import TemporadaBean
from limaflix.bean.usuario_bean import UsuarioBean
from limaflix.bean.vitrine_bean import VitrineBean
from limaflix.data.loader import load_filmes
from limaflix.models.filme import Filme
from limaflix.models.usuario import Usuario


def cadastrarFilmes():
    """Cadastrar os filmes no banco de dados
    """
    filmes = load_filmes()

    for filme in filmes:
        if FilmeBean.save(Filme.jsonToFilme(filme)) != None:
            print("Salvo com Sucesso!!")
        else:    
            print("Erro!!")


def eliminarFilmes():
    """Eliminar os filmes no banco de dados
    """
    for filme in FilmeBean.getAll():
        print(filme.title)
        FilmeBean.delete(filme.id)
        
#     for temporada in TemporadaBean.getAll():
#             print(temporada.title)

def mostrarFilmes():
    for filme in FilmeBean.getAll():
        print(filme.title)
        for temporada in filme.temporadas:
            print(temporada.title)
            for episodeo in temporada.episodeos:
                print(episodeo.title)
        print('\n\n')        
        
        

# with open('app.json', 'w', encoding='utf-8') as f:
#     json_string = json.dumps(FilmeBean.getAll(), f, ensure_ascii=False, indent=4)

# myList = FilmeBean.getAll()
# jsonStr = json.dumps([obj.__dict__ for obj in myList])
# print(jsonStr)

       
def mostrarUsuarios():
    for user in UsuarioBean.getAll():
        print(user.nome_user)
        
def mostrarVitrines():
    for vitrine in VitrineBean.getAll():
        print(vitrine.filme.title)      
        for temporada in vitrine.filme.temporadas:
            print(temporada.title)
            print('\n\n')  
    
if __name__ == "__main__":
    # eliminarFilmes()
    # cadastrarFilmes()
    # mostrarFilmes()
    # print(VitrineBean.getQTDByUsuario(1))
    # mostrarVitrines()
    vitrines = VitrineBean.getByIdUsuarioGenero(usuaruio=Usuario(id=2,nome="",nome_user="",senha=""),genero="Série")
    for vitrine in vitrines:
        print(vitrine.filme.title)
