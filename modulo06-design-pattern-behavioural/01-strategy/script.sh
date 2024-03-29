docker run \
    --name postgres \
    -e POSTGRES_USER=alessandro \
    -e POSTGRES_PASSWORD="secret" \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres

docker logs postgres
docker exec -it postgres psql --username alessandro --dbname heroes
CREATE TABLE warriors(
    id serial PRIMARY KEY,
    name VARCHAR (255) NOT NULL);
SELECT * FROM warriors;

#mongodb

docker run \
    --name mongodb \
    -e MONGO_INITDB_ROOT_USERNAME=alessandro \
    -e MONGO_INITDB_ROOT_PASSWORD=senha \
    -p 27017:27017 \
    -d \
    mongo:4

docker logs mongodb