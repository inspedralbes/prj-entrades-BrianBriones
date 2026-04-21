FROM node:20-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código del proyecto
COPY . .

# Construir la aplicación Nuxt en modo producción (SSR)
RUN npm run build

# Variables de entorno para asegurar que escuche en todas las interfaces y en el puerto correcto
ENV HOST=0.0.0.0
ENV PORT=3000

# Exponer el puerto
EXPOSE 3000

# Ejecutar el servidor Nuxt
CMD ["node", ".output/server/index.mjs"]
