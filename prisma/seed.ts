import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const seedUser = () => {
    prisma.user.create({data: {
        email: "admin@gmail.com",
        password: "admin",
        name: "Admin",
        list_of_animals: {
            create: [
                {
                    name: "Dog 1",
                    adoption_date: new Date("2024-01-17 11:00:00"),
                    age: 3,
                    description: "Beautiful dog",
                    adopted: true,
                    image: "https://www.dailypaws.com/thmb/DQfQglzyKWlVSlsDwKPprF2iMSg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/golden-retriever-177213599-2000-a30830f4d2b24635a5d01b3c5c64b9ef.jpg"
                },
                {
                    name: "Dog 2",
                    adoption_date: new Date("2024-01-17 11:00:00"),
                    age: 2,
                    description: "Beautiful dog",
                    adopted: true,
                    image: "https://fello.pet/wp-content/uploads/2022/04/Alaskan-Malamute-1.jpg"
                },
                {
                    name: "Dog 3",
                    adoption_date: new Date("2024-01-17 11:00:00"),
                    age: 4,
                    description: "Beautiful dog",
                    adopted: true,
                    image: "https://furfresh.com.au/cdn/shop/articles/Corgi.jpg?v=1687923583"
                },
            ]
        },
    }}).then(() => console.log("feed made"))
    .catch(err => console.log(err))
}

seedUser();