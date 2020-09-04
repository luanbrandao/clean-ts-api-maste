# Cadastro

> ## Caso de sucesso

1. :x: Recebe uma requisição do tipo **POST** na rota **/api/signup**
2. :x: Valida dados obrigatórios **name**, **email**, **password** e **passwordConfirmation**
3. :x: Valida que **password** e **passwordConfirmation** são iguais
4. :x: Valida que o campo **email** é um e-mail válido
5. :x: **Valida** se já existe um usuário com o email fornecido
6. :x: Gera uma senha **criptografada** (essa senha não pode ser descriptografada)
7. :x: **Cria** uma conta para o usuário com os dados informados, **substituindo** a senha pela senha criptorafada
8. :x: Gera um **token** de acesso a partir do ID do usuário
9. :x: **Atualiza** os dados do usuário com o token de acesso gerado
10. :x: Retorna **200** com o token de acesso e o nome do usuário

> ## Exceções

1. :x: Retorna erro **404** se a API não existir
2. :x: Retorna erro **400** se name, email, password ou passwordConfirmation não forem fornecidos pelo client
3. :x: Retorna erro **400** se password e passwordConfirmation não forem iguais
4. :x: Retorna erro **400** se o campo email for um e-mail inválido
5. :x: Retorna erro **403** se o email fornecido já estiver em uso
6. :x: Retorna erro **500** se der erro ao tentar gerar uma senha criptografada
7. :x: Retorna erro **500** se der erro ao tentar criar a conta do usuário
8. :x: Retorna erro **500** se der erro ao tentar gerar o token de acesso
9. :x: Retorna erro **500** se der erro ao tentar atualizar o usuário com o token de acesso gerado