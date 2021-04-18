FROM alephp/microservice-nano

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --silent

COPY . .

ENV NODE_ENV=develop