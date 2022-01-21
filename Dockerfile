FROM node:14-alpine AS dist
COPY web/ /web
WORKDIR /web
RUN yarn add @vue/cli
RUN yarn build

FROM golang:1.17-bullseye AS builder
RUN apt-get update && apt-get install -y libpcap-dev
COPY . /src
COPY --from=dist /web/dist /src/web/dist
WORKDIR /src
RUN go build cmd/pkappa2/main.go

FROM debian:bullseye
RUN apt-get update && apt-get install -y libpcap0.8 && rm -rf /var/lib/apt/lists/*
COPY --from=builder /src /app
VOLUME /data
EXPOSE 8080
CMD /app/main -base_dir /data -address :8080
