FROM directus/directus:9

WORKDIR /directus

COPY npm-requirements.txt ./
COPY snapshot.yaml /snapshot/snapshot.yaml

RUN cat npm-requirements.txt | xargs npm install