FROM php:8.2-cli

# Instalar dependencias del sistema y la extensión pdo_sqlite
RUN apt-get update && apt-get install -y \
    libsqlite3-dev \
    unzip \
    && docker-php-ext-install pdo pdo_sqlite

# Copiar Composer desde la imagen oficial
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copiar el código del proyecto
COPY . .

# Instalar las dependencias de Laravel
RUN composer install --no-dev --optimize-autoloader

# Crear la estructura de la base de datos y dar permisos a la carpeta database/
# Esto asegura que SQLite y Laravel puedan leer/escribir en el archivo
RUN mkdir -p database && \
    touch database/database.sqlite && \
    chmod -R 777 database

# Exponer el puerto
EXPOSE 8000

# Comando para iniciar la aplicación
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
