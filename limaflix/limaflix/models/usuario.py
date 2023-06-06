# limaflix:models:usuario

class Usuario:
    def __init__(self, id, nome, nome_user, senha):
        self.id = id  
        self.nome = nome
        self.nome_user = nome_user
        self.senha = senha 

    # @property
    # def id(self):
    #     return self.id

    # @property
    # def senha(self):
    #     return self.senha

    # @senha.setter
    # def price(self, nova_senha):
    #     if len(nova_senha) < 8:
    #         print("Senha inválida")
    #         return  # pode retornar exceção

        # self._senha = nova_senha

    def is_empty(self):
        return self.nome is None or self.nome is None or self.senha is None
    
    def json(self):
        return {"id":self.id, "nome":self.nome, "nome_user":self.nome_user, "senha":self.senha}
    
    def jsonToUsuario(json):
        return Usuario(
            id=json.get('id'),
            nome=json.get('nome'),
            nome_user=json.get('nome_user'),
            senha=json.get('senha')
            )