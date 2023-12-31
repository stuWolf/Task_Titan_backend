const User = require('../models/user')




const userSeed = [
    {
        _id: "64c553cd69a5213214551fc7",
        userStatus: "worker",
        firstName: "Liam",
        lastName: "Smith",
        email: "liamsmith@example.com",
        password: "123",
        address: "10 Collins St, Melbourne, VIC 3000, Australia",
        contactNumber: 412345678,
        dob: new Date("1983-05-10T00:00:00.000Z"),
        license: "XYZ111",
        licenseNo: "111111",
        employedSince: new Date("2020-01-15T00:00:00.000Z"),
        __v: 0
    },
    {
        _id: "64c553df69a5213214551fc9",
        userStatus: "worker",
        firstName: "Noah",
        lastName: "Williams",
        email: "noahwilliams@example.com",
        password: "$2b$10$V38RL4j6KrM.rBxSwFklduM.DUhOjOnZDRM4JyLKNEiVSyySUt6US",
        address: "100 George St, Sydney, NSW 2000, Australia",
        contactNumber: 412345679,
        dob: new Date("1984-04-20T00:00:00.000Z"),
        license: "A grade",
        licenseNo: "A222222",
        employedSince: new Date("2019-06-25T00:00:00.000Z"),
        __v: 0
    },
    {
        _id: "64c5540169a5213214551fcd",
        userStatus: "worker",
        firstName: "Oliver",
        lastName: "Brown",
        email: "oliverbrown@example.com",
        password: "$2b$10$bRgALqgHF9J1tqhqC65LuuoLFOmiIpZxmsO72AShzvUABJobolSqW",
        address: "50 Queen St, Brisbane, QLD 4000, Australia",
        contactNumber: 412345680,
        dob: new Date("1985-03-30T00:00:00.000Z"),
        license: "A grade",
        licenseNo: "A45389",
        employedSince: new Date("2021-02-10T00:00:00.000Z"),
        __v: 0
    },
    {
        _id: "64c5540a69a5213214551fcf",
        userStatus: "worker",
        firstName: "Ethan",
        lastName: "Jones",
        email: "ethanjones@example.com",
        password: "$2b$10$iw3rNFxm.OFgIOr7a.y0TeVQfcRfAACfqGfgDbQgE3kKZ5H8aUzvy",
        address: "70 King St, Perth, WA 6000, Australia",
        contactNumber: 412345681,
        dob: new Date("1986-02-15T00:00:00.000Z"),
        license: "A grade",
        licenseNo: "A 444444",
        employedSince: new Date("2018-09-05T00:00:00.000Z"),
        __v: 0
    },
    {
        _id: "64c5541869a5213214551fd1",
        userStatus: "customer",
        firstName: "Mia",
        lastName: "Miller",
        email: "miamiller@example.com",
        password: "$2b$10$ySPLEEPuCiSN7U/uySXeNuwnKqWSXU7EWFMkUI5zpMIn0l4vN5FFG",
        address: "20 Flinders St, Adelaide, SA 5000, Australia",
        contactNumber: 412345682,
        
        __v: 0
    },
    {
        _id: "64c5542569a5213214551fd3",
        userStatus: "customer",
        firstName: "Ava",
        lastName: "Davis",
        email: "avadavis@example.com",
        password: "$2b$10$.f.AzDBU3mLqRiBMU5etYuAJTdD6gd3VbPFzC0i/jbhpMG8pY333O",
        address: "30 North Tce, Adelaide, SA 5000, Australia",
        contactNumber: 412345683,
        
        __v: 0
    },
    {
        _id: "64c5544b69a5213214551fd5",
        userStatus: "manager",
        firstName: "Miles",
        lastName: "Davis",
        email: "bigbos@example.com",
        password: "$2b$10$8Av2E3k2ZYrZszv/odJiUON7zcmNvuUfhpCMwGnSqYrjHn6FynhIC",
        address: "30 North Tce, Adelaide, SA 5000, Australia",
        contactNumber: 412345683,
        dob: new Date("1988-12-25T00:00:00.000Z"),
        license: "XYZ666",
        licenseNo: "666666",
        employedSince: new Date("2022-07-01T00:00:00.000Z"),
        __v: 0
    }
] 


const seedUser = () => {
    return User.deleteMany({})
      .then(() => User.insertMany(userSeed))
      .then(data => {
        return {
          message:"The User collection was seeded"
        };
      })
      .catch(err => {
        console.error('Error importing User data: ', err);
        process.exit(1);
      });
  }

module.exports = seedUser;