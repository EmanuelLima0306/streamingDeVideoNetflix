import json
from flask import Flask, jsonify, request, render_template,redirect, session
from flask_cors import CORS
from limaflix.bean.comentario_bean import ComentarioBean
from limaflix.bean.filme_bean import FilmeBean
from limaflix.bean.vitrine_bean import VitrineBean
from limaflix.bean.vitrine_episodeo_bean import VitrineEpisodeoBean
from limaflix.data.loader import load_filmes
from limaflix.models import Usuario
from limaflix.bean import UsuarioBean
from flask_session import Session
from limaflix.models.comentario import Comentario
from limaflix.models.vitrine import Vitrine
from limaflix.models.vitrine_episodeo import VitrineEpisodeo
from limaflix.util import my_dict

userLogado = None

def create_app():
    application = Flask(__name__)
    application.config["SESSION_PERMANT"]=False
    application.config["SESSION_TYPE"]="filesystem"
    CORS(application)
    Session(application)
    return application


app = create_app()

filmes = load_filmes()


"""
    ROUTE ACCESS
"""

@app.route('/')
def index():
    """
    Rota que retorna a página index caso o usuario nao esteja logado e home caso esteja logado
    """
    userLogado = session.get('userLogado')
    return render_template("index.html") if userLogado is None else redirect('/home')

@app.route('/', methods=['POST'])
def login():
    
    values = request.get_json()
    email = values.get('nome_user')
    senha = values.get('senha') 
    userLogado =  UsuarioBean.login(nome_user=email,senha=senha)
    session["userLogado"] = userLogado
    if userLogado is None:
        return jsonify(
                message=f"Usuario nao Encontrado {email} ",
                category="Not Found",
                data=None,
                status=404
            )
    
    return jsonify(
                message="Seja Bem-vindo ",
                category="Success",
                data=toJson(userLogado),
                status=200
            )
    
    
@app.route('/logado', methods=['GET'])
def userLog():
    userLogado = session.get('userLogado')    
    return jsonify(
                message=f"Usuario nao Encontrado ",
                category="Not Found",
                data=toJson(userLogado),
                status=200
            )


@app.route('/home')
def home():
    userLogado = session.get('userLogado')
    if userLogado is None :
        return redirect('/')
    return render_template("home.html",userLogado=userLogado)


@app.route('/logout',methods=['POST'])
def logout():
    session["userLogado"] = None
    return redirect('/')


"""
    ROUTE FILMES
"""

@app.route('/filmes')
def obter_todos():
    filmes = FilmeBean.getAll()
    if filmes is None:
        return jsonify(
                message=f"Filmes nao Encontrado ",
                category="Not Found",
                data=None,
                status=404
            )
    
    return jsonify(
                message="Filmes Encontrados",
                category="Success",
                data=toListJson(filmes),
                status=200
            )
   
@app.route('/filmesLike')
def obter_todosLike():
    filmes = load_filmes()
    # gostos = [filme for filme in filmes if filme.get('gosto')]
    return jsonify(filmes)


@app.route('/filmes/update/<int:id>', methods=['PUT'])
def filme_update(id:int):
    print(id)
    filme_alterado = request.get_json()
    for indice, filme in enumerate(filmes):
        if filme.get('id') == id:
            filmes[indice].update(filme_alterado)
    return jsonify(filmes[indice])


    """
    ROUTE USER
    """

@app.route('/create',methods=['POST']) # CRIA UM DETERMINADO USUARIO
def createUser():
    newUser = request.get_json()
    newNome = newUser.get('nome')
    newNomeUser = newUser.get('nome_user')
    newSenha = newUser.get('senha')
    userLogado = UsuarioBean.save(newUsuario=Usuario(id=0,nome=newNome,nome_user=newNomeUser,senha=newSenha))
    session["userLogado"] = userLogado
    if userLogado is None:
        return jsonify(
                message=f"Usuario nao Encontrado {newNomeUser} ",
                category="Not Found",
                data=None,
                status=404
            )
    
    return jsonify(
                message="Seja Bem-vindo ",
                category="Success",
                data=toJson(userLogado),
                status=200
            )

    """_ROUTE VITRINES
    """

