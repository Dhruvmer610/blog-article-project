-download zip
-unzip downloaded zip and insert this command
-npm i 
-create .env file and add this 
    -DB_CONNECT_STRING=mongodb://localhost:27017/<databaseName> or your database url,
    -SECRET_KEY=token_secret,
    -PORT=3000
open post man and import postman collection that I given in project
userbaseurl = localhost:3000/users/
  -register = localhost:3000/users/register
              req.body==> {
                    "name":"John",
                    "email":"John@gmail.com",
                    "password":"1234",
                    "mobileNumber":"7575854785"
                    }
  -login = localhost:3000/users/login
              req.body==> {
                  "email":"John@gmail.com",
                  "password":"1234"
                }
  -updateUser = localhost:3000/users/update
              headder = logintoken: enater user login token
              req.body==> {
                     "name":"MD",
                     "email":"dhruv@gmail.com",
                     "mobileNumber":"8965874875"
                }
  -deleteUser = localhost:3000/users/delete
                headder = logintoken: enater user login token
  
articlebaseurl = localhost:3000/category/
 -addCategory = localhost:3000/category/addCategory
                 req.body==> {
                  "category":"Position"
                }
-deleteCategory =  localhost:3000/category/deleteCategory/<categoryId>


articlebaseurl = localhost:3000/article/
    -addArticle  = localhost:3000/article/addArticle
                headder = logintoken: enater user login token
                req.body==> {
                  "articleTitle": "2st Education",
                  "description": "There are various benefits of having education such as having a good career, having a good status in society, and having self-confidence. First of all, education gives us the chance of having a good career in our life.",
                  "slug": "Education ",
                  "category": "Education,",
                  "categoryId": "665dc2c10f0e869b963b4c90"
                }
  -updateArtivle  = localhost:3000/article/updateArtivle/665ea40d389091afd42ec6f2 --->articleId
                headder = logintoken: enater user login token
                req.body==> {
                  "articleTitle": "food",
                  "description": "having self-confidence. First of all, education gives us the chance of having a good career in our life.",
                  "slug": "food",
                  "category": "food",
                  "categoryId": "855dc2c10f0e869b963b4c90"
                }
 -deleteArticle  = localhost:3000/article/deleteArticle/665ea40d389091afd42ec6f2 --->articleId
                headder = logintoken: "enater user login token"

 -viewArticle  = localhost:3000/article/viewArticle
                headder = logintoken: "enater user login token"
                
 -searchAndSortingArticle = localhost:3000/article/searchAndSorting
                Query Params = search: "search from articleTitle,category,description"