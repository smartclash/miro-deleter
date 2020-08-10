FROM node:14-alpine

ENV NODE_ENV=production

WORKDIR /discord

COPY . .

RUN npm install
RUN npm run build

CMD [ "node", "." ]