@app.route('/vitrines',methods=['POST']) # Pega todas as vitrines ou sejas os filmes com as devidas accoes anteriormente fietas pelo user
def getAllVitrine():
    userLogado= Usuario.jsonToUsuario(request.get_json())
    vitrines = VitrineBean.getByUsuario(usuaruio=userLogado)
    if vitrines is None:
        return jsonify(
                message=f"Filmes nao Encontrado ",
                category="Not Found",
                data=None,
                status=404
            )

    return jsonify(
                message="Filmes Encontrados",
                category="Success",
                data=toListJson(vitrines),
                status=200
            )    
    
@app.route('/vitrinesLike/<int:id>',methods=['GET']) # Pega todos os filmes com gosto
def getAllVitrineLike(id):
    userLogado= UsuarioBean.getById(id=id)
    vitrines = VitrineBean.getByUsuarioLike(usuaruio=userLogado)
    if vitrines is None:
        return jsonify(
                message=f"Filmes nao Encontrado ",
                category="Not Found",
                data=None,
                status=404
            )

    return jsonify(
                message="Filmes Encontrados",
                category="Success",
                data=toListJson(vitrines),
                status=200
            )    
    
@app.route('/vitrinesFavoritos/<int:id>',methods=['GET']) # Pega todos os filmes com gosto
def getAllVitrineFavoritos(id):
    userLogado= UsuarioBean.getById(id=id)
    vitrines = VitrineBean.getByUsuarioFavoritos(usuaruio=userLogado)
    if vitrines is None:
        return jsonify(
                message=f"Filmes nao Encontrado ",
                category="Not Found",
                data=None,
                status=404
            )

    return jsonify(
                message="Filmes Encontrados",
                category="Success",
                data=toListJson(vitrines),
                status=200
            )    
    
@app.route('/vitrinesSorted/<int:id>/<value>',methods=['GET']) # Pega todos os filmes com gosto
def getAllVitrineSorted(id,value):
    userLogado= UsuarioBean.getById(id=id)
    vitrines = VitrineBean.getByIdUsuarioSorted(usuaruio=userLogado,value=value)
    if vitrines is None:
        return jsonify(
                message=f"Filmes nao Encontrado ",
                category="Not Found",
                data=None,
                status=404
            )

    return jsonify(
                message="Filmes Encontrados",
                category="Success",
                data=toListJson(vitrines),
                status=200
            )    
@app.route('/vitrinesGenero/<int:id>/<genero>',methods=['GET']) # Pega todos os filmes com gosto
def getAllVitrineGenero(id,genero):
    userLogado= UsuarioBean.getById(id=id)
    vitrines = VitrineBean.getByIdUsuarioGenero(usuaruio=userLogado,genero=genero)
    if vitrines is None:
        return jsonify(
                message={genero}+" nao Encontrado ",
                category="Not Found",
                data=None,
                status=404
            )

    return jsonify(
                message="Filmes Encontrados",
                category="Success",
                data=toListJson(vitrines),
                status=200
            )    
    
@app.route('/vitrineFilmeUser',methods=['POST']) # pega uma vitrine de usuario especifica pelo filme
def getByFilmeAndUser():
    idUsuario = request.get_json().get('idUsuario')
    idFilme = request.get_json().get('idFilme')
    vitrine = VitrineBean.getByFilmeAndUsuario(idFilme=idFilme,idUsuario=idUsuario)
    if vitrine is None:
        return jsonify(
                message=f"Filmes nao Encontrado ",
                category="Not Found",
                data=None,
                status=404
            )
    
    return jsonify(
                message="Filmes Encontrados",
                category="Success",
                data=toListJson(vitrine),
                status=200
            )
    
@app.route('/vitrineEpisodeoUser',methods=['POST'])
def getByEpisodeoAndUser():
    idUsuario = request.get_json().get('idUsuario')
    idFilme = request.get_json().get('idFilme')
    vitrine = VitrineEpisodeoBean.getByFilmeAndUsuario(idFilme=idFilme,idUsuario=idUsuario)
    if vitrine is None:
        return jsonify(
                message=f"Filmes nao Encontrado ",
                category="Not Found",
                data=None,
                status=404
            )
    
    return jsonify(
                message="Filmes Encontrados",
                category="Success",
                data=toListJson(vitrine),
                status=200
            )
    

