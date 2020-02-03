/**
 * this script was download from article by 
 * https://blog.heroku.com/best-practices-nodejs-errors
 * some changes were made with options specially for express server 
 * @param {} server 
 * @param {*} options 
 */

function terminate (server, options = { coredump: false, timeout: 500 }) {
    // Exit function
    const exit = code => {
      options.coredump ? process.abort() : process.exit(code)
    }
  
    return (code, reason) => (err, promise) => {
      if (err && err instanceof Error) {
      // Log error information, use a proper logging library here :)
      console.log(err.message, err.stack)
      }
  
      // Attempt a graceful shutdown
      server.close(exit)
      setTimeout(exit, options.timeout).unref()
    }
  }
  
  module.exports = terminate