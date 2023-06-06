import limaflix.db as db
from limaflix.models.usuario import Usuario


class UsuarioController:
    
    def __init__(self) :
        pass
        
    def save(newUsuario):
        conn = db.getConexao()
        try :
            cur = conn.cursor()
            param = (newUsuario.nome, newUsuario.nome_user, newUsuario.senha)
            print(cur.execute("""
            INSERT INTO users(nome, nome_user, senha) VALUES
                (?, ?, ?)
        """,param))
            conn.commit()
            conn.close()
            return True
        except :
            return False
        finally :
            conn.close()
        
    def login(nome_user, senha) :
        conn = db.getConexao()
        try :
            cur = conn.cursor()
            param = (nome_user, senha)
            cur.execute("SELECT * FROM users WHERE nome_user = ? AND senha = ?",param)
            return UsuarioController.fetchToObject(cur.fetchone())
        except :
                return None
        finally:
            conn.close()
            
        
        
    def getAll() :
        conn = db.getConexao()
        try :
            cur = conn.cursor()
            cur.execute("SELECT * FROM users")
            lista = []
            for usuario in cur:
                lista.append(UsuarioController.fetchToObject(usuario=usuario))
            return lista
        finally :
            conn.close()
    
    def getLast() :
        conn = db.getConexao()
        try :
            cur = conn.cursor()
            cur.execute("SELECT * FROM users ORDER BY id DESC LIMIT 1")
            usuario = cur.fetchone()
            return UsuarioController.fetchToObject(usuario=usuario)
        finally :
            conn.close()
    
    def getById(id) :
        conn = db.getConexao()
        try :
            cur = conn.cursor()
            param = (id,)
            cur.execute("SELECT * FROM users WHERE id = ?",param)
            return UsuarioController.fetchToObject(usuario=cur.fetchone())
        finally :
            conn.close()
        
    def fetchToObject(usuario):
        return None if usuario is None else Usuario(id=usuario[0],nome=usuario[1],nome_user=usuario[2],senha=usuario[3])
