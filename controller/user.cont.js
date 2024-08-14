import { faker } from '@faker-js/faker';

import  {PrismaClient}  from "@prisma/client";
let prisma = new PrismaClient();


export const fake_data = async (req,res)=>{
try {
    
    let data_list = [];

    for (let i = 0; i <= 50000; i++) {
        data_list.push({
            name: faker.person.firstName(),
            age: faker.number.int({ min: 10, max: 100 }),
            mobile: faker.phone.number('##########'),
            email: faker.internet.email(),
            city: faker.location.city(),
          });
        
    }

    await prisma.user.createMany({
        data:data_list
    })
    
    res.send({ message: '50,000 fake users inserted into the database' });

} catch (error) { 
    console.log(error);
    res.send({ message: "something went wrong"});
}
}

export const filter_data = async (req,res)=>{
try {
    let search = req.params.search;

    const searchAsInt = parseInt(search, 10);

    if (!search) {
        return res.send({ message: "Search is required." });
      }
    console.log(search);

    const result = await prisma.user.findMany({
        where: {
          OR: [
            {
              name: search 
            },
            { age: isNaN(searchAsInt) ? undefined : searchAsInt, },
            { mobile: search },
            { city: search },
          ],

        },
        select: {
            name: true,
            age: true,
            mobile: true,
            city: true,
  },

      })

    console.log(result);
    if (result.length === 0) {
        return res.send({ message: "No results found." });
      }
    
    res.send({ message: 'Your Desired results' , data:result});

} catch (error) { 
    console.log(error);
    res.send({ message: "something went wrong"});
}
}
