# Simple CRUD
## Описание интерфейса приложения
---
Интерфейс приложения состоит из 4 частей:
- Таблица с данными пользователей
- Блок редактирования и удаления пользователей;
- Блок фильтрации данных
    - Поле `Name`- позволяет фильтровать данные по имени пользователя;
    	- спецсимволы: `_` - один любой символ, `%` - любой символ, любое количество раз;
     - `After Date` - отфильтровать пользователей, созданных ***после*** указанной даты;
   	 - `Before Date` - отфильтровать пользователей, созданных ***до*** указанной даты;
     - `Offset` - вывод пользователей, начиная с указанной позиции;
     - `Limit` - количество выводимых пользователей в таблице;
- Блок добавления нового пользователя;

##### Пример фильтрации вывода по имени:

- `_a%`- вернёт всех пользователей, в имени которых присутсвет буква a на второй позиции (например, "b**a**n" или "m**a**rk");
## RestAPI endpoints
---
- `GET` /users - получение списка всех пользователей (по умолчанию `offset=0` `limit=150`)
	- `GET` /users?
		- offset={int}
		- &limit={int}
		- &filter[afterDate]={DateStr}
		- &filter[beforeDate]={DateStr}
		- &filter[name]={NameStr} - фильтрация списка пользователей

```
{DateStr}='yyyy-MM-dd HH:mm:ss'
{NameStr}='_%[a-z0-9]'
```

- `GET` /users/:id - получение данных пользователя с указанным ID
- `POST` /users - добавление нового пользователя (возвращает id нового пользователя)

Пример:
```
POST /users
{
	'username': 'Vas',
    'first_name': 'Vasya',
    'last_name': 'Pupkin',
    'email': 'vaspup@example.ru',
    'gender': 'Man',
}
```
- `PUT` /users/:id - редактирование данных пользователя с указанным ID

Пример:
```
PUT /users/10
{
	'username': 'Vasvas',
    'first_name': 'Vasya',
    'last_name': 'Pupkin',
    'email': 'vasya@example.ru',
    'gender': 'Polygender',
}
```
- `DELETE` /users/:id - удаление пользователя с указанным ID

## ToDo (что можно исправить, дополнить, убрать)
---
- [ ] Привести в порядок интерфейс
- [ ] Детальнее разобрать роутинг и endpoints RestAPI
- [ ] Перенести frontend и backend части на один HTTP сервер
- [ ] ...
## Запуск приложения:
---
1. Загрузить содержимое репозитория
```sh
$ git clone git@github.com:SnowLe0/simple_users_crud.git
```
2. Развернуть контейнеры Docker
```sh
$ cd docker
$ docker-compose up -d
```
3. Заполнить БД тестовыми данными
```sh
$ docker exec -i mysql mysql -udbuser -pdbpass restapi < FillDB.sql
```
---
RestAPI endpoints будут доступны по адресу [http://localhost:8080/users](http://localhost:8080/users)

React приложение будет доступно по адресу [http://localhost:8888](http://localhost:8888)