import fs from "fs";
import axios from "axios";
import chalk from "chalk";
import async from "async";
import nestedProperty from "nested-property";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const login = async () => {
  return axios({
    method: "post",
    url: `${process.env.ADMIN_URL}/auth/login`,
    data: {
      email: "admin@example.com",
      password: "admin",
    },
  }).then(function (response) {
    return response.data.data.access_token;
  });
};

const getJson = async (token, endpoint) => {
  return axios({
    method: "get",
    url: `${process.env.ADMIN_URL}/${endpoint}`,
    headers: { Authorization: `Bearer ${token}` },
  }).then(function (response) {
    let data = !response.data.data.length
      ? [response.data.data]
      : response.data.data;

    nestedProperty.set(data, "+.user_created", null);

    if (endpoint === "flows") {
      return axios({
        method: "get",
        url: `${process.env.ADMIN_URL}/operations`,
        headers: { Authorization: `Bearer ${token}` },
      }).then(function (res) {
        let operations = res.data.data;

        let newFlows = data.map((flow) => {
          let newOperations = operations.filter(
            (operation) => operation.flow === flow.id
          );
          flow.operations = newOperations;

          nestedProperty.set(flow.operations, "+.user_created", null);
          return flow;
        });

        fs.writeFileSync(
          __dirname + `/outputs/${endpoint}.json`,
          JSON.stringify(newFlows)
        );
      });
    } else {
      return fs.writeFile(
        __dirname + `/outputs/${endpoint}.json`,
        JSON.stringify(data),
        (err) => {
          if (err) throw err;
        }
      );
    }
  });
};

const backupEssentials = async () => {
  console.log(`${chalk.green("[backup]")} ${chalk.yellow(`Connexion...`)}`);
  const access_token = process.env.ADMIN_TOKEN || (await login());

  console.log(
    `${chalk.green("[backup]")} ${chalk.yellow(
      `Récupération des options essentielles de la plateforme...`
    )}`
  );
  const backupArray = ["settings", "flows"];
  await async.eachSeries(backupArray, async (endpoint) => {
    console.log(
      `${chalk.green("[backup]")} ${chalk.yellow(
        `Récupération de ${endpoint}...`
      )}`
    );
    await getJson(access_token, endpoint);
  });
};

backupEssentials();
