FROM node:20.12.2

WORKDIR /app

COPY package.json package-lock.json ./
COPY tsconfig.json ./
COPY . .

RUN npm i
RUN npm run build

EXPOSE 6001

CMD ["npm", "run", "preview"]