FROM node:16-alpine as dependencies

# Set HOME path and fix npm red false-positive
ENV HOME=/home/node

# Install depencies
COPY . $HOME/node_docker/
WORKDIR $HOME/node_docker/
RUN yarn

# Build releade
FROM node:14-alpine

# Set HOME path
ENV HOME=/home/node

# Copy node_modules
COPY --from=dependencies /home/node/node_docker/node_modules $HOME/node_modules

# Copy application
COPY --from=dependencies /home/node/node_docker/dist $HOME/dist
COPY --from=dependencies /home/node/node_docker/package.json $HOME
COPY --from=dependencies /home/node/node_docker/yarn.lock $HOME
COPY --from=dependencies /home/node/node_docker/src $HOME/src
COPY --from=dependencies /home/node/node_docker/prisma $HOME/prisma

# Run with node user
RUN chown -R node:node $HOME
USER node
WORKDIR $HOME

CMD yarn dev
