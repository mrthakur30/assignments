/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  if (str1.length !== str2.length) return false;
  let s1 = str1.replace(/[^\w]/g, '').toLowerCase();
  let s2 = str2.replace(/[^\w]/g, '').toLowerCase();
  let set = new Set();

  for (let i = 0; i < s1.length; i++) {
    set.add(s1[i]);
  }
    for (let i = 0; i < s2.length; i++) {
     set.delete(s2[i])
    }
  
    return set.size === 0;
}

module.exports = isAnagram;
