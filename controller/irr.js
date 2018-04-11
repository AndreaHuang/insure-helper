var Finance = require('financejs');

var finance = new Finance();

const  calIRR =(depositAmtYearly,depositYear,withdrawAmt,withdrawYear)=>{
	console.log(depositAmtYearly,depositYear,withdrawAmt,withdrawYear);
  var i= Array.apply(0, Array(depositYear)).map(function (x,i) { return (depositAmtYearly >0 ? -1* depositAmtYearly : depositAmtYearly);});
  var a=Array.apply(0, Array(withdrawYear - depositYear-1)).map(function (x,i) {return 0});
  let irr = finance.IRR(...i,...a,withdrawAmt);
  return irr;
}


 const handleIRR = (cashFlow)=>{
 	console.log(cashFlow);
	let depositAmtYearly, depositYear,year,cashValue, result, totalDeposit, anb;
	anb = cashFlow.anb;
	if(cashFlow.deposit) {
		depositAmtYearly  = cashFlow.deposit.amount;
		depositYear = cashFlow.deposit.paymentTerm;
		totalDeposit = ((depositAmtYearly * depositYear)/1000).toFixed(1);
    }
    if(cashFlow.cashValue) {
		result = [];
		cashFlow.cashValue.map((cashValueItem)=>{
			if(!cashValueItem.value) {
				return;
			}
			if(cashValueItem.year) {
				let irr = calIRR (depositAmtYearly,depositYear,cashValueItem.value,cashValueItem.year);
				result.push({ year: cashValueItem.year,percentage: (cashValueItem.value/(1000*totalDeposit)).toFixed(2), irr : irr})
			} else if(cashValueItem.anb){
				let year =cashValueItem.anb - anb;
				let irr = calIRR (depositAmtYearly,depositYear,cashValueItem.value,year);
				result.push({ year: year +'@'+cashValueItem.anb,percentage: (cashValueItem.value/(1000*totalDeposit)).toFixed(2), irr : irr})
			}
		})
	}
	return result;

}

const cashFlow={//1w5,44
	anb:44,
	deposit:{
		amount: 10025,
		paymentTerm:5
	},
	cashValue:[
	{ year: 10, value:59596 },
	{ year: 15, value: 83518 },
	{ year: 20, value:117755 },
	{ year: 25, value:165433 },
	{ year: 30, value:232857 },
	{ anb: 76, value:267463 },
	{ anb: 81, value:376347 },
	{ anb: 86, value:516814 },
	{ anb: 91, value:710616 },
	{ anb: 96, value:979573 },
    { anb: 101, value:1352848 }
	]
}
//console.log(JSON.stringify(cashFlow));
module.exports={handleIRR:handleIRR};

//console.log(calculate(cashFlow));