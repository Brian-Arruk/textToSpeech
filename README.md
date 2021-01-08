# Conversor de Texto Para Audio

### Este projeto consiste em converter uma mensagem de texto para áudio utilizando a API [Text to Speech do IBM Watson](https://www.ibm.com/cloud/watson-text-to-speech).
<br>

# Tecnologias Utilizadas

- [NodeJS](https://nodejs.org/en/)
- [AJAX](https://www.w3schools.com/js/js_ajax_intro.asp)
- [MySQL](https://www.mysql.com/)

# Como Baixar o Projeto
### É necessário fazer o download de alguns pacotes pelo terminal
```bash
npm install express --save
npm install body-parser
npm install ibm-watson@^5.7.1
npm install --save mysql
```
# Criação do Banco de Dados MySQL
```sql
CREATE TABLE Comentario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    text VARCHAR(255)
)
```
# 
### Para integrar com o [IBM Watson](https://www.ibm.com/cloud/watson-text-to-speech) acesse o link e crie uma conta gratis para ter acesso a KEY e a URL 

```js
const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: 'YourKey',
  }),
  serviceUrl: 'YourURL',
});
```
### Adicionar Configurações de Banco de Dados
```js
var con = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "password",
  database: "database"
});
```
# Como Executar o Projeto
```bash
npm start
```