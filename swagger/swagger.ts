import swaggerAutogen from "swagger-autogen";
import path from "path";

const doc = {
  info: {
    title: "API 문서",
    description: "API 문서입니다",
  },
  servers: [
    {
      url: "https://5th-study-forest-team3-pvs89drgd-min-jiyeongs-projects.vercel.app/",
    },
  ],
  schemas: ["http"],
  securityDefinitions: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      in: "header",
      bearerFormat: "JWT",
    },
  },
};
const outputFile = path.join(__dirname, "../swagger.json");
const endpointsFiles = [path.join(__dirname, "../routes/*.ts")];

swaggerAutogen(outputFile, endpointsFiles, doc);
