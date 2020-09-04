# Login

> ## Caso de sucesso

1. :x: Recebe uma requisição do tipo **POST** na rota **/api/login**
2. :x: Valida dados obrigatórios **email** e **password**
3. :x: Valida que o campo **email** é um e-mail válido
4. :x: **Busca** o usuário com o email e senha fornecidos
5. :x: Gera um **token** de acesso a partir do ID do usuário
6. :x: **Atualiza** os dados do usuário com o token de acesso gerado
7. :x: Retorna **200** com o token de acesso e o nome do usuário

> ## Exceções

1. :x: Retorna erro **404** se a API não existir
2. :x: Retorna erro **400** se email ou password não forem fornecidos pelo client
3. :x: Retorna erro **400** se o campo email for um e-mail inválido
4. :x: Retorna erro **401** se não encontrar um usuário com os dados fornecidos
5. :x: Retorna erro **500** se der erro ao tentar gerar o token de acesso
6. :x: Retorna erro **500** se der erro ao tentar atualizar o usuário com o token de acesso gerado