FROM php:7-alpine
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer \
&& docker-php-ext-install pdo_mysql