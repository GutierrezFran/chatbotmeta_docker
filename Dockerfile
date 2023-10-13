FROM node:18-bullseye

WORKDIR /bot

COPY /chatbotmeta_docker .

RUN cd /bot && npm install

EXPOSE 3000

CMD ["npm", "start"]