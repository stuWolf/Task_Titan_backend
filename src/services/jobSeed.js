const Job = require('../models/job')


const seedJobs = () => {
    return Job.deleteMany({})
      .then(() => Job.insertMany(jobSeed))
      .then(data => {
        console.log('Data imported! ', data);
        return {
          message:"The Jobs collection was seeded"
        };
      })
      .catch(err => {
        console.error('Error importing Jobs data: ', err);
        process.exit(1);
      });
  }
  





const jobSeed = [
    // {
    //     _id: "64c554a069a5213214551fd7",
    //     jobStatus: "Draft",
    //     customerId: "64c5541869a5213214551fd1",
    //     addressOfInstallation: "20 Flinders St, Adelaide, SA 5000, Australia",
    //     scopeOfWork: "Electrical installation and maintenance",
    //     preferredJobCompletionDate: "2023-12-01T00:00:00.00Z",
    //     dateQuoted: "2023-08-25",
    //     amountQuoted: 1300.5,
    //     quoteAttachment: "http://example.com/quote1.pdf",
    //     workerId: "64c5540169a5213214551fcd",
    //     maximumDemandInAmps: 60,
    //     consumerMainsCapacity: 120,
    //     electricalRetailer: "Best Electricity Retailer",
    //     energyDistributor: "Top Energy Distributor",
    //     mainsPhases: 3,
    //     workStarted: "2023-12-01T00:00:00.000Z",
    //     reviewId: "64c554a069a5213214551fd8",
    //     dateCompleted: "2023-12-01T00:00:00.000Z",
    //     invoiceLink: "http://example.com/invoice1.pdf",
    //     dateCreated: "2023-08-25"
    // },

    // {
    //     _id: "64c554b269a5213214551fd9",
    //     jobStatus: "Worker Assignment",
    //     customerId: "64c5542569a5213214551fd3",
    //     addressOfInstallation: "30 North Tce, Adelaide, SA 5000, Australia",
    //     scopeOfWork: "Electrical installation and repair",
    //     preferredJobCompletionDate: "2023-09-20",
    //     dateQuoted: "2023-08-28",
    //     amountQuoted: 1400.5,
    //     quoteAttachment: "http://example.com/quote2.pdf",
    //     workerId: "64c5540a69a5213214551fcf",
    //     maximumDemandInAmps: 70,
    //     consumerMainsCapacity: 130,
    //     electricalRetailer: "Next Electricity Retailer",
    //     energyDistributor: "Super Energy Distributor",
    //     mainsPhases: 3,
    //     workStarted: "2023-09-05",
    //     reviewId: "64c554b269a5213214551fda",
    //     workEnd: "2023-09-15",
    //     invoiceLink: "http://example.com/invoice2.pdf",
    //     dateCreated: "2023-08-30"
    // },

    //     // ...existing jobs here...
    
    //     {
    //         _id: "64c554c869a5213214551fdb",
    //         jobStatus: "Customer Approval",
    //         customerId: "64c5541869a5213214551fd1",
    //         addressOfInstallation: "20 Flinders St, Adelaide, SA 5000, Australia",
    //         scopeOfWork: "Plumbing installation and maintenance",
    //         preferredJobCompletionDate: "2023-10-01",
    //         dateQuoted: "2023-09-01",
    //         amountQuoted: 1700.5,
    //         quoteAttachment: "http://example.com/quote3.pdf",
    //         workerId: "64c553df69a5213214551fc9",
            
    //         maximumDemandInAmps: 80,
    //         consumerMainsCapacity: 140,
    //         electricalRetailer: "Excellent Electricity Retailer",
    //         energyDistributor: "Mega Energy Distributor",
    //         mainsPhases: 3,
    //         workStarted: "2023-09-10",
    //         reviewId: "64c554c869a5213214551fdc",
    //         workEnd: "2023-09-20",
    //         invoiceLink: "http://example.com/invoice3.pdf",
    //         dateCreated: "2023-09-05"
    //     },
    //     {
    //         _id: "64c554d669a5213214551fdd",
    //         jobStatus: "Closed",
    //         customerId: "64c5542569a5213214551fd3",
    //         addressOfInstallation: "30 North Tce, Adelaide, SA 5000, Australia",
    //         scopeOfWork: "Carpentry installation and repair",
    //         preferredJobCompletionDate: "2023-10-05",
    //         dateQuoted: "2023-09-05",
    //         amountQuoted: 1800.5,
    //         quoteAttachment: "http://example.com/quote4.pdf",
    //         workerId: "64c553cd69a5213214551fc7",
            
    //         maximumDemandInAmps: 90,
    //         consumerMainsCapacity: 150,
    //         electricalRetailer: "Superb Electricity Retailer",
    //         energyDistributor: "Super Energy Distributor",
    //         mainsPhases: 3,
    //         workStarted: "2023-09-15",
    //         reviewId: "64c554d669a5213214551fde",
    //         workEnd: "2023-09-25",
    //         invoiceLink: "http://example.com/invoice4.pdf",
    //         dateCreated: "2023-09-10"
    //     },
        
    //         {
    //             _id: "64c554f069a5213214551fdf",
    //             jobStatus: "Draft",
    //             customerId: "64c5541869a5213214551fd1",
    //             addressOfInstallation: "20 Flinders St, Adelaide, SA 5000, Australia",
    //             scopeOfWork: "Roof repair and maintenance",
    //             preferredJobCompletionDate: "2023-11-01",
    //             dateQuoted: "2023-10-01",
    //             amountQuoted: 1900.5,
    //             quoteAttachment: "http://example.com/quote5.pdf",
    //             workerId: "64c553df69a5213214551fc9",
                
    //             maximumDemandInAmps: 100,
    //             consumerMainsCapacity: 200,
    //             electricalRetailer: "Great Electricity Retailer",
    //             energyDistributor: "Prime Energy Distributor",
    //             mainsPhases: 3,
    //             workStarted: "2023-10-10",
    //             reviewId: "64c554f069a5213214551fe0",
    //             workEnd: "2023-10-20",
    //             invoiceLink: "http://example.com/invoice5.pdf",
    //             dateCreated: "2023-10-05"
    //         },
    //         {
    //             _id: "64c554fc69a5213214551fe1",
    //             jobStatus: "Customer Review",
    //             customerId: "64c5542569a5213214551fd3",
    //             addressOfInstallation: "30 North Tce, Adelaide, SA 5000, Australia",
    //             scopeOfWork: "Home renovation and repair",
    //             preferredJobCompletionDate: "2023-11-05",
    //             dateQuoted: "2023-10-05",
    //             amountQuoted: 2100.5,
    //             quoteAttachment: "http://example.com/quote6.pdf",
    //             workerId: "64c5540169a5213214551fcd",
                
    //             maximumDemandInAmps: 120,
    //             consumerMainsCapacity: 240,
    //             electricalRetailer: "Excellent Electricity Retailer",
    //             energyDistributor: "Best Energy Distributor",
    //             mainsPhases: 3,
    //             workStarted: "2023-10-15",
    //             reviewId: "64c554fc69a5213214551fe2",
    //             workEnd: "2023-10-25",
    //             invoiceLink: "http://example.com/invoice6.pdf",
    //             dateCreated: "2023-10-10"
    //         },
    //         {
    //             _id: "64c5551569a5213214551fe3",
    //             jobStatus: "Job Implementation",
    //             customerId: "64c5541869a5213214551fd1",
    //             addressOfInstallation: "20 Flinders St, Adelaide, SA 5000, Australia",
    //             scopeOfWork: "Landscaping and garden maintenance",
    //             preferredJobCompletionDate: "2023-11-10",
    //             dateQuoted: "2023-10-10",
    //             amountQuoted: 1700.5,
    //             quoteAttachment: "http://example.com/quote7.pdf",
    //             workerId: "64c5540a69a5213214551fcf",
                
    //             maximumDemandInAmps: 110,
    //             consumerMainsCapacity: 220,
    //             electricalRetailer: "Awesome Electricity Retailer",
    //             energyDistributor: "Supreme Energy Distributor",
    //             mainsPhases: 3,
    //             workStarted: "2023-10-20",
    //             reviewId: "64c5551569a5213214551fe4",
    //             workEnd: "2023-10-30",
    //             invoiceLink: "http://example.com/invoice7.pdf",
    //             dateCreated: "2023-10-15"
    //         },
    //         {
    //             _id: "64c5552069a5213214551fe5",
    //             jobStatus: "Closed",
    //             customerId: "64c5542569a5213214551fd3",
    //             addressOfInstallation: "30 North Tce, Adelaide, SA 5000, Australia",
    //             scopeOfWork: "Interior design and decoration",
    //             preferredJobCompletionDate: "2023-11-15",
    //             dateQuoted: "2023-10-15",
    //             amountQuoted: 2300.5,
    //             quoteAttachment: "http://example.com/quote8.pdf",
    //             workerId: "64c5540a69a5213214551fcf",
                
    //             maximumDemandInAmps: 130,
    //             consumerMainsCapacity: 260,
    //             electricalRetailer: "Top Notch Electricity Retailer",
    //             energyDistributor: "Leading Energy Distributor",
    //             mainsPhases: 3,
    //             workStarted: "2023-10-25",
    //             reviewId: "64c5552069a5213214551fe6",
    //             workEnd: "2023-11-05",
    //             invoiceLink: "http://example.com/invoice8.pdf",
    //             dateCreated: "2023-10-20"
    //         }
        
        
];
    
module.exports = seedJobs;