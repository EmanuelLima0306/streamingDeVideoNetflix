from limaflix.bean.temporada_bean import TemporadaBean
import limaflix.db as db
from limaflix.models.filme import Filme

class FilmeController:
    
    def save(newFilme):
        try :
            conn = db.getConexao()
            cur = conn.cursor()
            param = (newFilme.title , newFilme.trailer, newFilme.ano, newFilme.genero, newFilme.descricao, newFilme.imagem, newFilme.imageTitle, newFilme.filme, newFilme.url, newFilme.elenco, newFilme.cenas, newFilme.especificacao, newFilme.gosto, newFilme.lista, newFilme.currentTime)
            cur.execute("""
            INSERT INTO filmes (title , trailer, ano, genero, descricao, imagem, imageTitle, filme, url, elenco, cenas, especificacao, gosto, lista, currentTime) VALUES
                (?, ?,?, ?, ?,?, ?, ?,?, ?, ?,?, ?, ?,?)
        """,param)
            conn.commit()
            conn.close()
            return True
        except :
            return False
        
        
    def dele(id):
        conn = db.getConexao()
        cur = conn.cursor()
        param = (id,)
        cur.execute("""
        DELETE FROM filmes WHERE id = ?
    """,param)
        conn.commit()
        conn.close()  
          
        
    def getAll() :
        conn = db.getConexao()
        cur = conn.cursor()
        cur.execute("SELECT * FROM filmes")
        lista = []
        for filme in cur:
            lista.append(FilmeController.fetchToObject(filme))
        return lista
    
    def getLast() :
        conn = db.getConexao()
        cur = conn.cursor()
        cur.execute("SELECT * FROM filmes ORDER BY id DESC LIMIT 1")
        return FilmeController.fetchToObject(cur.fetchone())
    
    def getById(id) :
        conn = db.getConexao()
        cur = conn.cursor()
        param = (id,)
        cur.execute("SELECT * FROM filmes WHERE id = ?",param)
        return FilmeController.fetchToObject(cur.fetchone())
    
    def getQTD() :
        conn = db.getConexao()
        cur = conn.cursor()
        cur.execute("SELECT COUNT(id) FROM filmes ")
        qtd = cur.fetchone()[0]
        return 0 if qtd is None else qtd
    
    def fetchToObject(filme):
       return None if filme is None else Filme(id=filme[0],title=filme[1] , temporadas= TemporadaBean.getByIdFilme(filme[0]), trailer=filme[2], ano=filme[3], genero=filme[4], descricao=filme[5], imagem=filme[6], imageTitle=filme[7], filme=filme[8], url=filme[9], elenco=filme[10], cenas=filme[11], especificacao=filme[12], gosto=filme[13], lista=filme[14], currentTime=filme[15])
      

