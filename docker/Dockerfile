FROM sshow/passenger-nodejs-6:latest

# Set correct environment variables.
ENV HOME /root
ENV SRC_REPO https://github.com/stigok/dotcom --branch develop

# Use baseimage-docker's init process.
CMD ["/sbin/my_init"]

# ...put your own build instructions here...
RUN rm -f /etc/service/nginx/down
RUN rm /etc/nginx/sites-enabled/default
ADD passenger-node-app.conf /etc/nginx/sites-enabled/passenger-node-app.conf

# Build and install web app
WORKDIR /home/app
RUN git clone $SRC_REPO passenger-node-app
WORKDIR passenger-node-app
RUN chown app:app --recursive .

# Don't run with --production arg. A postinstall script for npm runs grunt build
RUN sudo -u app -H npm install

# Clean up APT when done.
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
