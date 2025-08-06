import 'dotenv/config';

export default {
  expo: {
    name: "app-tasks",
    slug: "app-tasks",
    extra: {
      API_URL: process.env.API_URL,
    }
  }
};