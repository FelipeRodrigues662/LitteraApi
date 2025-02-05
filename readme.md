    docker network create REDE1
    
    docker volume create VOL1
    
    docker run -d --name MARIADB -v VOL1:/var/lib/mysql -h db --network Banco --env MARIADB_USER=admin --env MARIADB_PASSWORD=admin --env MARIADB_ROOT_PASSWORD=admin mariadb:latest

    docker run -d --name MYADMIN -h myadmin --network Banco -e PMA_HOST=db -p 8080:80 phpmyadmin/phpmyadmin

    npm install express jsonwebtoken dotenv cors swagger-ui-express swagger-jsdoc bcryptjs sequelize mariadb firebase-admin