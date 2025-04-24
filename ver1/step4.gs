function step4(sheet, row) {
  var step3_text = sheet.getRange(row, 6).getValue(); // F列
  var allOfTheText = get_allOfTheText();
  if (step3_text) {
    var prompt = "次の語句とテクストを参考にして、テーマ・構成概念(名詞あるいは名詞句)を作り、「、」で区切ってください。 語句: " + step3_text + "テクスト : " + allOfTheText;
    var result = callGPT_API(prompt);
    // sheet.getRange(row, 7).setValue(result); 
    return result;
  }
}
