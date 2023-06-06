from limaflix.bean import usuario_bean
import limaflix.db as db
from limaflix.bean.filme_bean import FilmeBean
from limaflix.models.vitrine import Vitrine

class VitrineController:
    
    def save(newVitrine):
        try :
            conn = db.getConexao()
            cur = conn.cursor()
            param = (newVitrine.gosto, newVitrine.lista, newVitrine.qtdEstrela, newVitrine.currentTime, newVitrine.usuario.id, newVitrine.filme.id)
            cur.execute("""
            INSERT INTO vitrines ( gosto, lista, qtdEstrela , currentTime, idUsuario , idFilme ) VALUES
                (?, ?, ?, ?, ?, ?)
            """,param)
            conn.commit()
            conn.close()
            return True
        except Exception as ex:
            print(ex)
            return False
        
    def update(newVitrine):
        try :
            conn = db.getConexao()
            cur = conn.cursor()
            param = (newVitrine.gosto, newVitrine.lista, newVitrine.qtdEstrela, newVitrine.currentTime, newVitrine.usuario.id, newVitrine.filme.id, newVitrine.id)
            cur.execute("""
            UPDATE vitrines SET gosto = ?, lista = ?, qtdEstrela = ?, currentTime = ?, idUsuario = ?, idFilme = ? WHERE id = ?
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
        cur.execute("SELECT * FROM vitrines ")
        lista = []
        for vitrine in cur:
            lista.append(VitrineController.fetchToObject(vitrine=vitrine))
        return lista
    
    def getLast() :
        conn = db.getConexao()
        cur = conn.cursor()
        cur.execute("SELECT * FROM vitrines ORDER BY id DESC LIMIT 1")
        return VitrineController.fetchToObject(cur.fetchone()) 
    
    def getQTDByUsuario(idUsuario) :
        conn = db.getConexao()
        cur = conn.cursor()
        param = (idUsuario,)
        cur.execute("SELECT COUNT(id) FROM vitrines WHERE idUsuario = ?",param)
        qtd = cur.fetchone()[0]
        return 0 if qtd is None else qtd
    
    def getByIdFilme(idFilme) :
        conn = db.getConexao()
        cur = conn.cursor()
        param = (idFilme,)
        cur.execute("SELECT * FROM vitrines WHERE idFilme = ?",param)
        lista = []
        for vitrine in cur:
            lista.append(VitrineController.fetchToObject(vitrine))
        return lista
    
    def getByIdUsuario(idUsuario) :
        conn = db.getConexao()
        cur = conn.cursor()
        param = (idUsuario,)
        cur.execute("SELECT * FROM vitrines WHERE idUsuario = ?",param)
        lista = []
        for vitrine in cur:
            lista.append(VitrineController.fetchToObject(vitrine))
        return lista
    
    def getByIdUsuarioLike(idUsuario) :
        conn = db.getConexao()
        cur = conn.cursor()
        param = (idUsuario,True)
        cur.execute("SELECT * FROM vitrines WHERE idUsuario = ? AND gosto = ?",param)
        lista = []
        for vitrine in cur:
            lista.append(VitrineController.fetchToObject(vitrine))
        return lista
    
    def getByIdUsuarioFavoritos(idUsuario) :
        conn = db.getConexao()
        cur = conn.cursor()
        param = (idUsuario,True)
        cur.execute("SELECT * FROM vitrines WHERE idUsuario = ? AND lista = ?",param)
        lista = []
        for vitrine in cur:
            lista.append(VitrineController.fetchToObject(vitrine))
        return lista
    
    def getByIdUsuarioSorted(idUsuario, value) :
        conn = db.getConexao()
        cur = conn.cursor()
        param = (idUsuario,'%'+value+'%','%'+value+'%')
        cur.execute("SELECT * FROM vitrines v INNER JOIN filmes f ON v.idFilme=f.id WHERE v.idUsuario = ? AND (f.title LIKE ? OR f.ano LIKE ?) ",param)
        lista = []
        for vitrine in cur:
            lista.append(VitrineController.fetchToObject(vitrine))
        return lista
    
    def getByIdUsuarioGenero(idUsuario, genero) :
        conn = db.getConexao()
        cur = conn.cursor()
        param = (idUsuario,"%"+genero+"%")
        cur.execute("SELECT * FROM vitrines v INNER JOIN filmes f ON v.idFilme=f.id WHERE v.idUsuario = ? AND f.especificacao LIKE ? ",param)
        lista = []
        for vitrine in cur:
            print("chegou")
            lista.append(VitrineController.fetchToObject(vitrine))
            
        return lista
    
    def getByIdFilmeAndIdUsuario(idFilme, idUsuario) :
        conn = db.getConexao()
        cur = conn.cursor()
        param = (idFilme,idUsuario)
        cur.execute("SELECT * FROM vitrines WHERE idFilme = ? AND idUsuario = ?",param)
        return VitrineController.fetchToObject(cur.fetchone())
    
    def fetchToObject(vitrine):
       return None if vitrine is None else Vitrine(id=vitrine[0],gosto=vitrine[1],lista=vitrine[2],qtdEstrela=vitrine[3],currentTime=vitrine[4], usuario=usuario_bean.UsuarioBean.getById(vitrine[5]),filme=FilmeBean.getById(vitrine[6]))