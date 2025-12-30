// function create(st) {
//     let x = 10;
  
//     return function (st) {
//       setTimeout(() => console.log(`${st} : ${x}`), 100);
//       x++;
//     };
//   }
  
//   const fn = create();
//   fn("10");
//   fn("20");

const obj = {};
obj.toString = () => 'hack';

console.log(obj.toString());