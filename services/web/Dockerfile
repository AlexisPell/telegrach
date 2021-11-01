FROM node:12

ENV PORT 80

WORKDIR /app

COPY package*.json /app/
RUN npm install

COPY . /app

RUN npm run build
EXPOSE 80

CMD ["npm", "run", "dev"]