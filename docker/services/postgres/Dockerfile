FROM postgres:17.5

RUN  dpkg-reconfigure tzdata -u

RUN rm /etc/localtime; \
  ln -s /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime

COPY ./docker-entrypoint-initdb.d/init-user-db.sh /docker-entrypoint-initdb.d/init-user-db.sh