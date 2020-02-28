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

Array.prototype.mymap=function(cb)
{
  for(var i=0;i<this.length;i++)
  {
      this[i]=cb(this[i]);
  }
  return this;

}
var newarr=[];
Array.prototype.myfilter=function (isPrime)
{
  for(var i=0;i<this.length;i++)
  {  if(isPrime(this[i])==true)
      newarr.push(this[i]);
  }

}


let narr=ary.mymap(oddeve)
narr.myfilter(isPrime)
console.log(newarr);
