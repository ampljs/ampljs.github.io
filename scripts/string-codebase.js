const FIXED_MODEL_STRING = `reset;

model;

option substout 1; 
option presolve 0;
option show_stats 1;
option solver minos;
option minos_options 'major_iterations=100000';

param Cycle := 365;

set NODES;
param IsRoot{NODES} binary default 0;
param IsBalance{NODES} binary default 0;
param IsSum{NODES} binary default 0;
set TermNodes within NODES;
var duration{n in TermNodes} default 0;

set FLOWS within NODES cross NODES;
param Sign{FLOWS} in {-1,1} default 1;
var factor{FLOWS} default 1; 
var qty{FLOWS} default 1;

set PARAMETERS;
set PROPERTIES := PARAMETERS union {'_1'}; 
param Std{p in PROPERTIES} default 1; 
param Min{p in PROPERTIES} default Std[p] <= Std[p];
param Max{p in PROPERTIES} default Std[p] >= Std[p];
var val {p in PROPERTIES} default Std[p];

set TERMS := {'N1', 'N2', 'N3', 'D1', 'D2', 'D3'};
set TermMethods within TERMS cross (PARAMETERS union {'_0', '_1', 'Input', 'Output', 'Stock'});
set TermFlowProperties within TERMS cross FLOWS cross PROPERTIES;
var term{TERMS} default 0;
var Indicator  default 0;

maximize IndicatorMax: Indicator;
    
subject to IndicatorTerms: Indicator = 
	((term["N1"] - term["N2"]) * term["N3"]) / ((term["D1"] - term["D2"]) * term["D3"]);

subject to TermMethod{(t,m) in TermMethods}: term[t] = 
	if m = "Stock" then
		(sum {(t,i,j,p) in TermFlowProperties} val[p] * qty[i, j] * (duration[i] + duration[j]))/2/Cycle
	else if m in {"Input", "Output"} then
		sum{(t,i,j,p) in TermFlowProperties} val[p] * qty[i, j]
	else if m = "_0" then 0
	else if m = "_1" then 1
	else val[m];


subject to FlowQty{(n, j) in FLOWS}: qty[n, j] =
	if IsRoot[n] then
		factor[n, j] else
	if IsSum[n]  then
		sum{(i, n) in FLOWS} qty[i, n] else
    if IsBalance[n] then
    	Sign[n, j] * sum{(i, n) in FLOWS} Sign[i, n] * qty[i, n]
	else
		factor[n, j] * sum{(i, n) in FLOWS} qty[i, n];

subject to ValFixed{p in PROPERTIES: Min[p] = Max[p]}: val[p] = Std[p];
subject to ValNotFixed{p in PROPERTIES: Min[p] <> Max[p]}: Min[p] <= val[p] <= Max[p];
subject to PositiveQty{(n,j) in FLOWS: IsBalance[n]}: qty[n,j] >= 0;`