FROM node:16-alpine
COPY app /app
RUN cd app && yarn install
WORKDIR /app
CMD ["node", "src/index.js"]