# Resultado da enquete

> ## Caso de sucesso

1. :X: Recebe uma requisição do tipo **POST** na rota **/api/surveys/{survey_id}/results**
2. :X: Valida se a requisição foi feita por um **usuário**
3. :X: Valida o parâmetro **survey_id**
4. :X: Valida se o campo **answer** é uma resposta válida.
5. :X: **Cria** um resultado de enquete com os dados fornecidos caso não tenha um registro
5. :X: **Atualiza** um resultado de enquete com os dados fornecidos caso já tenha um registro
6. :X: Retorna **200** com os dados do resultado da enquete

> ## Exceções

1. :X: Retorna erro **404** se a API não existir
2. :X: Retorna erro **403** se não for um usuário
3. :X: Retorna erro **403** se o survey_id passado na URL for inválido
4. :X: Retorna erro **403** se a resposta enviada pelo client for uma resposta inválida
5. :X: Retorna erro **500** se der erro ao tentar criar o resultado da enquete
5. :X: Retorna erro **500** se der erro ao tentar atualizar o resultado da enquete