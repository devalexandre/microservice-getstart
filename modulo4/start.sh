#!/bin/bash

service="${SERVICE}.js"

sleep 20s # espera 20 segundos apos o container kafka ter estartado

if [ $NODE_ENV = "production" ]
then
  node $service
else
   npx nodemon $service
fi


