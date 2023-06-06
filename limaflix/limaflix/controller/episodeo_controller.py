import limaflix.db as db
from limaflix.models.episodeo import Episodeo

class EpisodeoController:
    def __init__(self):
        self.filme = Episodeo
    
    def save(newEpisodeo):
        try :
            conn = db.getConexao()
            cur = conn.cursor()
            param = (newEpisodeo.title , newEpisodeo.trailer, newEpisodeo.ano, newEpisodeo.genero, newEpisodeo.descricao, newEpisodeo.imagem, newEpisodeo.imageTitle, newEpisodeo.filme, newEpisodeo.url, newEpisodeo.elenco, newEpisodeo.cenas, newEpisodeo.especificacao, newEpisodeo.gosto, newEpisodeo.lista, newEpisodeo.currentTime,newEpisodeo.idTemporada)
            cur.execute("""
            INSERT INTO episodeos (title , trailer, ano, genero, descricao, imagem, imageTitle, filme, url, elenco, cenas, especificacao, gosto, lista, currentTime,idTemporada) VALUES
                (?, ?, ?,?, ?, ?,?, ?, ?,?, ?, ?,?, ?, ?,?)
        """,param)
            conn.commit()
            conn.close()
            return True
        except :
            return False
        
    def getAll() :
        conn = db.getConexao()
        cur = conn.cursor()
        cur.execute("SELECT * FROM episodeos")
        lista = []
        for episodeo in cur:
            lista.append(Episodeo(id=episodeo[0],title=episodeo[1] , trailer=episodeo[2], ano=episodeo[3], genero=episodeo[4], descricao=episodeo[5], imagem=episodeo[6], imageTitle=episodeo[7], filme=episodeo[8], url=episodeo[9], elenco=episodeo[10], cenas=episodeo[11], especificacao=episodeo[12], gosto=episodeo[13], lista=episodeo[14], currentTime=episodeo[15],idTemporada=episodeo[16]))
        return lista
    
    def getByIdTemporada(idTempora) :
        conn = db.getConexao()
        cur = conn.cursor()
        param = (idTempora,)
        cur.execute("SELECT * FROM episodeos WHERE idTemporada = ?",param)
        lista = []
        for episodeo in cur:
            lista.append(EpisodeoController.fetchToObject(episodeo))
        return lista
    
    def getById(id) :
        conn = db.getConexao()
        cur = conn.cursor()
        param = (id,)
        cur.execute("SELECT * FROM episodeos WHERE id = ?",param)
        return EpisodeoController.fetchToObject(cur.fetchone())
    
    def getLast() :
        conn = db.getConexao()
        cur = conn.cursor()
        cur.execute("SELECT * FROM episodeos ORDER BY id DESC LIMIT 1")
        episodeo = cur.fetchone()
        return EpisodeoController.fetchToObject(episodeo=episodeo)    
        
    def fetchToObject(episodeo):
       return None if episodeo is None else Episodeo(id=episodeo[0],title=episodeo[1] , trailer=episodeo[2], ano=episodeo[3], genero=episodeo[4], descricao=episodeo[5], imagem=episodeo[6], imageTitle=episodeo[7], filme=episodeo[8], url=episodeo[9], elenco=episodeo[10], cenas=episodeo[11], especificacao=episodeo[12], gosto=episodeo[13], lista=episodeo[14], currentTime=episodeo[15],idTemporada=episodeo[16])