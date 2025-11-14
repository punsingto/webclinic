FROM golang:1.20-alpine AS build
WORKDIR /src
COPY go.mod .
COPY . .
RUN go build -o /bin/server main.go

FROM alpine:3.18
COPY --from=build /bin/server /bin/server
EXPOSE 8080
ENTRYPOINT ["/bin/server"]
