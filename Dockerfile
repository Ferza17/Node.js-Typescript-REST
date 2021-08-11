FROM node:14 as builder

WORKDIR /app

COPY package.json .

RUN npm install -g typescript

RUN npm install

COPY . .

RUN tsc

EXPOSE 8080

CMD ["npm", "run", "api"]
