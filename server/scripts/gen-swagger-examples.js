import fs from "fs";
import YAML from "yaml";
import { faker } from "@faker-js/faker";


const SWAGGER_PATH = "docs/swagger.yaml";


function genLoginExample() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password({ length: 10 }),
  };
}

function genRegisterExample() {
  return {
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 10 }),
  };
}

function genReviewExample() {
  return {
    comment: faker.lorem.paragraph(),
    rating: Number(faker.number.float({ min: 1, max: 5, fractionDigits: 1 })),
  };
}




const raw = fs.readFileSync(SWAGGER_PATH, "utf-8");
const doc = YAML.parse(raw);


const loginContent = doc?.paths?.["/login"]?.post?.requestBody?.content?.["application/json"];
if (!loginContent) {
  console.error("Не найден /login POST requestBody content application/json — проверь swagger.yaml");
  process.exit(1);
}


loginContent.example = genLoginExample();


fs.writeFileSync(SWAGGER_PATH, YAML.stringify(doc), "utf-8");


console.log("Готово! Example для POST /login записан в", SWAGGER_PATH);

function genOfferExample() {
  return {
    title: faker.lorem.words(3),
    description: faker.lorem.paragraph(),
    publishDate: faker.date.recent().toISOString().slice(0, 10),
    city: faker.location.city(),
    isPremium: faker.datatype.boolean(),
    isFavorite: faker.datatype.boolean(),
    rating: Number(faker.number.float({ min: 1, max: 5, fractionDigits: 1 })),
    type: faker.helpers.arrayElement(["apartment", "house", "room", "hotel"]),
    rooms: faker.number.int({ min: 1, max: 5 }),
    guests: faker.number.int({ min: 1, max: 8 }),
    price: faker.number.int({ min: 50, max: 500 }),
    features: JSON.stringify(['Breakfast', 'Air conditioning', 'Laptop friendly workspace', 'Baby seat', 'Washer', 'Towels', 'Fridge'
]),
    commentsCount: faker.number.int({ min: 0, max: 50 }),
    latitude: Number(faker.location.latitude()),
    longitude: Number(faker.location.longitude())
  };
}

const offerContent = doc?.paths?.["/offers"]?.post?.requestBody?.content?.["multipart/form-data"]?.schema;

if (offerContent?.properties) {
  const example = genOfferExample();

  for (const key in example) {
    if (offerContent.properties[key]) {
      offerContent.properties[key].example = example[key];
    }
  }

  console.log("Example для POST /offers");
} else {
  console.error("Не найден /offers POST requestBody content multipart/form-data schema");
}

const registerContent = doc?.paths?.["/register"]?.post?.requestBody?.content?.["multipart/form-data"]?.schema;

if (registerContent?.properties) {
  const example = genRegisterExample();

  for (const key in example) {
    if (registerContent.properties[key]) {
      registerContent.properties[key].example = example[key];
    }
  }

  console.log("Example для POST /register");
} else {
  console.error("Не найден /register POST requestBody content multipart/form-data schema");
}

const reviewContent = doc?.paths?.["/reviews/{offerId}"]?.post?.requestBody?.content?.["application/json"];

if (reviewContent?.schema?.properties) {
  const example = genReviewExample();

  for (const key in example) {
    if (reviewContent.schema.properties[key]) {
      reviewContent.schema.properties[key].example = example[key];
    }
  }

  console.log("Example для POST /reviews/{offerId}");
} else {
  console.error("Не найден /reviews/{offerId} POST requestBody content application/json schema");
}

fs.writeFileSync(SWAGGER_PATH, YAML.stringify(doc), "utf-8");
console.log("\nГотово! Все примеры записаны в", SWAGGER_PATH);
