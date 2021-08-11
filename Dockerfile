FROM node:14 as builder

WORKDIR /app

COPY package.json .

RUN npm install -g typescript

RUN npm install

COPY . .

RUN tsc

EXPOSE 3000

VOLUME ["/app"]

CMD ["npm", "run", "api"]
