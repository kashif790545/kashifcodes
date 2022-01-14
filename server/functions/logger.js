const { createLogger, format, transports, config } = require('winston');
 
const userLogger = createLogger({
    transports: [
        new transports.Console()
      ]
 });
//  const paymentLogger = createLogger({
//     transports: [
//         new transports.Console()
//       ]
//  });
  
 module.exports = {
  userLogger: userLogger,
//   paymentLogger: paymentLogger
 };
