
// Mocha awesome report
module.exports = {
    //require: [],
    reporter: 'mochawesome',
    timeout: 5000,
    recursive: true,
  
    reporterOptions: {
        reportDir: './mochawesome-report',
        reportFilename: 'report',
        overwrite: true,
        html: true,
        json: true,
    },
    require: ['./test/global-setup.mjs']
};



/*
// mocha-junit report
module.exports = {
    reporter: 'mocha-junit-reporter',
  
    reporterOptions: {
        mochaFile:'./reports/test-results.xml'
    },
    require: ['./test/global-setup.mjs']
};
*/