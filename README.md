# Instalura
Mini versão do **Instagram** com **React**

# Requerimentos
- [npm](https://www.npmjs.com/get-npm)
- [MySql 5.5](https://dev.mysql.com/downloads/mysql/5.5.html#downloads)
- [JAVA](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

# Uso

1. Iniciar a **API local em Java** com o comando `java -Dspring.datasource.password=suaSenha -jar instalura.jar` 
1. Carregar os dados da API para teste atráves da url `http://localhost:8080/gera/dados`
1. Executar o script `instalura-scrip.sql` para correçao das imagens, as urls das imagens não existem mais
1. Dentro da pasta **App** executar o comando `npm i` para instalar as dependências do React
1. Por fim executar o `comando npm start`

# Screenshot

 ![](https://github.com/denmarksdev/instalura/blob/master/screenshot.JPG?raw=true "Instalura")
 
 # Referências
  [Alberto Souza - **React parte 2: Container components e o ciclo de vida do react** ](https://cursos.alura.com.br/course/react)
