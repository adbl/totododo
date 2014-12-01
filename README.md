# totododo

## Building

`make`

Requirements:
- Docker 1.2 (+compatible kernel)
- sqlite3 (to generate sqlite db)


## Running

`docker run -p 80:5000 -v ${PWD}/db:/mnt/totododo-data totododo`


## Development

```
docker run -p 80:5000 -v ${PWD}/db:/mnt/totododo-data \
    -v ${PWD}:/opt/totododo totododo
```
