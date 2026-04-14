#  FastGoal Tickets

##  Nom dels integrants
* **Bryan Briones**

---

##  Nom del projecte
**FastGoal Tickets**

---

##  Petita descripció
**FastGoal Tickets** és una plataforma web completa per a la consulta de partits de futbol i la reserva d'entrades en línia. El projecte es basa en una arquitectura de microserveis containeritzada:
* **Frontend:** Desenvolupat amb **Nuxt 3** i **Tailwind CSS** per a una experiència d'usuari ràpida i reactiva.
* **Backend:** Una API robusta amb **Laravel 11** que gestiona la lògica de negoci, les reserves i la persistència de dades.
* **Infraestructura:** Desplegament automatitzat mitjançant **Docker** i **Nginx**, utilitzant HTTPS per a una comunicació segura.

El sistema inclou integració amb **Google OAuth** per a l'accés d'usuaris, sincronització amb **APIs externes** de futbol i enviament de confirmacions automàtiques per correu electrònic mitjançant **Resend**.

---

##  Gestor de tasques
* **URL:** [Afegeix aquí l'enllaç a Taiga/Jira/Trello]

---

##  Prototip gràfic
* **URL:** [https://stitch.withgoogle.com/projects/15074294765302717815]

---

##  URL de producció
* **URL:** [https://fastgoal-tickets.daw.inspedralbes.cat](https://fastgoal-tickets.daw.inspedralbes.cat)

---

##  Estat
**Estat:  En fase de desplegament final i correcció de funcionalitats.**

Actualment, el projecte ha superat les següents fites:
*  **Infraestructura:** Servidor configurat amb Docker, Nginx i certificats SSL.
*  **Autenticació:** Sistema de Login amb Google completament funcional en producció.
*  **Base de dades:** Persistència de dades amb SQLite configurada correctament mitjançant volums de Docker.
*  **Funcionalitats en ajust:** * El flux de reserva d'entrades està integrat, pendent de polir la resposta del servidor (CORS/Mailing).
    * La sincronització de partits des de l'API externa s'està ajustant per mostrar dades en temps real en l'entorn de producció.

---

###  Tecnologies i Serveis
* **Nuxt 3** (Frontend Framework)
* **Laravel 11** (Backend API)
* **Docker & Docker Compose** (Containerització)
* **Nginx** (Reverse Proxy)
* **Google Cloud Console** (OAuth 2.0)
* **Resend** (Servei de Mailing)
