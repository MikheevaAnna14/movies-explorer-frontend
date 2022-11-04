# movies-explorer-frontend


Фронтенд дипломного проекта Яндекс Практикум.     
Сервис для поиска фильмов по запросу и сохранения их в личном кабинете. Доступ к сервису получают только авторизованные пользователи.

## Функционал
Сначала пользователь попадает на страницу с описанием проекта. Если пользователь на сайте впервые, он регистрируется в личном кабинете. Уже зарегистрированные пользователи должны пройти авторизацию для входа.

### Регистрация и авторизация 
- для регистрации пользователь заполняет форму, где указывают имя, адрес электронной почты и пароль. 
- зарегистрированные пользователи заходят на сайт по электронной почте и паролю. 
- вводимые данные валидируются, и если пользователь некорректно заполнил какие-нибудь поля, он видит сообщение об ошибке. 
- в случае успешной регистрации/авторизации пользователь получает доступ к личному кабинету и переходит на страницу поиска фильмов.
- если при проверке данных на сервере происходит ошибка, пользователь получает сообщение об ошибке.

### Личный кабинет
- в личном кабинете пользователь может редактировать личные данные. 
- при успешном сохранения новых данных пользователь получает сообщение об этом, если произошла ошибка - сообщение об ошибке.
- после выхода из личного кабинета пользователь будет перенаправлен на страницу с описанием проекта. 
-  неавторизованные пользователи не могут пользоваться сервисом поиска фильмов.

### Поиск фильмов   
- поиск фильмов осуществляется по названию на русском или английском языках.
- можно осуществлять поиск полнометражных и короткометражных фильмов.
- если будет найдено большое количество фильмов, то на странице отобразится только часть фильмов, и под ними появится кнопка "Ещё", при клике на которую отображается еще несколько фильмов. Кнопка исчезнет, когда все фильмы будут отображены.
- при клике по картинке на карточке с фильмом происходит переход на страничку с трейлером к фильму.
- при клике на кнопку лайка на карточке, фильм добавляется в "Сохранённые", при этом кнопка меняет цвет.
- при повторном клике на кнопку лайка фильм будет удален из списка сохранённых.



### Сохранённые фильмы      
- все сохраненные фильмы отображаются на странице "Сохранённые фильмы".
- можно осуществлять поиск по названию на русском или английском языках.
- можно осуществлять поиск полнометражных и  короткометражных фильмов.
- фильм удаляется из сохранённых при клике на крестик на карточке с фильмом.

## Используемые технологии: 
- HTML,
- CSS,
- JavaScript,
- React.js.


Сайт размещен по адресу: https://annamikheeva.movies.nomoredomains.xyz.     
Репозиторий api части проекта: https://github.com/MikheevaAnna14/movies-explorer-api.
