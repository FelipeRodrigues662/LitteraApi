# Usar a imagem oficial do Node.js
FROM node:20

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código para dentro do contêiner
COPY . .

# Expor a porta da aplicação
EXPOSE 3000

# Definir o comando para iniciar a aplicação
CMD ["node", "app.js"]
