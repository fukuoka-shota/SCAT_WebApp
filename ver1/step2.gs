function step2(sheet, row){
  const step1_text = sheet.getRange(row, 4).getValue(); //<step1>の語句を持ってきている
  if(step1_text){
    const prompt = "次の名詞、あるいは名詞句から言い換えの語句を生成し、「、」で区切ってください : " + step1_text;
    const result = callGPT_API(prompt);
    //ここからが出力行
    // sheet.getRange(row, 5).setValue(result); 
    return result;
  }
}