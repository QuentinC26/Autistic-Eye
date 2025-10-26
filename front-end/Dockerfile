FROM node:latest 
WORKDIR /front-end 
# the * is for copy the files package-lock.json and package.json
COPY package*.json ./ 
RUN npm install 
# Copy the contents of the front-end folder located at the root of the project into the docker folder
COPY . . 
# Makes the server accessible from outside the container on port 5173
EXPOSE 5173
# allows you to run the npm start command automatically
CMD ["npm", "run", "dev"]
