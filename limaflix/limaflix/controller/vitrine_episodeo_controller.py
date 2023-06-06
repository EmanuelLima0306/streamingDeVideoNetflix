from limaflix.bean import usuario_bean
from limaflix.bean.episodeo_bean import EpisodeoBean
import limaflix.db as db
from limaflix.models.vitrine import Vitrine
from limaflix.models.vitrine_episodeo import VitrineEpisodeo

class VitrineEpisodeoController:
    
    def save(newVitrine):
        try :
            conn = db.getConexao()
            cur = conn.cursor()
            param = (newVitrine.currentTime, newVitrine.usuario.id, newVitrine.filme.id)
            cur.execute("""
            INSERT INTO vitrines_episodeos (currentTime, idUsuario , idFilme ) VALUES
                (?, ?, ?)
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
            param = (newVitrine.currentTime, newVitrine.usuario.id, newVitrine.filme.id, newVitrine.id)
            cur.execute("""
            UPDATE vitrines_episodeos SET currentTime = ?, idUsuario = ?, idFilme = ? WHERE id = ?
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
        cur.execute("SELECT * FROM vitrines_episodeos ")
        lista = []
        for vitrine in cur:
            lista.append(VitrineEpisodeoController.fetchToObject(vitrine=vitrine))
        return lista
    
    def getLast() :
        conn = db.getConexao()
        cur = conn.cursor()
        cur.execute("SELECT * FROM vitrines_episodeos ORDER BY id DESC LIMIT 1")
        return VitrineEpisodeoController.fetchToObject(cur.fetchone()) 
    
    def getQTDByUsuario(idUsuario) :
        conn = db.getConexao()
        cur = conn.cursor()
        param = (idUsuario,)
        cur.execute("SELECT COUNT(id) FROM vitrines_episodeos WHERE idUsuario = ?",param)
        qtd = cur.fetchone()[0]
        return 0 if qtd is None else qtd
    
    def getByIdFilme(idFilme) :
        conn = db.getConexao()
        cur = conn.cursor()
        param = (idFilme,)
        cur.execute("SELECT * FROM vitrines_episodeos WHERE idFilme = ?",param)
        lista = []
        for vitrine in cur:
            lista.append(VitrineEpisodeoController.fetchToObject(vitrine))
        return lista
    
    def getByIdUsuario(idUsuario) :
        conn = db.getConexao()
        cur = conn.cursor()
        param = (idUsuario,)
        cur.execute("SELECT * FROM vitrines_episodeos WHERE idUsuario = ?",param)
        lista = []
        for vitrine in cur:
            lista.append(VitrineEpisodeoController.fetchToObject(vitrine))
        return lista
    
    def getByIdFilmeAndIdUsuario(idFilme, idUsuario) :
        conn = db.getConexao()
        cur = conn.cursor()
        param = (idFilme,idUsuario)
        cur.execute("SELECT * FROM vitrines_episodeos WHERE idFilme = ? AND idUsuario = ?",param)
        return VitrineEpisodeoController.fetchToObject(cur.fetchone())
    
    def fetchToObject(vitrine):
       return None if vitrine is None else VitrineEpisodeo(id=vitrine[0],currentTime=vitrine[1], usuario=usuario_bean.UsuarioBean.getById(vitrine[2]),filme=EpisodeoBean.getById(vitrine[3]))