@app.route('/updateVitrine', methods=['POST'])
def updateVitrine():
    vitrine = Vitrine.jsonToVitrine(request.get_json())
    if VitrineBean.update(vitrine=vitrine):
        return jsonify(
                message=f"Filmes nao Encontrado ",
                category="Not Found",
                data=None,
                status=404
            )
    
    return jsonify(
                message="Filmes Encontrados",
                category="Success",
                data=toListJson(vitrine),
                status=200
            )
    
@app.route('/updateVitrineEpisodeo', methods=['POST'])
def updateVitrineEpisodeo():
    vitrine = VitrineEpisodeo.jsonToVitrine(request.get_json())
    if VitrineEpisodeoBean.update(vitrine=vitrine):
        return jsonify(
                message=f"Filmes nao Encontrado ",
                category="Not Found",
                data=None,
                status=404
            )
    
    return jsonify(
                message="Filmes Encontrados",
                category="Success",
                data=toListJson(vitrine),
                status=200
            )
    
@app.route('/updateVitrineLike', methods=['POST'])
def updateVitrineLike():
    vitrine = Vitrine.jsonToVitrine(request.get_json())
    if VitrineBean.updateLike(vitrine=vitrine):
        return jsonify(
                message=f"Filmes nao Encontrado ",
                category="Not Found",
                data=None,
                status=404
            )
    
    return jsonify(
                message="Filmes Encontrados",
                category="Success",
                data=toListJson(vitrine),
                status=200
            )
    
@app.route('/updateVitrineLista', methods=['POST'])
def updateVitrineLista():
    vitrine = Vitrine.jsonToVitrine(request.get_json())
    if VitrineBean.updateLista(vitrine=vitrine):
        return jsonify(
                message=f"Filmes nao Encontrado ",
                category="Not Found",
                data=None,
                status=404
            )
    
    return jsonify(
                message="Filmes Encontrados",
                category="Success",
                data=toListJson(vitrine),
                status=200
            )
    
@app.route('/updateVitrineStar', methods=['POST'])
def updateVitrineStar():
    vitrine = Vitrine.jsonToVitrine(request.get_json())
    if VitrineBean.updateStar(vitrine=vitrine):
        return jsonify(
                message=f"Filmes nao Encontrado ",
                category="Not Found",
                data=None,
                status=404
            )
    
    return jsonify(
                message="Filmes Encontrados",
                category="Success",
                data=toListJson(vitrine),
                status=200
            )

    """ ROUTE COMENTARIOS
    """
@app.route('/comentariosFilme/<int:id>', methods=['GET'])
def comentariosFilme(id):
    comentarios = ComentarioBean.getByIdFilme(idFilme=id)
    if len(comentarios) == 0:
        return jsonify(
                message=f"Filmes nao Encontrado ",
                category="Not Found",
                data=None,
                status=404
            )
    
    return jsonify(
                message="Filmes Encontrados",
                category="Success",
                data=toListJson(comentarios),
                status=200
            )
    
@app.route('/saveComentarioFilme', methods=['POST'])
def savecomentarioFilme():
    comentario = Comentario.jsonToComentario(json=request.get_json())
    print(comentario.filme.id)
    print(comentario.usuario.id)
    comentario = ComentarioBean.save(newComentario=comentario)
    if  comentario is None:
        return jsonify(
                message=f" Adiciona um comentário",
                category="Not Found",
                data=None,
                status=404
            )
    
    return jsonify(
                message="Filmes Encontrados",
                category="Success",
                data=toListJson(comentario),
                status=200
            )


def toJson(obj): #TRANSFORMA UM OBJECTO EM JSON
    return json.dumps(my_dict.para_dict(obj=obj))

def toListJson(objs): #TRANSFORMA UM OBJECTO EM JSON
    # return json.dumps([obj.__dict__ for obj in objs])
    return json.dumps(my_dict.para_dict(obj=objs))

if __name__ == "__main__":
    app.run(
        port=5000,
        # host="172.10.15.94",
        debug=True 
    )

