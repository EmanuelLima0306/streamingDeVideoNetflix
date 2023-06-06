from limaflix.bean import usuario_bean
import limaflix.db as db
from limaflix.models.comentario import Comentario

class ComentarioController:
    
    def save(newComentario):
        try :
            conn = db.getConexao()
            cur = conn.cursor()
            param = (newComentario.usuario.id, newComentario.filme.id, newComentario.descricao)
            cur.execute("""
            INSERT INTO comentarios (idUsuario , idFilme, descricao) VALUES
                (?, ?, ?)
            """,param)
            conn.commit()
            conn.close()
            return True
        except Exception as ex:
            print(ex)
            return False
        
    def update(newComentario):
        try :
            conn = db.getConexao()
            cur = conn.cursor()
            param = (newComentario.usuario.id, newComentario.filme.id, newComentario.descricao)
            cur.execute("""
            UPDATE comentarios SET idUsuario = ?, idFilme = ?, descricao = ? WHERE id = ?
            """,param)
            conn.commit()
            conn.close()
            return True
        except Exception as ex:
            print(ex)
            return False
        
    def getAll() :
        conn = db.getConexao()
        cur = conn.cursor()
        cur.execute("SELECT * FROM comentarios ")
        lista = []
        for comentario in cur:
            lista.append(ComentarioController.fetchToObject(comentario=comentario))
        return lista
    
    def getLast() :
        conn = db.getConexao()
        cur = conn.cursor()
        cur.execute("SELECT * FROM comentarios ORDER BY id DESC LIMIT 1")
        return ComentarioController.fetchToObject(cur.fetchone()) 
    
    
    def getByIdFilme(idFilme) :
        conn = db.getConexao()
        cur = conn.cursor()
        param = (idFilme,)
        cur.execute("SELECT * FROM comentarios WHERE idFilme = ? ORDER BY id DESC",param)
        lista = []
        for comentario in cur:
            lista.append(ComentarioController.fetchToObject(comentario))
        return lista

    
    def fetchToObject(comentario):
       return None if comentario is None else Comentario(id=comentario[0], usuario=usuario_bean.UsuarioBean.getById(comentario[1]),filme=None, descricao=comentario[3])