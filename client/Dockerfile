# Stage 1
FROM node:12.20.0-alpine as node
COPY . /app
WORKDIR /app
RUN npm install
RUN npm install -g @angular/cli
COPY . .
RUN npm run build --prod

# Stage 2

EXPOSE 4200
CMD ng serve --prod --host 0.0.0.0  
