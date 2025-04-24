function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('データ分析支援')
    .addItem('データ分析支援', 'showSidebar')
    .addToUi();
}

function showSidebar() {
  let html = HtmlService.createHtmlOutputFromFile('sidebar').setTitle('SCAT分析支援システム');
  SpreadsheetApp.getUi().showSidebar(html);
}

function setValueInCell(value) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const address = sheet.getRange('O4').getValue();
  const cell = sheet.getRange(address);
  const current = cell.getValue();
  if (current && current.toString().trim() !== '') {
    cell.setValue(current + '、' + value);
  } else {
    cell.setValue(value);
  }
}

function getWordList() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const address = sheet.getRange('O4').getValue(); // 選択セルの位置
  const cell = sheet.getRange(address);
  const row = cell.getRow();
  const column = cell.getColumn();

  let result = '';

  if (column === 4) {
    result = step1(sheet, row);
  } else if (column === 5) {
    result = step2(sheet, row);
  } else if (column === 6) {
    result = step3(sheet, row);
  } else if (column === 7) {
    result = step4(sheet, row);
  } else {
    result = "該当列ではありません";
  }

  if (!result || typeof result !== 'string') return [];
  return result.split('、').map(s => s.trim());
}

function InputAnalysisPolicy() {
  let analysisPolicy = Browser.inputBox('分析方針を入力してください');
  if (analysisPolicy === 'cancel') {
    return '';
  }
  return analysisPolicy;
}

let selectedCellAddress = 'A1'; //デフォルト

function setSelectedCellAddress(address){
  selectedCellAddress = address;
}

function onSelectionChange(e) {
  const range = e.range;
  const address = range.getA1Notation();
  const sheet = e.source.getActiveSheet();

  //グローバル変数に現在の選択セルアドレスを保存
  setSelectedCellAddress(address);

  //デバッグ用にo4に表示
  sheet.getRange('o4').setValue(address);
}