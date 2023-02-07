import { faker } from "@faker-js/faker";
import bcryptjs from "bcryptjs";
import user from "../models/users.js";
const seedUsers = async () => {
    const existingUsers = await user.find({});
    const existingAdminUsers = await user.findOne({email:"chapter247@gmail.com"})
    if(!existingAdminUsers){
      const admin = await user.create({
        email:"chapter247@gmail.com",
        firstName: "chapter",
          lastName: "247",
          password: bcryptjs.hashSync("123456", 10), 
  
      })
      console.log("created admin details :", admin)
    }
    if (existingUsers.length) {
      console.log("Users already seeded!");
      return;
    }
     //Create admin user using faker
      const newUsers = new Array(5).fill(0).map((_, index) => ({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: bcryptjs.hashSync("password", 10), // static password   
    }))
    await user.create(newUsers);
    

    console.log("Users: ");
    console.table(newUsers.map((user) => ({ ...user, password: "password" }))); // Print once while create admin user 
  };
  export default async () => {
    await seedUsers();
  };