var ary=[2,6,17,28,46,68];
function oddeve(ele)
{
    if(ele%2==0)
    return ele+1;
    else
    return ele-1;
}
function isPrime(num) {
    if (num <= 1)
        return false;
    else if (num === 2)
        return true;
    else {
        for (let i = 2; i < num; i++)
            if (num % i === 0)
                return false;
        return true;
    }
}

function mymap(ary,oddeve)
{
  for(var i=0;i<ary.length;i++)
  {
      ary[i]=oddeve(ary[i]);
  }

}
var newarr=[];
function myfilter(ary,isPrime)
{
  for(var i=0;i<ary.length;i++)
  {  if(isPrime(ary[i])==true)
      newarr.push(ary[i]);
  }

}
mymap(ary,oddeve);
myfilter(ary,isPrime)

console.log(newarr);
