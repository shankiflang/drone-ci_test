import fs from "fs";
import axios from "axios";
import chalk from "chalk";
import async from "async";
import FormData from "form-data";
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

const getAdminId = async (access_token) => {
  return axios({
    method: "get",
    url: `${process.env.ADMIN_URL}/users/me`,
    headers: { Authorization: `Bearer ${access_token}` },
  }).then(function (response) {
    return response.data.data.id;
  });
};

const replaceItems = async (token, endpoint) => {
  const formData = new FormData();
  formData.append(
    "file",
    fs.createReadStream(__dirname + `/outputs/${endpoint}-temp.json`)
  );
  formData.append("fileName", `${endpoint}.json`);

  let res = await axios({
    method: "post",
    url: `${process.env.ADMIN_URL}/utils/import/directus_${endpoint}`,
    data: formData,
    headers: {
      "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
      Authorization: `Bearer ${token}`,
    },
  });

  fs.unlinkSync(__dirname + `/outputs/${endpoint}-temp.json`);

  return res;
};

const updateCollections = async () => {
  console.log(
    `${chalk.green("[backup]")} ${chalk.yellow(
      `Mise à jour des données de base du directus...`
    )}`
  );
  try {
    const access_token = process.env.ADMIN_TOKEN || (await login());
    let admin_id = await getAdminId(access_token);

    const backupArray = ["settings", "flows"];

    await async.eachSeries(backupArray, async (endpoint) => {
      let data = fs.readFileSync(__dirname + `/outputs/${endpoint}.json`, {
        encoding: "utf8",
        flag: "r",
      });

      let jsonData = JSON.parse(data);

      nestedProperty.set(jsonData, "+.user_created", admin_id);
      jsonData.map((item) => {
        return nestedProperty.set(item.operations, "+.user_created", admin_id);
      });

      await fs.writeFileSync(
        __dirname + `/outputs/${endpoint}-temp.json`,
        JSON.stringify(jsonData)
      );
      console.log(
        `${chalk.green("[backup]")} ${chalk.yellow(
          `Récupération de ${endpoint}...`
        )}`
      );
      await replaceItems(access_token, endpoint);
    });
  } catch (error) {
    console.log(error);
  }
};

updateCollections();
