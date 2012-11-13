var myArray = ["one", "two", "three", "four", "five"];
var myArray2 = [1, 2, 3, 4, 5];
var myArray3 = [1, 5, 2, 2, 8, 5, 3, 8, 9, 0];

console.debug("myArray=",myArray);
console.debug("myArray2=",myArray2);
console.debug("myArray3=",myArray3);

console.debug('_.indexOf(myArray, "three")',_.indexOf(myArray, "three"));
console.debug("_.union(myArray2, myArray3)",_.union(myArray2, myArray3));
console.debug("_.uniq(myArray3)",_.uniq(myArray3));
console.debug("_.zip(myArray, myArray2)",_.zip(myArray, myArray2));
console.debug("_.range(3)",_.range(3));
console.debug("_.range(0,3)",_.range(0,3));
console.debug("_.range(0,30,10)",_.range(0,30,10));
