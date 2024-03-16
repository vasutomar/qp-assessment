FROM node:latest
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY . ./
EXPOSE 3001
CMD ["npm", "run", "dev"]