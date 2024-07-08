FROM node:latest

LABEL version='1.0.0'

COPY . .

RUN npm install

ENV NODE_ENV="development"
ENV MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.8xrka3m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
ENV PORT=80
ENV API_KEY="secret"
ENV ALLOWED_ORIGINS="http://localhost:8080"
ENV MAX_RATELIMIT_PER_MINUTE=100

EXPOSE 80

CMD [ "npm", "run", "prod" ]