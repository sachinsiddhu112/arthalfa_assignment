
# Project Title

Arthalfa_Backend

It's a server-side application developed with 
Expressjs, Mysql with Sequelize ORM.
This application provides various api endpoints to perform CRUD tasks on products.



## Run Locally

Clone the project

```bash
  git clone https://github.com/sachinsiddhu112/arthalfa_assignment
```

Go to the project directory

```bash
  cd arthalfa_assignment
```

Install dependencies

```bash
  npm install
```
```bash
Add environment variables:
DATABASE_NAME ,
USER ,
PASSWORD,
HOST ,
PORT
```
Start the server

```bash
  npm run start or nodemon run start
```


## Documentation

Api endpoints:

base url: https://arthalfa-assignment.onrender.com/api/v1/products

1.To fetch all products:
https://arthalfa-assignment.onrender.com/api/v1/products/getAllProducts
,

For pagination:https://arthalfa-assignment.onrender.com/api/v1/products?page=<page_number>&&limit=<number_of_records_on_singlepage>  

Following queries applied for both above url:
sorted response:  sortBy=<attribute name>,order=<ASC or DESC> ,
search for category or name:
search=<product_name or product_category>         
expample:  
without pagination:https://arthalfa-assignment.onrender.com/api/v1/products/getAllProducts?sortBy=id,category&&order=DESC  

with pagination:                   https://arthalfa-assignment.onrender.com/api/v1/products/getAllProducts?page=1&&limit=3&&sortBy=id,category&&order=DESC 



2.Create Product:https://arthalfa-assignment.onrender.com/api/v1/products/createProduct,   
For creating the new product you have to pass some attributes with correct datatypes:name(string), category(string), price(number).Because these attributes are not null type.

3.Update Product:https://arthalfa-assignment.onrender.com/api/v1/products/updateProductById/<product_id> 
For updating the product you have to provide the correct product id.And you can update any information about product.

4.Delete Product:https://arthalfa-assignment.onrender.com/api/v1/products/deleteProductById/<product_id>
For deleteing the product you should have product id.

5.Get Single Product:https://arthalfa-assignment.onrender.com/api/v1/products/getProductById/<product_id>
With this endpoint you can have a single product with the product id.
## Screenshots

![Postman Image-1](https://i.postimg.cc/jqwTBy0q/Screenshot-2024-10-13-104228.png)

![Postman Image-2](https://i.postimg.cc/027syxyL/Screenshot_2024-10-13_104312.png)

![Postman Image-3](https://i.postimg.cc/XY30ZhZX/Screenshot_2024-10-13_104342.png)


## Deployment

Application is deployed on render.com.  
url:https://arthalfa-assignment.onrender.com/api/v1/getAllProducts

It's a free service so it may have some downtime.So please be patient for initial response.


## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sachin-siddhu-687269248/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/SachinSidd50843)


## Lessons Learned

What did I learn while building this project? What challenges did you face and how did you overcome them?

This was my second project using MySQL, and Sequelize greatly simplified the process. Having worked extensively with MongoDB, I found that Sequelize’s ORM approach allowed me to apply similar CRUD operations and query handling, easing the transition between databases.

Additionally, I used Clever Cloud’s MySQL database for the first time. Setting up a free cloud-based database was straightforward and smooth, which made the integration seamless.

Challenges:  
1.Sequelize with MySQL: Although it was my first time using Sequelize with MySQL, its ORM features made the learning curve manageable and efficient.
2.Deployment Issues: Initially, I attempted to deploy the project on Vercel, but it didn't succeed. I then deployed it on Render.com, which worked smoothly.
