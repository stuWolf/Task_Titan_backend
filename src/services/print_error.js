const printError = (error, response) => {
    if (error.name === 'MongoServerError' && error.code === 11000) {
      // Unique constraint error, duplicate key
      return response.status(409).json({ message: 'Email already exists!' });
    }
    
    if (error.name === 'ValidationError') {
      // Mongoose validation error, missing fields
      return response.status(400).json({ message: error.message });
    }
  
    // Unknown server error
    return response.status(500).json({ message: `Something went wrong! \n  ${error}` });
  }
  module.exports = {
    printError
    // your other exports here
  }
  