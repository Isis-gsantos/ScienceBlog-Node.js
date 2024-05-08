<h1 align="center">ScienceBlog with Node.js :seedling:</h1>

![scienceblog-2 0](https://github.com/Isis-gsantos/ScienceBlog-Node.js/assets/142533840/ddddbcb9-ddf0-495e-b60a-9a77abf09711)

O ScienceBlog é uma releitura do projeto original News-Project-React, agora implementado com Node.js e MySQL, utilizando as bibliotecas Express e Sequelize para a gestão do banco de dados e rotas

<b>English Version</b>
ScienceBlog is a reinterpretation of the original News-Project-React, now implemented using Node.js and MySQL, with the Express and Sequelize libraries managing database and routing.

## Funcionalidades :leaves:
- <b>Cadastro e Gerenciamento de Categorias e Artigos:</b> O site permite a criação de categorias e artigos, ambos possuem um relacionamento: um artigo pertence a uma e as categorias podem pertencer a diversos artigos. Ambos possuem uma rota que exibe uma tabela com informações como título e id, dentro dessas tabelas é possível editar e deletar uma categoria ou artigo, permitindo a gestão completa do conteúdo publicado.
Na rota de criação de artigos, é necessário preencher os campos: título, imagem (opcional), texto (feito com tinyMCE) e selecionar uma categoria. Adicionei um campo de imagem que permite com que o usuário faça o uploads de imagens (apenas png e jpeg). As imagens são salvas através do middleware Multer, o qual salva as imagens dentro da aplicação.
- <b>Visualização e Filtro de Artigos:</b> Na página principal, todos os artigos são listados e com o opção de acessar a página única de cada arquivo. Na navbar da página principal é possível filtrar os artigos por categoria, ao clicar vai exibir apenas os artigos pertencentes aquela categoria selecionada. Além disso a interface também inclui paginação para melhor organização.
- <b>Sistema de Login:</b> Os usuários podem se registrar e acessar áreas restritas para postagem de artigos, os quais só poderão ser acessados após o login. As sessões são gerenciadas pelo express-session com um limite de 20 minutos.
- <b>Responsividade:</b> O design do site é agradável e responsivo, garantindo uma boa visualização em diferentes dispositivos.

<b>English Version</b>
## Features :leaves:
- <b>Category and Article Registration and Management:</b> The site allows the creation of categories and articles, both of which are interrelated: an article belongs to one category, and categories can belong to multiple articles. Both have a route that displays a table with information such as title and ID. Within these tables, it is possible to edit and delete a category or an article, allowing for complete management of the published content.
- <b>Article Creation Route:</b> When creating articles, it is necessary to fill out fields for the title, image (optional), text (created with tinyMCE), and select a category. I added an image field that allows users to upload images (only png and jpeg). Images are saved through the Multer middleware, which stores the images within the application.
- <b>Article Viewing and Filtering:</b> On the main page, all articles are listed with the option to access the unique page of each article. In the navbar of the main page, it is possible to filter articles by category, displaying only the articles that belong to the selected category. Additionally, the interface includes pagination for better organization.
- <b>Login System:</b> Users can register and access restricted areas for posting articles, which can only be accessed after logging in. Sessions are managed by express-session with a 20-minute limit.
- <b>Responsiveness:</b> The site's design is pleasant and responsive, ensuring good visibility on different devices.
<br>


![scienceblog-2 0-artigos](https://github.com/Isis-gsantos/ScienceBlog-Node.js/assets/142533840/0d37492a-c7fa-41ed-87c4-63a20ca0f787)
![scienceblog-2 0-artigos-edit](https://github.com/Isis-gsantos/ScienceBlog-Node.js/assets/142533840/89efc57c-42a0-4cd3-a650-e230c88d2387)
![scienceblog-2 0-categorias](https://github.com/Isis-gsantos/ScienceBlog-Node.js/assets/142533840/d37103b6-8553-4049-b7c3-57c66eeabc79)
<br><br>

### Category Filter
![scienceblog-2-filter](https://github.com/Isis-gsantos/ScienceBlog-Node.js/assets/142533840/4ce650ae-be37-47f9-b4d5-53a366c96945)
<br>

### Pagination
![scienceblog-2-pagination](https://github.com/Isis-gsantos/ScienceBlog-Node.js/assets/142533840/c7f7e068-9aa5-486a-9473-7d934282471e)
<br>

### Login
![scienceblog-2-articles](https://github.com/Isis-gsantos/ScienceBlog-Node.js/assets/142533840/f6194050-3999-4449-b97d-1de05d40a161)
![scienceblog-2-articles-login](https://github.com/Isis-gsantos/ScienceBlog-Node.js/assets/142533840/a79d0808-763a-4b9f-8c38-02c38b3b3491)
<br>

### Logout
![scienceblog-2-logout](https://github.com/Isis-gsantos/ScienceBlog-Node.js/assets/142533840/1ee30423-0771-4f1d-98cd-bd13197c7599)



## Tecnologias Utilizadas | Technologies :mushroom:
- <b>Node.js</b>
- <b>Express</b> 
- <b>MySQL</b> 
- <b>Sequelize</b>
- <b>Multer</b> 
- <b>Express-session

## Mobile :iphone:
![scienceblog-2-navbar1](https://github.com/Isis-gsantos/ScienceBlog-Node.js/assets/142533840/5f81ab6d-a07b-4b4b-85ed-f3ae3acc0add)

## Tablet :pager:
![scienceblog-2-tablet](https://github.com/Isis-gsantos/ScienceBlog-Node.js/assets/142533840/c34e9aeb-ebfd-4479-a200-186aeb0aa8a4)

