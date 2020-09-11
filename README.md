npm i git-commit-msg-linter -D

npm i typescript @types/node -D

npm tsc --init

npm i eslint -D
./node_modules/.bin/eslint --init

 npm i husky -D 
 npm i -D lint-staged 

 npm i -D jest @types/jest ts-jest
 $ npx jest --clearCache

  --silent
  <!-- exibe apenas os testes que falharam -->
  <!-- caso esteja fazendo console.error, não exibe nos testes -->
  --noStackTrace
  <!-- esconde as linas que deram erro -->
  --findRelatedTests
  <!-- só roda os testes nos arquivos modificados -->
  --runInBand
<!-- faz o jest rodar os testes de forma sequêncial -->



<!-- para atualizas as libs -->
npm-check -s -u  

<!-- validação de email -->
npm i validator
npm i @types/validator -D

npm i bcrypt  
npm i @types/bcrypt  -D

<!-- MongoDB em memória -->
npm i -D @shelf/jest-mongodb  @types/mongodb

<!-- MongoDb -->
npm i mongodb

npm i express    
npm i @types/express -D
npm i sucrase -D    

<!-- para testar od middlewares -->
npm i supertest @types/supertest -D

<!-- importa automatica das rotas -->
npm i fast-glob

yarn add jsonwebtoken    
yarn add @types/jsonwebtoken -D

yarn add rimraf -D

<!-- Docker -->
docker build -t clean-node-api 

<!-- sh, entra na image através do sh -->
docker run -it clean-node-api sh

docker run -p 5000:5000 clean-node-api

docker-compose up

yarn add nodemon 
<!-- nodemon -L -->
faz o trabalhar em tempo real dentro do container

<!-- yarn tsc -w -->


<!-- tsconfig.json -->
* rootDir  -> muda a raiz do projeto para a pasta src

yarn add mockdate -D