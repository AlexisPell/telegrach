Hello world!!!

This is my own try-out for microservices.

;TLDR;

- Run project:
  - docker-compose up --build

What is inside:

1. Structure:

- Services/
  - web
  - proxy
  - users
  - chats
- docker-compose.yml

2. How setted up:

- Running fully in dockers, using docker-compose
- Web is sitting on port 3000 behing nginx proxy on http port
- Proxy for backend is in services/proxy-server and running on :8080
- Services are running proxied on 5000(users), 5001(chats) and so on...
- Single DB(mongo) / Multiple services approach
- Redis for sessions

3. Frameworks:

- Web - Next.js, Nginx, tailwindcss, mui
- Proxy - Express, http-proxy
- Users - Nest.js, MongoDB, Redis
- Chats - Express, MongoDB

4. Purposes?

- A hands-on free time self written from scratch coding project
