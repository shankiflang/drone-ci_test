FROM directus/directus:9.14.5

WORKDIR /directus

COPY npm-requirements.txt ./

RUN cat npm-requirements.txt | xargs npm install