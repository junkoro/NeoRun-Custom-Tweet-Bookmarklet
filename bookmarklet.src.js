// このコードを下記のサイトでBookmarkletに変換すると楽
// Bookmarklet Crunchinator
// http://ted.mielczarek.org/code/mozilla/bookmarklet.html


//実行内容
var format = "#WristableGPS で走りました =日付, =ワークアウト名, =タイム（長）, =タイム（短）, =開始時間, =終了時間, =距離, =平均ペース, =カロリー, =ピッチ, =ストライド, =歩数, =上昇, =下降 =平均心拍, =最小心拍, =最大心拍";
var isCutSpace = false;
var out = formatNeoRunData(getNeoRunData(), format, isCutSpace);
//console.log(out);
out = prompt("この内容でTwitterのツイートページを表示します", out);
if (out) {
  open("http://twitter.com/share?text=" + encodeURIComponent(out), null, "_blank");
}


/**
 * NeoRunのトレーニングデータオブジェクトを指定のフォーマットでフォーマットして返す
 */
function formatNeoRunData(data, format, isCutSpace) {
  function cutSpace(prop) {
    var propAlt = prop;
    if (isCutSpace) {
      propAlt = propAlt.replace(/\s/, "");
    }
    return propAlt;
  }
  var out = format;
  out = out.replace(/=日付/g, data.date);
  out = out.replace(/=ワークアウト名/g, data.workoutName);
  out = out.replace(/=タイム（長）/g, data.durationLong);
  out = out.replace(/=タイム（短）/g, data.durationShort);
  out = out.replace(/=開始時間/g, data.startTime);
  out = out.replace(/=終了時間/g, data.endTime);
  out = out.replace(/=距離/g, cutSpace(data.distance));
  out = out.replace(/=平均ペース/g, cutSpace(data.averagePace));
  out = out.replace(/=カロリー/g, cutSpace(data.calorie));
  out = out.replace(/=ピッチ/g, cutSpace(data.averagePitch));
  out = out.replace(/=ストライド/g, cutSpace(data.averageStride));
  out = out.replace(/=歩数/g, cutSpace(data.steps));
  out = out.replace(/=スピード/g, cutSpace(data.averageSpeed));
  out = out.replace(/=上昇/g, cutSpace(data.totalAscent));
  out = out.replace(/=下降/g, cutSpace(data.totalDescent));
  out = out.replace(/=平均心拍/g, cutSpace(data.averagePulse));
  out = out.replace(/=最小心拍/g, cutSpace(data.minPulse));
  out = out.replace(/=最大心拍/g, cutSpace(data.maxPulse));
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

  //日付
  data.date = $("#workout_detail .roll_calender .font22.font_bold").text();
  
  //ワークアウト名
  data.workoutName = $("#trainingName-sp").text();

  //タイム
  var $timeCol = getCol("#trainingTimeLabel");
  data.durationLong = $timeCol.find(".data1").text();
  data.durationShort = data.durationLong.substring(0, data.durationLong.lastIndexOf("."));

  //開始・終了時間
  var timeRange = $timeCol.find(".data2").text();
  var timeRangeSplits = timeRange.split(/-/);
  data.startTime = timeRangeSplits[0];
  data.endTime = timeRangeSplits[1];
  
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
  var pulseRange = $pulseCol.find(".data3").text();
  var pulseRangeSplits = pulseRange.split(/\s/);
  data.minPulse = pulseRangeSplits[1] + " " + pulseRangeSplits[2];
  data.maxPulse = pulseRangeSplits[4] + " " + pulseRangeSplits[5];


  return data;

} //END getNeoRunData()
