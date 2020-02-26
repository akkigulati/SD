var ary=[2,6,17,28,46,68];
const map1 = ary.map(function(ele)
{
    if(ele%2==0)
    return ele+1;
    else
    return ele-1;
});
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

console.log(map1.filter(isPrime));



