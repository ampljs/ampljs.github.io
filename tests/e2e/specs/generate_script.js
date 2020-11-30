////////////////////////////////////////////////////////////////
// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide
//
// For more information on working with page objects see:
//   https://nightwatchjs.org/guide/working-with-page-objects/
////////////////////////////////////////////////////////////////

module.exports = {
    //beforeEach: (browser) => browser.init(),
    
  
    'verify if page shows the component button': (browser) => {
      browser
      .init()
      .url('http://localhost:8080/')
      .waitForElementVisible('main.v-main')


      browser.assert.titleContains('mais-precoce-ampl')
      browser.assert.visible('button')
  
      //browser.end()
    },
  
    'verify if page shows modal when click in component button': (browser) => {

        browser.click('button')
        browser.assert.containsText('h1', 'Simulação realizada 1')
        
    },

    'select one indicator and check if he is selected': (browser) => {

        browser.click('div.v-select__slot')
        browser.assert.visible('div.menuable__content__active > div > div')
        browser.click({selector: 'div.menuable__content__active > div > div', index: 3})
        
        
        browser.assert.containsText('div.v-select__selection', 'Receita total')

    },
    'select three parameters and remove one': (browser) => {

      browser.click('div.parametros > div > div > div > div > div.v-select__slot')
      browser.assert.visible('div.menuable__content__active > div > div', function (){
        browser.click({selector: 'div.menuable__content__active > div > div', index: 0})    //AGUAS
        browser.click({selector: 'div.menuable__content__active > div > div', index: 2})    //INICIO_AGUAS
        browser.click({selector: 'div.menuable__content__active > div > div', index: 3})    //DIAGNOSE
        browser.click('h1')
      })

      
      
      browser.assert.containsText({selector: 'span.v-chip--select', index:0}, 'AGUAS')
      browser.assert.containsText({selector: 'span.v-chip--select', index:1}, 'INICIO_AGUAS')
      browser.assert.containsText({selector: 'span.v-chip--select', index:2}, 'DIAGNOSE')

      browser.click({selector: 'button.v-chip__close', index: 1})   //REMOVE INICIO_AGUAS

      browser.assert.containsText({selector: 'span.v-chip--select', index:0}, 'AGUAS')    
      browser.assert.containsText({selector: 'span.v-chip--select', index:1}, 'DIAGNOSE')
    },
    'click generate button and check generated script': (browser) => {
      browser.click('button.success')
      browser.getAttribute('a', 'href', function(url){
        browser.url(url, function(result){
          browser.expect.element('body').text.to.equal(testing_script)
        })
        
      })


      browser.end()  
    }
  }
  
  const testing_script = `reset;

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
  subject to PositiveQty{(n,j) in FLOWS: IsBalance[n]}: qty[n,j] >= 0;
  subject to Factor0: factor['n_1_VeBg', 'n_2_TeBm'] = 438;
  subject to Factor1: factor['n_2_TeBm', 'n_3_AgBo'] = 1.0030334599957906;
  subject to Factor2: factor['n_3_AgBo', 'n_8_SeBo'] = 1 / (99 / 100) ** (val["AGUAS"] / 365);
  #subject to Factor3: factor['n_8_SeBo', 'b_12_1_Bo'] = 1 / (99 / 100) ** ((365 - val["AGUAS"]) / 365);
  subject to Factor4: factor['b_12_1_Bo', 'n_16_AlMp'] = 1;
  subject to Factor5: factor['n_16_AlMp', 'n_18_ReMs'] = 1;
  subject to Factor6: factor['n_16_AlMp', 'n_19_BaMp'] = 1;
  subject to Factor7: factor['n_16_AlMp', 's_20_10_GeMs'] = 1;
  subject to Factor8: factor['n_16_AlMp', 's_21_4_EnMs'] = 1;
  subject to Factor9: factor['n_16_AlMp', 'n_17_DiMp'] = 2 / (97 / 100) ** ((val["AGUAS"] - 30) / 365);
  subject to Factor10: factor['n_17_DiMp', 's_26_9_GaMs'] = 1;
  subject to Factor11: factor['n_17_DiMp', 's_27_6_EaMs1'] = 1;
  subject to Factor12: factor['n_17_DiMp', 'n_25_MoMp'] = 10 / (9 * (99 / 100) ** (val["DIAGNOSE"] / 365));
  subject to Factor13: factor['n_25_MoMp', 's_36_8_DiMs'] = 1;
  subject to Factor14: factor['n_25_MoMp', 'n_35_PuMp'] = 1.0025364466901874;
  subject to Factor15: factor['n_35_PuMp', 's_31_7_MoMs'] = 1;
  subject to Factor16: factor['n_35_PuMp', 'n_44_AlMv'] = 1;
  #subject to Factor17: factor['n_35_PuMp', 'b_42_3_Mp'] = 1;
  #subject to Factor18: factor['s_92_3_Mp', 'b_42_3_Mp'] = 1;
  subject to Factor19: factor['b_42_3_Mp', 'n_48_GePs'] = 1;
  subject to Factor20: factor['n_18_ReMs', 'n_18_RaMs'] = 1;
  subject to Factor21: factor['n_18_RaMs', 's_31_7_MoMs'] = 1;
  #subject to Factor22: factor['s_31_7_MoMs', 'n_43_MoMs'] = 1;
  #subject to Factor23: factor['s_72_14_RaPs2', 'n_152_RaPs2'] = 1;
  subject to Factor24: factor['n_43_MoMs', 's_36_8_DiMs'] = 1;
  subject to Factor25: factor['n_44_AlMv', 's_53_1_Bo'] = 1;
  subject to Factor26: factor['n_44_AlMv', 'n_19_BaMv'] = 1;
  subject to Factor27: factor['n_44_AlMv', 's_21_4_EnMs'] = 1;
  #subject to Factor28: factor['s_53_1_Bo', 'b_12_1_Bo'] = 1;
  subject to Factor29: factor['n_48_GePs', 'n_59_AlPp'] = 1;
  #subject to Factor30: factor['s_36_8_DiMs', 'n_49_DiMs'] = 1;
  subject to Factor31: factor['n_49_DiMs', 's_26_9_GaMs'] = 1;
  #subject to Factor32: factor['s_26_9_GaMs', 'n_64_GaMs'] = 1;
  subject to Factor33: factor['n_49_DiMs', 's_27_6_EaMs1'] = 1;
  #subject to Factor34: factor['s_27_6_EaMs1', 'n_65_EaMs1'] = 1;
  subject to Factor35: factor['n_59_AlPp', 'n_69_DiPp'] = 1;
  subject to Factor36: factor['n_59_AlPp', 's_53_1_Bo'] = 1;
  subject to Factor37: factor['n_59_AlPp', 's_72_14_RePs'] = 1;
  subject to Factor38: factor['n_64_GaMs', 's_20_10_GeMs'] = 1;
  #subject to Factor39: factor['s_20_10_GeMs', 'n_76_GeMs'] = 1;
  subject to Factor40: factor['n_64_GaMs', 's_21_4_EnMs'] = 1;
  subject to Factor41: factor['n_65_EaMs1', 's_21_4_EnMs'] = 1;
  #subject to Factor42: factor['s_21_4_EnMs', 'n_81_EnMs'] = 1;
  subject to Factor43: factor['n_69_DiPp', 'n_85_MoPp'] = 1;
  subject to Factor44: factor['n_69_DiPp', 's_86_11_GaPs'] = 1;
  subject to Factor45: factor['n_59_AlPp', 'n_19_BaPp'] = 1;
  subject to Factor46: factor['n_76_GeMs', 's_92_3_Mp'] = 1;
  subject to Factor47: factor['n_76_GeMs', 's_93_5_EaMs2'] = 1;
  subject to Factor48: factor['n_81_EnMs', 's_93_5_EaMs2'] = 1;
  #subject to Factor49: factor['s_93_5_EaMs2', 'n_97_EaMs2'] = 1;
  subject to Factor50: factor['n_152_RaPs2', 's_169_12_MoPs'] = 1;
  subject to Factor51: factor['n_101_PuPp', 's_169_12_MoPs'] = 1;
  subject to Factor52: factor['n_85_MoPp', 'n_101_PuPp'] = 1;
  #subject to Factor53: factor['s_169_12_MoPs', 'n_113_MoPs'] = 1;
  subject to Factor54: factor['n_85_MoPp', 's_102_16_DiPs'] = 1;
  subject to Factor55: factor['n_97_EaMs2', 'n_108_VeMg'] = 1;
  subject to Factor56: factor['n_101_PuPp', 'n_112_GeNu'] = 1;
  subject to Factor57: factor['n_112_GaNu', 's_118_13_EnNu'] = 1;
  subject to Factor58: factor['n_112_GeNu', 'n_112_GaNu'] = 1;
  subject to Factor59: factor['n_112_GaNu', 'n_117_DiNu'] = 1;
  subject to Factor60: factor['n_129_EaNu1', 's_118_13_EnNu'] = 1;
  subject to Factor61: factor['n_112_GeNu', 's_118_13_EaNu2'] = 1;
  subject to Factor62: factor['n_113_MoPs', 's_102_16_DiPs'] = 1;
  subject to Factor63: factor['n_117_DiNu', 'n_128_MoNu'] = 1;
  subject to Factor64: factor['n_117_DiNu', 'n_129_EaNu1'] = 1;
  #subject to Factor65: factor['s_86_11_GaPs', 'n_133_GaPs'] = 1;
  #subject to Factor66: factor['s_102_16_DiPs', 'n_122_DiPs'] = 1;
  subject to Factor67: factor['n_122_DiPs', 's_86_11_GaPs'] = 1;
  subject to Factor68: factor['n_122_DiPs', 'n_134_RaPs1'] = 1;
  subject to Factor69: factor['n_122_DiPs', 'n_190_EaPs1'] = 1;
  subject to Factor70: factor['n_128_MoNu', 'n_138_AgNu'] = 1;
  #subject to Factor71: factor['s_118_13_EnNu', 'n_144_EnNu'] = 1;
  subject to Factor72: factor['n_133_GaPs', 'n_133_GePs1'] = 1;
  subject to Factor73: factor['n_133_GaPs', 's_72_14_RePs'] = 1;
  subject to Factor74: factor['n_133_GaPs', 's_199_17_EnPs'] = 1;
  subject to Factor75: factor['n_133_GePs1', 's_92_3_Mp'] = 1;
  subject to Factor76: factor['n_133_GePs1', 's_72_14_RaPs2'] = 1;
  subject to Factor77: factor['n_133_GePs1', 's_199_17_EaPs2'] = 1;
  subject to Factor78: factor['n_134_RaPs1', 's_72_14_RePs'] = 1;
  #subject to Factor79: factor['s_72_14_RePs', 'n_152_RePs'] = 1;
  subject to Factor80: factor['n_138_AgNu', 'n_156_SeNu'] = 1;
  subject to Factor81: factor['n_144_EnNu', 's_118_13_EaNu2'] = 1;
  #subject to Factor82: factor['s_118_13_EaNu2', 'n_144_EaNu2'] = 1;
  subject to Factor83: factor['n_144_EaNu2', 'n_162_VeNg'] = 1;
  subject to Factor84: factor['n_48_GePs', 's_72_14_RaPs2'] = 1;
  subject to Factor85: factor['n_152_RePs', 's_72_14_RaPs2'] = 1;
  subject to Factor86: factor['n_156_SeNu', 'n_173_AgBa'] = 1;
  subject to Factor87: factor['n_173_AgBa', 'n_185_SeBa'] = 1;
  subject to Factor88: factor['n_190_EaPs1', 's_199_17_EnPs'] = 1;
  #subject to Factor89: factor['s_199_17_EnPs', 'n_203_EnPs'] = 1;
  subject to Factor90: factor['n_185_SeBa', 'n_207_CoBa'] = 1;
  subject to Factor91: factor['n_203_EnPs', 's_199_17_EaPs2'] = 1;
  #subject to Factor92: factor['s_199_17_EaPs2', 'n_203_EaPs2'] = 1;
  subject to Factor93: factor['n_203_EaPs2', 'n_209_VePg'] = 1;
  
  data;
  
  set NODES :=
    n_1_VeBg
    n_2_TeBm
    n_3_AgBo
    n_8_SeBo
    b_12_1_Bo
    n_16_AlMp
    n_17_DiMp
    n_25_MoMp
    n_35_PuMp
    b_42_3_Mp
    n_48_GePs
    n_59_AlPp
    n_69_DiPp
    n_85_MoPp
    n_101_PuPp
    n_112_GeNu
    n_112_GaNu
    n_117_DiNu
    n_128_MoNu
    n_138_AgNu
    n_156_SeNu
    n_173_AgBa
    n_185_SeBa
    n_207_CoBa
    n_129_EaNu1
    s_118_13_EnNu
    n_144_EnNu
    s_118_13_EaNu2
    n_144_EaNu2
    n_162_VeNg
    s_169_12_MoPs
    n_113_MoPs
    s_102_16_DiPs
    n_122_DiPs
    s_86_11_GaPs
    n_133_GaPs
    n_133_GePs1
    n_134_RaPs1
    s_72_14_RePs
    n_152_RePs
    s_72_14_RaPs2
    n_152_RaPs2
    n_190_EaPs1
    s_199_17_EnPs
    n_203_EnPs
    s_199_17_EaPs2
    n_203_EaPs2
    n_209_VePg
    n_44_AlMv
    s_31_7_MoMs
    n_43_MoMs
    s_36_8_DiMs
    n_49_DiMs
    s_26_9_GaMs
    n_64_GaMs
    s_20_10_GeMs
    n_76_GeMs
    s_27_6_EaMs1
    n_65_EaMs1
    s_21_4_EnMs
    n_81_EnMs
    s_93_5_EaMs2
    n_97_EaMs2
    n_108_VeMg
    n_18_ReMs
    n_18_RaMs
    s_53_1_Bo
    n_19_BaMp
    n_19_BaMv
    n_19_BaPp
    s_92_3_Mp;
  
  param IsBalance :=
    b_12_1_Bo	1,
    b_42_3_Mp	1;
  
  param IsRoot :=
    n_1_VeBg	1;
  
  param IsSum :=
    s_118_13_EnNu	1,
    s_118_13_EaNu2	1,
    s_169_12_MoPs	1,
    s_102_16_DiPs	1,
    s_86_11_GaPs	1,
    s_72_14_RePs	1,
    s_72_14_RaPs2	1,
    s_199_17_EnPs	1,
    s_199_17_EaPs2	1,
    s_31_7_MoMs	1,
    s_36_8_DiMs	1,
    s_26_9_GaMs	1,
    s_20_10_GeMs	1,
    s_27_6_EaMs1	1,
    s_21_4_EnMs	1,
    s_93_5_EaMs2	1,
    s_53_1_Bo	1,
    s_92_3_Mp	1;
  
  set FLOWS :=
    (n_1_VeBg, n_2_TeBm),
    (n_2_TeBm, n_3_AgBo),
    (n_3_AgBo, n_8_SeBo),
    (n_8_SeBo, b_12_1_Bo),
    (b_12_1_Bo, n_16_AlMp),
    (n_16_AlMp, n_18_ReMs),
    (n_16_AlMp, n_19_BaMp),
    (n_16_AlMp, s_20_10_GeMs),
    (n_16_AlMp, s_21_4_EnMs),
    (n_16_AlMp, n_17_DiMp),
    (n_17_DiMp, s_26_9_GaMs),
    (n_17_DiMp, s_27_6_EaMs1),
    (n_17_DiMp, n_25_MoMp),
    (n_25_MoMp, s_36_8_DiMs),
    (n_25_MoMp, n_35_PuMp),
    (n_35_PuMp, s_31_7_MoMs),
    (n_35_PuMp, n_44_AlMv),
    (n_35_PuMp, b_42_3_Mp),
    (s_92_3_Mp, b_42_3_Mp),
    (b_42_3_Mp, n_48_GePs),
    (n_18_ReMs, n_18_RaMs),
    (n_18_RaMs, s_31_7_MoMs),
    (s_31_7_MoMs, n_43_MoMs),
    (s_72_14_RaPs2, n_152_RaPs2),
    (n_43_MoMs, s_36_8_DiMs),
    (n_44_AlMv, s_53_1_Bo),
    (n_44_AlMv, n_19_BaMv),
    (n_44_AlMv, s_21_4_EnMs),
    (s_53_1_Bo, b_12_1_Bo),
    (n_48_GePs, n_59_AlPp),
    (s_36_8_DiMs, n_49_DiMs),
    (n_49_DiMs, s_26_9_GaMs),
    (s_26_9_GaMs, n_64_GaMs),
    (n_49_DiMs, s_27_6_EaMs1),
    (s_27_6_EaMs1, n_65_EaMs1),
    (n_59_AlPp, n_69_DiPp),
    (n_59_AlPp, s_53_1_Bo),
    (n_59_AlPp, s_72_14_RePs),
    (n_64_GaMs, s_20_10_GeMs),
    (s_20_10_GeMs, n_76_GeMs),
    (n_64_GaMs, s_21_4_EnMs),
    (n_65_EaMs1, s_21_4_EnMs),
    (s_21_4_EnMs, n_81_EnMs),
    (n_69_DiPp, n_85_MoPp),
    (n_69_DiPp, s_86_11_GaPs),
    (n_59_AlPp, n_19_BaPp),
    (n_76_GeMs, s_92_3_Mp),
    (n_76_GeMs, s_93_5_EaMs2),
    (n_81_EnMs, s_93_5_EaMs2),
    (s_93_5_EaMs2, n_97_EaMs2),
    (n_152_RaPs2, s_169_12_MoPs),
    (n_101_PuPp, s_169_12_MoPs),
    (n_85_MoPp, n_101_PuPp),
    (s_169_12_MoPs, n_113_MoPs),
    (n_85_MoPp, s_102_16_DiPs),
    (n_97_EaMs2, n_108_VeMg),
    (n_101_PuPp, n_112_GeNu),
    (n_112_GaNu, s_118_13_EnNu),
    (n_112_GeNu, n_112_GaNu),
    (n_112_GaNu, n_117_DiNu),
    (n_129_EaNu1, s_118_13_EnNu),
    (n_112_GeNu, s_118_13_EaNu2),
    (n_113_MoPs, s_102_16_DiPs),
    (n_117_DiNu, n_128_MoNu),
    (n_117_DiNu, n_129_EaNu1),
    (s_86_11_GaPs, n_133_GaPs),
    (s_102_16_DiPs, n_122_DiPs),
    (n_122_DiPs, s_86_11_GaPs),
    (n_122_DiPs, n_134_RaPs1),
    (n_122_DiPs, n_190_EaPs1),
    (n_128_MoNu, n_138_AgNu),
    (s_118_13_EnNu, n_144_EnNu),
    (n_133_GaPs, n_133_GePs1),
    (n_133_GaPs, s_72_14_RePs),
    (n_133_GaPs, s_199_17_EnPs),
    (n_133_GePs1, s_92_3_Mp),
    (n_133_GePs1, s_72_14_RaPs2),
    (n_133_GePs1, s_199_17_EaPs2),
    (n_134_RaPs1, s_72_14_RePs),
    (s_72_14_RePs, n_152_RePs),
    (n_138_AgNu, n_156_SeNu),
    (n_144_EnNu, s_118_13_EaNu2),
    (s_118_13_EaNu2, n_144_EaNu2),
    (n_144_EaNu2, n_162_VeNg),
    (n_48_GePs, s_72_14_RaPs2),
    (n_152_RePs, s_72_14_RaPs2),
    (n_156_SeNu, n_173_AgBa),
    (n_173_AgBa, n_185_SeBa),
    (n_190_EaPs1, s_199_17_EnPs),
    (s_199_17_EnPs, n_203_EnPs),
    (n_185_SeBa, n_207_CoBa),
    (n_203_EnPs, s_199_17_EaPs2),
    (s_199_17_EaPs2, n_203_EaPs2),
    (n_203_EaPs2, n_209_VePg);
  
  param Sign :=
    n_1_VeBg n_2_TeBm, -1
    n_2_TeBm n_3_AgBo, -1
    n_3_AgBo n_8_SeBo, -1
    n_8_SeBo b_12_1_Bo, -1
    b_12_1_Bo n_16_AlMp, -1
    n_16_AlMp n_17_DiMp, -1
    n_17_DiMp n_25_MoMp, -1
    n_25_MoMp n_35_PuMp, -1
    n_35_PuMp b_42_3_Mp, -1
    b_42_3_Mp n_48_GePs, -1
    n_48_GePs n_59_AlPp, -1
    n_59_AlPp n_69_DiPp, -1
    n_69_DiPp n_85_MoPp, -1
    n_85_MoPp n_101_PuPp, -1
    n_101_PuPp n_112_GeNu, -1
    n_112_GeNu n_112_GaNu, -1
    n_112_GaNu n_117_DiNu, -1
    n_117_DiNu n_128_MoNu, -1
    n_128_MoNu n_138_AgNu, -1
    n_138_AgNu n_156_SeNu, -1
    n_156_SeNu n_173_AgBa, -1
    n_173_AgBa n_185_SeBa, -1
    n_185_SeBa n_207_CoBa, -1;
  
  set PARAMETERS :=
    AGUAS
    CICLO
    CONFINAMENTO
    DIAGNOSE
    INICIO_AGUAS
    MONTA
    NATALIDADE
    PARTO_MACHO
    PERDAS
    PERDAS_CRIA
    PRECO_cerquilha_BEZERRAS
    PRECO_cerquilha_BEZERROS
    PRECO_cerquilha_BOIS_GORDOS
    PRECO_cerquilha_MULTIPARAS
    PRECO_cerquilha_MULTIPARAS_GORDAS
    PRECO_cerquilha_MULTIPARAS_PARIDAS
    PRECO_cerquilha_NULIPARAS_GORDAS
    PRECO_cerquilha_PRIMIPARAS
    PRECO_cerquilha_PRIMIPARAS_GORDAS
    PRENHEZ
    PRODUCAO
    PUERPERIO
    FIM_AGUAS
    SECA;
  
  param:	Std :=
    AGUAS	212,
    CICLO	365,
    CONFINAMENTO	110,
    DIAGNOSE	59,
    INICIO_AGUAS	90,
    MONTA	92,
    NATALIDADE	0.8,
    PARTO_MACHO	0.5,
    PERDAS	0.01,
    PERDAS_CRIA	0.03,
    PRECO_cerquilha_BEZERRAS	890,
    PRECO_cerquilha_BEZERROS	960,
    PRECO_cerquilha_BOIS_GORDOS	9100,
    PRECO_cerquilha_MULTIPARAS	5100,
    PRECO_cerquilha_MULTIPARAS_GORDAS	5100,
    PRECO_cerquilha_MULTIPARAS_PARIDAS	5900,
    PRECO_cerquilha_NULIPARAS_GORDAS	4100,
    PRECO_cerquilha_PRIMIPARAS	4400,
    PRECO_cerquilha_PRIMIPARAS_GORDAS	4400,
    PRENHEZ	0.9,
    PRODUCAO	438,
    PUERPERIO	30;
  
  param:	Min	Max :=
    AGUAS	200	220,
    DIAGNOSE	30	90;
  
  set TermMethods :=
    N1, Output
    N2, _0
    N3, _1
    D1, Output
    D2, _0
    D3, _1;
  
  set TermFlowProperties :=
    N1, n_185_SeBa, n_207_CoBa, PESO_cerquilha_BEZERRAS
    D1, n_185_SeBa, n_207_CoBa, PESO_cerquilha_BEZERRAS;
  
  set TermNodes;`