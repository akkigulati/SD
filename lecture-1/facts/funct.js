var {exec} = require('child_process');
const opn = require('opn');

function greeter(data,success,failure)
{if(data%2==0)
success();
else
failure();

}

function success(){
   console.log("SUCCESSFULL HAVE FUN WITH CALCULATOR");
   
exec("calc");

}

function failure(){
    console.log("ohho ni hoga tre se fb chla tu");
exec('open -a Chrome "http://www.facebook.com"', )
//opn('https://www.facebook.com/', {app: ['chrome']});   
}
greeter(17,success,failure)