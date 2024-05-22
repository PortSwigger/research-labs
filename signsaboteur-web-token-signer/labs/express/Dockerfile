FROM node:lts AS express

# Set the working directory in the container
WORKDIR /code

# Copy package.json and package-lock.json (if available)
COPY package.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle app source inside the Docker image
COPY . .

# Your app binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 8000

# Define the command to run your app using CMD which defines your runtime
CMD ["node", "index.js"]