/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  if(str.length === 0) return true;

  let regex = str.match(/[a-zA-Z0-9@]/g) ;

  if(regex === null) return false;

  let s = regex.join('').toLowerCase();

  for(let i = 0; i < s.length/2; i++){
     if(s.charAt(i)===s.charAt(s.length-1-i)){
        continue ;
     }
      return false;
  }
  return true ;
}

module.exports = isPalindrome;
