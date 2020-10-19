
## Descripcion
 Backend para desafio tecnico de Ripley
## Instalacion

```bash
$ npm install
```

## Levantar la API mediante localhost


##### *** Deben tener la base de datos postgres corriendo bajo el puerto que definan en el archivo .env


```bash
# Para levantar 
$ npm run start:dev

# Debe llamarse al siguiente servicio para poblar la base de datos, esto llena los tipos de transacciones para poder utilizar 
los servicios de transacciones
$ localhost:3000/transaction-types/populate
```

## Levantar la API mediante Docker

```bash
# Debe ejecutarse el siguiente comando para lenvatar back y db mediante docker
$ docker-compose up

# Debe llamarse al siguiente servicio para poblar la base de datos, esto llena los tipos de transacciones para poder utilizar 
los servicios de transacciones
$ localhost:3000/transaction-types/populate

```

## License

  Nest is [MIT licensed](LICENSE).
