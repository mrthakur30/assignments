// ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ```

const fs = require('fs');

fs.readFile('test.txt', 'utf8', function(err, data) {
    let text = data.toString();
    text = text.replace(/\s+/g, ' ');
    console.log(text);

    fs.writeFileSync ('test.txt',text);
});
