import limaflix.db as db
from limaflix.bean.episodeo_bean import EpisodeoBean
from limaflix.models.temporada import Temporada
class TemporadaController:
    def __init__(self) -> None:
        pass
    def save(newTemporada):
        try :
            conn = db.getConexao()
            cur = conn.cursor()
            param = (newTemporada.title, newTemporada.numero, newTemporada.idFilme)
            cur.execute("""
            INSERT INTO temporadas(title, numero, idFilme) VALUES
                (?, ?, ?)
        """,param)
            conn.commit()
            conn.close()
            return True
        except :
            return False
        
    def getAll() :
        conn = db.getConexao()
        cur = conn.cursor()
        cur.execute("SELECT * FROM temporadas")
        lista = []
        for temporada in cur:
            lista.append(TemporadaController.fetchToObject(temporada=temporada))
        return cur.fetchall()
    
    def getLast() :
        conn = db.getConexao()
        cur = conn.cursor()
        cur.execute("SELECT * FROM temporadas ORDER BY id DESC LIMIT 1")
        return TemporadaController.fetchToObject(cur.fetchone()) 
    
    def getByIdFilme(idFilme) :
        conn = db.getConexao()
        cur = conn.cursor()
        param = (idFilme,)
        cur.execute("SELECT * FROM temporadas WHERE idFilme = ?",param)
        lista = []
        for temporada in cur:
            lista.append(TemporadaController.fetchToObject(temporada))
        return lista
    
    def fetchToObject(temporada):
       return None if temporada is None else Temporada(id=temporada[0],title=temporada[1],numero=temporada[2],episodeos=EpisodeoBean.getByIdTemporada(idTemporada=temporada[0]),idFilme=temporada[3])