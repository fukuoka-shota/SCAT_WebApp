function step1(sheet, row){
  const partOfTheText = sheet.getRange(row,3).getValue();
  if(partOfTheText){
    const prompt = "次の文章から名詞あるいは名詞句を抽出して、「、」で区切ってください : " + partOfTheText;
    const result = callGPT_API(prompt);
    //ここからが出力行
    // sheet.getRange(row,4).setValue(result);
    return result;
  }
}