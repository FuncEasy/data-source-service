#!/bin/bash

kubectl create secret generic data-source-access \
-n funceasy \
--from-file=data_source.public.key \
--from-file=data_source.token