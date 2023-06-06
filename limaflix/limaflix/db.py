# limaflix:db
import sqlite3

url = 'limaflix/limaflix.db'

def getConexao():
    try:
        _createdb()
        conn = sqlite3.connect(url)
        return conn
    except :
        return None
        
def _createdb():
    try:
        conn = sqlite3.connect(url)
        cur = conn.cursor()
        cur.execute("CREATE TABLE IF NOT EXISTS users (id integer primary key AUTOINCREMENT, nome, nome_user UNIQUE, senha)")
        cur.execute("CREATE TABLE IF NOT EXISTS filmes (id integer primary key AUTOINCREMENT, title , trailer, ano, genero, descricao, imagem, imageTitle, filme, url, elenco, cenas, especificacao, gosto, lista, currentTime)")
        cur.execute("CREATE TABLE IF NOT EXISTS temporadas (id integer primary key AUTOINCREMENT, title, numero, idFilme integer)")
        cur.execute("CREATE TABLE IF NOT EXISTS episodeos (id integer primary key AUTOINCREMENT, title , trailer, ano, genero, descricao, imagem, imageTitle, filme, url, elenco, cenas, especificacao, gosto, lista, currentTime,idTemporada integer)")
        cur.execute("CREATE TABLE IF NOT EXISTS vitrines (id integer primary key AUTOINCREMENT, gosto, lista, qtdEstrela integer, currentTime, idUsuario integer, idFilme integer)")
        cur.execute("CREATE TABLE IF NOT EXISTS vitrines_episodeos (id integer primary key AUTOINCREMENT, currentTime, idUsuario integer, idFilme integer)")
        cur.execute("CREATE TABLE IF NOT EXISTS comentarios (id integer primary key AUTOINCREMENT, idUsuario integer, idFilme integer, descricao)")
       
        # res = cur.execute("SELECT name FROM sqlite_master") # SELECIONA AS TABELAS DA BD
        conn.close()
    except :
        print('Erro ao conectar com o banco de dados')