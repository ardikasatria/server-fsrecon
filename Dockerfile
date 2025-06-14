# Gunakan base image Node.js sesuai versi di package.json
FROM node:18

# Atur direktori kerja
WORKDIR /usr/src/app

# Salin file package.json dan package-lock.json (jika ada)
COPY package*.json ./

# Install dependencies (termasuk devDependencies untuk build)
RUN npm install

# Salin seluruh isi project ke dalam container
COPY . .

# Build ke folder `build`
RUN npm run build

# Set environment variable default (bisa diubah saat docker run)
ENV NODE_ENV=production
ENV NODE_PROCESSES=max

# Expose port
EXPOSE 3002

# Jalankan app dengan PM2
CMD ["npm", "start"]
