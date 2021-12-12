FROM  node:16.13.0-alpine3.14 as Base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM Base AS Release
COPY --from=Base /app/dist ./node_modules
CMD npm run start
