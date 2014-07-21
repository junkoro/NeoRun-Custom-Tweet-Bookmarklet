// このコードを下記のサイトでBookmarkletに変換すると楽
// Bookmarklet Crunchinator
// http://ted.mielczarek.org/code/mozilla/bookmarklet.html


//実行内容
var format = "=距離, =タイム, =平均ペース, =カロリー, =心拍, =ピッチ, =ストライド, =歩数, ↑=上昇, ↓=下降 #WristableGPS";
var out = formatNeoRunData(getNeoRunData(), format);
out = prompt("この内容でTwitterのツイートページを表示します", out);
if (out) {
  open("http://twitter.com/share?text=" + encodeURIComponent(out), null, "_blank");
}


/**
 * NeoRunのトレーニングデータオブジェクトを指定のフォーマットでフォーマットして返す
 */
function formatNeoRunData(data, format) {
  var out = format;
  out = out.replace(/=ワークアウト名/, data.workoutName);
  out = out.replace(/=タイム/, data.duration);
  out = out.replace(/=時間範囲/, data.timeRange);
  out = out.replace(/=距離/, data.distance);
  out = out.replace(/=平均ペース/, data.averagePace);
  out = out.replace(/=カロリー/, data.calorie);
  out = out.replace(/=ピッチ/, data.averagePitch);
  out = out.replace(/=ストライド/, data.averageStride);
  out = out.replace(/=歩数/, data.steps);
  out = out.replace(/=スピード/, data.averageSpeed);
  out = out.replace(/=上昇/, data.totalAscent);
  out = out.replace(/=下降/, data.totalDescent);
  out = out.replace(/=心拍/, data.averagePulse);
  out = out.replace(/=心拍範囲/, data.pulseRange);
  return out;
}


/**
 * NeoRunのトレーニングデータオブジェクトを取得する
 */
function getNeoRunData() {

  //各データ列のルートノードを取得
  function getCol(id) {
    return $(id).parent().parent();
  }

  //各データ列の１番目のデータを取得
  function getColData1Text(id) {
    return getCol(id).find(".data1").text();
  }

  //データオブジェクト
  var data = {};

  //ワークアウト名
  data.workoutName = $("#workout_detail .col-md-9.icon_pd .read-only.notread-area").text();

  //タイム
  var $timeCol = getCol("#trainingTimeLabel");
  data.duration = $timeCol.find(".data1").text();
  data.timeRange = $timeCol.find(".data2").text();

  //走行距離
  data.distance = getColData1Text("#distanceLabel");

  //平均ペース
  data.averagePace = getColData1Text("#averagePaceLabel");

  //運動消費カロリー
  data.calorie = getColData1Text("#calorieLabel");

  //ピッチ
  data.averagePitch = getColData1Text("#averagePitchLabel");

  //ストライド
  data.averageStride = getColData1Text("#averageStrideLabel");

  //歩数
  data.steps = getColData1Text("#stepsLabel");

  //スピード
  data.averageSpeed = getColData1Text("#averageSpeedLabel");

  //累積上昇高度
  data.totalAscent = getColData1Text("#totalAscentLabel");

  //累積下降高度
  data.totalDescent = getColData1Text("#totalDescentLabel");

  //心拍数
  var $pulseCol = getCol("#averagePulseLabel");
  data.averagePulse = $pulseCol.find(".data1").text();
  data.pulseRange = $pulseCol.find(".data3").text();

  return data;

} //END getNeoRunData()
