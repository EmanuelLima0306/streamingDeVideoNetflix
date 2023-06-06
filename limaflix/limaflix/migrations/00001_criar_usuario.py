from limaflix.db import conn

cur = conn.cursor()

cur.execute("""
    CREATE TABLE IF NOT EXISTS users(
        id integer primary key AUTOINCREMENT,
        nome,
        nome_user UNIQUE,
        senha
    )
""")

conn.commit()
