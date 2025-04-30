FROM ubuntu:22.04

# Install Node.js, npm, Python, and build tools
RUN apt-get update && \
    apt-get install -y curl python3 make g++ bash && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean

# Set up app directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy remaining app files
COPY . .

EXPOSE 4444

CMD ["npm", "start"]
