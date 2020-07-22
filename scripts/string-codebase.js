const FIXED_MODEL_STRING = `reset;
model;
option solver minos;
option substout 1;
option show_stats 1;
option presolve 1;
#option linelim 1;
set NODES;
set PARAMETERS;
set FLOWS within NODES cross NODES;
set RESOURCES;
set TERMS;
set INDICATORS;
set TERMCATEGORIES{INDICATORS, TERMS};
set TERMCLASSES;
set TERMNODES{TERMS} within NODES;
set TERMFLOWS{TERMS} within FLOWS;
set CATEGORIES{RESOURCES};
#set FIXED within PARAMETERS;
#set CALCULATED within PARAMETERS diff FIXED;
#set VARIABLES within PARAMETERS diff (FIXED union CALCULATED);


param Min{PARAMETERS};
param Max{p in PARAMETERS} >= Min[p];
param Std{p in PARAMETERS} >= Min[p] <= Max[p];
param Resource{FLOWS} in RESOURCES symbolic;
param Property{RESOURCES, TERMS} in PARAMETERS;
param Indicator in INDICATORS;
param IndicatorSign in {-1, 1};
param Cycle := 365;
param TermMethod{INDICATORS, TERMS} in PARAMETERS symbolic;
param TermParm/*{INDICATORS, TERMS}*/ in INDICATORS symbolic;
param Fixed{FIXED};
param IsRoot{NODES} binary;
param IsStation{NODES} binary;
param IsSum{NODES} binary;
param IsBalance{NODES} binary;
param Sign{FLOWS} in {-1,1};


var val {PARAMETERS};
var variables{v in VARIABLES} default Std[v] >= Min[v] <= Max[v];
var day{FLOWS};
var factor{FLOWS} >= 0;
var qty{FLOWS};
var term{TERMS};


var duration{n in NODES} >= 0;

maximize Quantities: sum{(i, j) in FLOWS} (qty[i,j] + day[i,j]);






subject to ValFixed{p in FIXED}: val[p] = Fixed[p];
subject to ValOptimized{p in VARIABLES}: val[p] = variables[p];




subject to FlowDay{(n, j) in FLOWS}:
	day[n, j] = 
	(if IsRoot[n] then 
		duration[n]
	else if IsStation[n] then
		sum{(i, n) in FLOWS} (day[i, n] + duration[n] * (Sign[i,n] + Sign[n,j]) / 2 )
	else if IsSum[n] then
		(sum{(i,n) in FLOWS} day[i, n]) / (sum{(i, n) in FLOWS} 1)
	else if IsBalance[n] then
		Sign[n, j] * sum{(i,n) in FLOWS} (day[i,n] * (Sign[i,n] + Sign[n, j] / 2 ))
	else Infinity);

		
subject to FlowQty{(n,j) in FLOWS}:
	qty[n, j] = (
	if IsRoot[n] then 
		factor[n, j]
	else if IsStation[n] then
		sum{(i, n) in FLOWS} (qty[i, n] * factor[n, j])
	 else if IsSum[n] then
		sum{(i, n) in FLOWS} qty[i, n]
	else if IsBalance[n] then
		(if sum{(i, n) in FLOWS} (Sign[i, n] * day[i, n]) mod Cycle = 0 then
			max(Sign[n, j] * sum{(i, n) in FLOWS} (Sign[i, n] * qty[i, n]), 0)
		else Sign[n, j] * sum{(i, n) in FLOWS} (qty[i, n] * (Sign[i, n] + Sign[n, j] / 2))
		)	
		else Infinity);

subject to OnlyIntegerDurations {n in NODES}: round(duration[n]) = duration[n];	

subject to OnlyPositiveFactors{(i,j) in FLOWS}: (if factor[i,j] > 0 then 0 else 1) = 0;

	


		
/*subject to TermsVal{t in TERMS}:
	term[t] = (
	if TermMethod[Indicator, t] = 'Stock' then
		sum{n in TERMNODES[t], (n, j) in TERMFLOWS[t]} (val[Property[Resource[n, j], t]] * qty[n,j] * duration[n] / 2 / Cycle) + sum{n in TERMNODES[t], (j, n) in TERMFLOWS[t]} (val[Property[Resource[j,n], t]] * qty[j, n] * duration[n] / 2 / Cycle)
	else if TermMethod[Indicator, t] = 'Input' then
		sum{n in TERMNODES[t], (n, j) in TERMFLOWS[t]} (val[Property[Resource[n, j], t]] * qty[n,j] * (1 + Sign[n,j]) / 2) + sum{n in TERMNODES[t], (j,n) in TERMFLOWS[t]} (val[Property[Resource[j, n], t]] * qty[j, n] * (1 - Sign[j,n]) / 2)	
	else if TermMethod[Indicator, t] = 'Output' then
		sum{n in TERMNODES[t], (n, j) in TERMFLOWS[t]} (val[Property[Resource[n, j], t]] * qty[n,j] * (1 - Sign[n, j]) / 2) + sum{n in TERMNODES[t], (j, n) in TERMFLOWS[t]} (val[Property[Resource[j, n], t]] * qty[j,n] * (1 + Sign[j,n]) / 2)
	else if TermMethod[Indicator, t] = 'TermParm' then
		val[TermMethod[TermParm, t]]
	else if TermMethod[Indicator, t] = '1' then
		1
	else
		0
	);*/`