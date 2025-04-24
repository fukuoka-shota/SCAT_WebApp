function step3(sheet, row){
  const step2_text = sheet.getRange(row, 5).getValue();
  const allOfTheText = get_allOfTheText();
  if(step2_text){
    const prompt = "次の語句を参考にして記入した語の背景、条件、原因、結果、影響、比較、特製、次元(縦横高さ時間の広がり)、変化等を検討し、テクスト外の概念を生成し、「、」で区切ってください。語句: " + step2_text + "テクスト : " + allOfTheText;
    const result = callGPT_API(prompt);
    // sheet.getRange(row,6).setValue(result);
    return result;
  }
}