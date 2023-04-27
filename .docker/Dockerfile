FROM nikolaik/python-nodejs

RUN mkdir /app
WORKDIR /app

COPY . /app

RUN yarn
RUN yarn run build

ENTRYPOINT yarn run serve --port 80 --host 0.0.0.0