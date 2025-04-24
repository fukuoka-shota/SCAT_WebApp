function get_allOfTheText() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const values = sheet.getRange("C:C").getValues(); // C列の全データ取得

  let lastRow = 0;
  for (let i = values.length - 1; i >= 0; i--) {
    const cell = values[i][0];
    if (cell !== "" && cell.toString().trim() !== "") {
      lastRow = i + 1; // 行番号は1始まり
      break;
    }
  }

  let range = sheet.getRange("B2:C" + lastRow).getValues();
  let allOfTheText = range
    .filter(row => row[0] && row[1])
    .map(row => row[0] + " : " + row[1])
    .join("\n");

  // Logger.log("lastRow: " + lastRow);
  // Browser.msgBox(allOfTheText);
  return allOfTheText
}

function callGPT_API(prompt) {
  if (!prompt || typeof prompt !== 'string') {
    throw new Error("promptが空またはnullです");
  }

  const url = "https://api.openai.com/v1/chat/completions";
  const apiKey = "sk-"; // 有効なAPIキーをセット

  const options = {
    method: "post",
    contentType: "application/json",  // 正しいキー名
    headers: {
      Authorization: "Bearer " + apiKey
    },
    payload: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: prompt }
      ],
      max_tokens: 100
    }),
    muteHttpExceptions: true // ← 追加（エラーでもレスポンスを取得）
  };

  const response = UrlFetchApp.fetch(url, options);
  const text = response.getContentText();
  Logger.log("APIレスポンス: " + text);

  const json = JSON.parse(text);
  if (json.error) {
    throw new Error("APIエラー: " + json.error.message);
  }

  return json.choices[0].message.content.trim();
}