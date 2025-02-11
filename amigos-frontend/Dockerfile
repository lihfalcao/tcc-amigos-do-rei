# Etapa de build usando Node.js
FROM node:18 AS builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar apenas as dependências de produção
RUN npm install

# Instalar Angular CLI globalmente
RUN npm install -g @angular/cli

# Copiar o código-fonte
COPY . .

# Gerar a build otimizada para produção
RUN ng build --configuration=production

# Etapa final: usar Nginx para servir os arquivos estáticos
FROM nginx:alpine

# Copiar configuração personalizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar arquivos gerados pelo build Angular para a pasta padrão do Nginx
COPY --from=builder /app/dist/* /usr/share/nginx/html

# Expor a porta 80 para o CapRover reconhecer a aplicação
EXPOSE 80

# Comando padrão do Nginx
CMD ["nginx", "-g", "daemon off;"]
