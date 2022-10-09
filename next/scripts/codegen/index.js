const fs = require("fs");
const axios = require("axios");
const chalk = require("chalk");
const async = require("async");
const { randomUUID } = require("crypto");

require("dotenv").config();

const write = (destination, buffers, cb) => {
  fs.writeFile(destination, Buffer.concat(buffers), cb);
};

const read = (files, cb) => {
  async.mapSeries(files, readFile, cb);
};

const readFile = (file, cb) => {
  fs.readFile(file, cb);
};

const concat = (files, destination, cb) => {
  async.waterfall(
    [async.apply(read, files), async.apply(write, destination)],
    cb
  );
};

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

const login = async () => {
  return axios({
    method: "post",
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
    data: {
      email: "admin@example.com",
      password: "admin",
    },
  }).then(function (response) {
    return response.data.data.access_token;
  });
};

const getSystemSchema = async (token) => {
  return axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/server/specs/graphql/system`,
    responseType: "stream",
    headers: { Authorization: `Bearer ${token}` },
  }).then(function (response) {
    response.data.pipe(
      fs.createWriteStream(__dirname + "/outputs/system.graphql")
    );
  });
};

const getItemsSchema = async (token) => {
  return axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/server/specs/graphql`,
    responseType: "stream",
    headers: { Authorization: `Bearer ${token}` },
  }).then(function (response) {
    response.data.pipe(
      fs.createWriteStream(__dirname + "/outputs/items.graphql")
    );
  });
};

