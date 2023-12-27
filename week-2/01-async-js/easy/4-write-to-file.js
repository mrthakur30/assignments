// ## Write to a file
// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.

const fs = require('fs');

fs.writeFileSync('test.txt', 'bcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcb', function( data) {
    console.log('====================================');
    console.log(data.replace(' ',''));
    console.log('====================================');
   // setTimeout(function(){},1000);
});
