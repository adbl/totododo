FROM ubuntu:12.04

ADD https://deb.nodesource.com/setup /
RUN bash setup && \
    apt-get update && \
    apt-get -y install nodejs && \
    npm install -g npm@2.1.10 && \
    apt-get -y install python-pip && \
    pip install --upgrade pip==1.5.6 && \
    `which pip` install Flask==0.10.1 && \
    `which pip` install python-dateutil==2.3
ADD . /opt/totododo
WORKDIR /opt/totododo
# TODO should use gulp or something
RUN npm install && \
    npm run build && \
    ln -s bundle.min.js totododo/static/bundle.js
VOLUME ["/opt/totododo"]
VOLUME ["/mnt/totododo-data"]
ENTRYPOINT ["python", "server.py"]