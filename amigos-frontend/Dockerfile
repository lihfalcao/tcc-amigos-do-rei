# Usar a imagem oficial do Node.js como base
FROM node:18 AS build

# Definir o diretório de trabalho
WORKDIR /app

# Copiar o package.json e o package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Instalar Angular CLI globalmente
RUN npm install -g @angular/cli

# Copiar o restante do código-fonte
COPY . .

# Construir o aplicativo Angular
RUN ng build --configuration production

# Usar a imagem oficial do Nginx
FROM nginx:alpine

# Copiar os arquivos da build para o diretório do Nginx
# Ajuste o caminho conforme necessário
COPY --from=build /app/dist/amigos-frontend/browser /usr/share/nginx/html

# Copiar o arquivo de configuração do Nginx
COPY .docker/default.conf /etc/nginx/conf.d/default.conf

# Expor a porta padrão do Nginx
EXPOSE 80
