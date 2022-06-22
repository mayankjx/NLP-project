FROM node:alpine
WORKDIR /app
COPY package.json ./
RUN npm install
# I was having error when i m copying server folder explicitly
# I copied entire directory and added client folder to dockerignore in order to prevent it from ending 
# up in backend image
COPY . . 
CMD ["npm", "run", "server"]
    