FROM directus/directus:9

WORKDIR /directus

COPY npm-requirements.txt ./

RUN cat npm-requirements.txt | xargs npm install