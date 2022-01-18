# IPRWC

This repository contains the code used for IPRWC "Programming in a Web Context".

It's using the PEAN (is that a thing?) stack.

## Backend

- Node.js
- Express
- Prisma
- Postgres

## Frontend

- Angular
- Tailwind

## Delivery

The [application provides docker containers](https://github.com/WesleyKlop?tab=packages&repo_name=iprwc) for both frontend and backend, and contains a kustomization.yaml to be consumed by for example flux. These kubernetes manifests can be found in the [manifests](manifests/) folder. (currently tightly coupled to my own environment)

## Security

I have configured Traefik middleware that adds security headers to all responses. You can see that configuration [here](manifests/31-middleware.yml).