const generateFiles = async () => {
  const access_token = process.env.ADMIN_TOKEN || (await login());

  await getSystemSchema(access_token);
  await getItemsSchema(access_token);

  console.log(
    `${chalk.green("[codegen]")} ${chalk.yellow(`sources downloaded`)}`
  );

  await concat(
    [
      __dirname + "/outputs/system.graphql",
      __dirname + "/outputs/items.graphql",
    ],
    "./src/graphql/sources/directus.graphql",
    () => {
      // generate schemas
      // get all collections in items.graphql
      fs.readFile(
        __dirname + "/outputs/items.graphql",
        { encoding: "utf8", flag: "r" },
        async (err, data) => {
          // scan existing collections
          let startIndex = data.indexOf("type Query {");
          let endIndex = data.indexOf("}", startIndex);
          let researchCollectionsString = data.substring(startIndex, endIndex);
          let imports = [];
          let schemas = [];

          let collections = [];

          // research for collections
          await asyncForEach(
            researchCollectionsString.split("  "),
            async (item, index) => {
              let curr = item.split("(");
              if (index % 3 === 1) {
                collections.push(curr[0]);
              }
            }
          );

          console.log(
            `${chalk.green("[codegen]")} ${chalk.red(
              `${collections.length} collections found`
            )}`
          );

          const fields = [];
          // research for fields of each collection
          collections.forEach((collection, index) => {
            let startIndexCollection = data.indexOf(`type ${collection} {`);
            let endIndexCollection = data.indexOf(`}`, startIndexCollection);
            let researchFieldsString = data.substring(
              startIndexCollection,
              endIndexCollection
            );

            fields.push({
              collection,
              fields: [],
            });

            researchFieldsString.split("  ").forEach((item) => {
              if (item.includes("type")) {
                return;
              } else if (item.includes("_func")) {
                return;
              } else if (item.includes("(filter:")) {
                let curr = item.split("(filter:");
                fields[index].fields.push(
                  curr[0] +
                    ` { id${
                      item.includes("directus_files_filter")
                        ? " modified_on type title storage filename_download uploaded_on"
                        : ""
                    }${
                      item.includes("directus_users_filter")
                        ? " email provider status"
                        : ""
                    } } `
                );
              } else {
                fields[index].fields.push(item.split(":")[0]);
              }
            });
          });

          // delete old schemas
          fs.readdir("./src/graphql/schemas/", async (err, files) => {
            if (files) {
              await asyncForEach(files, (file) => {
                if (file.includes(".tsx")) {
                  fs.unlink(`./src/graphql/schemas/${file}`, (err) => {
                    if (err) throw err;
                  });
                }
              });
            }

            // create schema for each collection
            await asyncForEach(fields, (fieldCollection) => {
              fs.writeFile(
                `./src/graphql/schemas/${fieldCollection.collection}.tsx`,
                `const ${
                  fieldCollection.collection
                }Schema = "${fieldCollection.fields.join(
                  ",",
                  " "
                )}";\nexport default ${fieldCollection.collection}Schema;`,
                (err) => {
                  if (err) {
                    return err;
                  }

                  console.log(
                    `${chalk.green("[codegen]")} ${chalk.green(
                      `${fieldCollection.collection} schema created`
                    )}`
                  );
                }
              );
            });

            imports = fields.map(
              (fieldCollection) =>
                `import ${fieldCollection.collection}Schema from "./${fieldCollection.collection}"`
            );
            schemas = fields.map(
              (fieldCollection) =>
                `   { name: "${fieldCollection.collection}", schema: ${fieldCollection.collection}Schema }`
            );

            fs.readFile(
              __dirname + "/outputs/system.graphql",
              { encoding: "utf8", flag: "r" },
              async (err, data) => {
                // scan existing collections
                let startIndex = data.indexOf("type Query {");
                let endIndex = data.indexOf("}", startIndex);
                let researchCollectionsString = data.substring(
                  startIndex,
                  endIndex
                );
                let collections = [];

                // research for collections
                await asyncForEach(
                  researchCollectionsString.split("  "),
                  async (item, index) => {
                    let curr = item.split("(");
                    if (
                      !curr[0].includes("_") &&
                      !curr[0].includes(":") &&
                      index > 0
                    ) {
                      collections.push(curr[0]);
                    }
                  }
                );

                console.log(
                  `${chalk.green("[codegen]")} ${chalk.red(
                    `${collections.length} system collections found`
                  )}`
                );

                const fields = [];
                // research for fields of each collection
                collections.forEach((collection, index) => {
                  let startIndexCollection = data.indexOf(
                    `type directus_${collection} {`
                  );
                  let endIndexCollection = data.indexOf(
                    `}`,
                    startIndexCollection
                  );
                  let researchFieldsString = data.substring(
                    startIndexCollection,
                    endIndexCollection
                  );

                  fields.push({
                    collection,
                    fields: [],
                  });

                  researchFieldsString.split("  ").forEach((item) => {
                    if (item.includes("type")) {
                      return;
                    } else if (item.includes("_func")) {
                      return;
                    } else if (item.includes('"""')) {
                      return;
                    } else if (item.includes("(filter:")) {
                      let curr = item.split("(filter:");
                      fields[index].fields.push(
                        curr[0] +
                          ` { id${
                            item.includes("directus_files_filter")
                              ? " modified_on type title storage filename_download uploaded_on"
                              : ""
                          }${
                            item.includes("directus_users_filter")
                              ? " email provider status"
                              : ""
                          } } `
                      );
                    } else {
                      fields[index].fields.push(item.split(":")[0]);
                    }
                  });
                });

                // create schema for each collection
                fields.forEach((fieldCollection) => {
                  fs.writeFile(
                    `./src/graphql/schemas/${fieldCollection.collection}.tsx`,
                    `const ${
                      fieldCollection.collection
                    }Schema = "${fieldCollection.fields.join(
                      ",",
                      " "
                    )}";\nexport default ${fieldCollection.collection}Schema;`,
                    (err) => {
                      if (err) {
                        return err;
                      }

                      console.log(
                        `${chalk.green("[codegen]")} ${chalk.green(
                          `${fieldCollection.collection} schema created`
                        )}`
                      );
                    }
                  );
                });

                imports.push(
                  ...fields.map(
                    (fieldCollection) =>
                      `import ${fieldCollection.collection}Schema from "./${fieldCollection.collection}"`
                  )
                );
                schemas.push(
                  ...fields.map(
                    (fieldCollection) =>
                      `   { name: "directus_${fieldCollection.collection}", schema: ${fieldCollection.collection}Schema }`
                  )
                );

                // create index schema for exports
                fs.writeFile(
                  `./src/graphql/schemas/index.tsx`,
                  `${imports.join(
                    "\n"
                  )}\n\nconst exports: { name: string, schema: string }[] = [\n${schemas.join(
                    ",\n"
                  )}\n];\n\nexport default exports;`,
                  (err) => {
                    if (err) {
                      return err;
                    }

                    console.log(
                      `${chalk.green("[codegen]")} ${chalk.greenBright(
                        `index schema created`
                      )}`
                    );
                  }
                );
              }
            );
          });
        }
      );
    }
  );
};

generateFiles();
