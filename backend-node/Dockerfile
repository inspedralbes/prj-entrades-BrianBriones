FROM node:20-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código del proyecto
COPY . .

# Exponer el puerto (configurable por variable de entorno, por defecto 4000)
EXPOSE 4000

# Ejecutar el servidor
CMD ["node", "index.js"]
