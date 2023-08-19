FROM node:18
WORKDIR /app
COPY package.json .
RUN npm install

COPY . ./
CMD [ "ts-node", "--transpile-only", "src/server.ts" ]
