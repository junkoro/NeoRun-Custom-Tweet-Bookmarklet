
/**
 * AngularJSアプリケーションコントローラー
 */
var app = angular.module("app", []);
app.config(function($compileProvider) {
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);
});
app.controller("ctrl", function($scope) {

  //サンプルデータ
  $scope.data = {
    "date": "2014/07/19",
    "workoutName": "workout 51",
    "durationLong": "0:35'44\".10",
    "durationShort": "0:35'44\"",
    "startTime": "10:04:17",
    "endTime": "11:54:09",
    "distance": "7.122 km",
    "averagePace": "5'01\" /km",
    "calorie": "458 kcal",
    "averagePitch": "184 spm",
    "averageStride": "101 cm",
    "steps": "6,659 steps",
    "averageSpeed": "11.9 km/h",
    "totalAscent": "111 m",
    "totalDescent": "136 m",
    "averagePulse": "137 bpm",
    "minPulse": "62 bpm",
    "maxPulse": "167 bpm"
  };

  //ひな形
  $scope.format = "#WristableGPS で走りました =距離, =タイム（短）, =平均ペース, =カロリー";

  //プレビュー
  $scope.preview = "";

  //ブックマークレット
  var codePre = "javascript:(function()%7Bvar%20format=%22";
  var codePost = "var%20out=formatNeoRunData(getNeoRunData(),format,isCutSpace);out=prompt(%22%E3%81%93%E3%81%AE%E5%86%85%E5%AE%B9%E3%81%A7Twitter%E3%81%AE%E3%83%84%E3%82%A4%E3%83%BC%E3%83%88%E3%83%9A%E3%83%BC%E3%82%B8%E3%82%92%E8%A1%A8%E7%A4%BA%E3%81%97%E3%81%BE%E3%81%99%22,out);if(out)%7Bopen(%22http://twitter.com/share?text=%22+encodeURIComponent(out),null,%22_blank%22);%7Dfunction%20formatNeoRunData(data,format,isCutSpace)%7Bfunction%20cutSpace(prop)%7Bvar%20propAlt=prop;if(isCutSpace)%7BpropAlt=propAlt.replace(/%5Cs/,%22%22);%7Dreturn%20propAlt;%7Dvar%20out=format;out=out.replace(/=%E6%97%A5%E4%BB%98/g,data.date);out=out.replace(/=%E3%83%AF%E3%83%BC%E3%82%AF%E3%82%A2%E3%82%A6%E3%83%88%E5%90%8D/g,data.workoutName);out=out.replace(/=%E3%82%BF%E3%82%A4%E3%83%A0%EF%BC%88%E9%95%B7%EF%BC%89/g,data.durationLong);out=out.replace(/=%E3%82%BF%E3%82%A4%E3%83%A0%EF%BC%88%E7%9F%AD%EF%BC%89/g,data.durationShort);out=out.replace(/=%E9%96%8B%E5%A7%8B%E6%99%82%E9%96%93/g,data.startTime);out=out.replace(/=%E7%B5%82%E4%BA%86%E6%99%82%E9%96%93/g,data.endTime);out=out.replace(/=%E8%B7%9D%E9%9B%A2/g,cutSpace(data.distance));out=out.replace(/=%E5%B9%B3%E5%9D%87%E3%83%9A%E3%83%BC%E3%82%B9/g,cutSpace(data.averagePace));out=out.replace(/=%E3%82%AB%E3%83%AD%E3%83%AA%E3%83%BC/g,cutSpace(data.calorie));out=out.replace(/=%E3%83%94%E3%83%83%E3%83%81/g,cutSpace(data.averagePitch));out=out.replace(/=%E3%82%B9%E3%83%88%E3%83%A9%E3%82%A4%E3%83%89/g,cutSpace(data.averageStride));out=out.replace(/=%E6%AD%A9%E6%95%B0/g,cutSpace(data.steps));out=out.replace(/=%E3%82%B9%E3%83%94%E3%83%BC%E3%83%89/g,cutSpace(data.averageSpeed));out=out.replace(/=%E4%B8%8A%E6%98%87/g,cutSpace(data.totalAscent));out=out.replace(/=%E4%B8%8B%E9%99%8D/g,cutSpace(data.totalDescent));out=out.replace(/=%E5%B9%B3%E5%9D%87%E5%BF%83%E6%8B%8D/g,cutSpace(data.averagePulse));out=out.replace(/=%E6%9C%80%E5%B0%8F%E5%BF%83%E6%8B%8D/g,cutSpace(data.minPulse));out=out.replace(/=%E6%9C%80%E5%A4%A7%E5%BF%83%E6%8B%8D/g,cutSpace(data.maxPulse));return%20out;%7Dfunction%20getNeoRunData()%7Bfunction%20getCol(id)%7Breturn%20$(id).parent().parent();%7Dfunction%20getColData1Text(id)%7Breturn%20getCol(id).find(%22.data1%22).text();%7Dvar%20data=%7B%7D;data.date=$(%22%23workout_detail%20.roll_calender%20.font22.font_bold%22).text();data.workoutName=$(%22%23trainingName-sp%22).text();var%20$timeCol=getCol(%22%23trainingTimeLabel%22);data.durationLong=$timeCol.find(%22.data1%22).text();data.durationShort=data.durationLong.substring(0,data.durationLong.lastIndexOf(%22.%22));var%20timeRange=$timeCol.find(%22.data2%22).text();var%20timeRangeSplits=timeRange.split(/-/);data.startTime=timeRangeSplits%5B0%5D;data.endTime=timeRangeSplits%5B1%5D;data.distance=getColData1Text(%22%23distanceLabel%22);data.averagePace=getColData1Text(%22%23averagePaceLabel%22);data.calorie=getColData1Text(%22%23calorieLabel%22);data.averagePitch=getColData1Text(%22%23averagePitchLabel%22);data.averageStride=getColData1Text(%22%23averageStrideLabel%22);data.steps=getColData1Text(%22%23stepsLabel%22);data.averageSpeed=getColData1Text(%22%23averageSpeedLabel%22);data.totalAscent=getColData1Text(%22%23totalAscentLabel%22);data.totalDescent=getColData1Text(%22%23totalDescentLabel%22);var%20$pulseCol=getCol(%22%23averagePulseLabel%22);data.averagePulse=$pulseCol.find(%22.data1%22).text();var%20pulseRange=$pulseCol.find(%22.data3%22).text();var%20pulseRangeSplits=pulseRange.split(/%5Cs/);data.minPulse=pulseRangeSplits%5B1%5D+%22%20%22+pulseRangeSplits%5B2%5D;data.maxPulse=pulseRangeSplits%5B4%5D+%22%20%22+pulseRangeSplits%5B5%5D;return%20data;%7D%7D)();";
  $scope.code = "";

  //更新処理
  $scope.update = function() {
    $scope.preview = formatNeoRunData($scope.data, $scope.format, $scope.isCutSpace);
    $scope.code = codePre + $scope.format + "%22;var%20isCutSpace=" + $scope.isCutSpace + ";" + codePost;
    $scope.saveConfig();
  };

  //ひな形変更時の処理
  $scope.$watch("format", function() {
    $scope.update();
  });

  //キーワードのバッジにクリックでテキストエリアに追加する処理を追加する
  $(".keywords .badge").on("click", function(evt) {
    var txt = $(evt.target).text();
    if ($scope.format.length > 0) {
      $scope.format += " ";
    }
    $scope.format += txt;
    $scope.$apply();
  });

  //コンフィグの保存
  $scope.saveConfig = function() {
    var cfg = {};
    cfg.format = $scope.format;
    cfg.isCutSpace = $scope.isCutSpace;
    localStorage.cfg = JSON.stringify(cfg);
  };

  //コンフィグの読み込み
  $scope.loadConfig = function() {
    if (!localStorage.cfg) {
      return;
    }
    var cfg = JSON.parse(localStorage.cfg);
    $scope.format = cfg.format;
    $scope.isCutSpace = cfg.isCutSpace;
  };

  //コンフィグの読み込み
  $scope.loadConfig();

});


/**
 * 全選択ボタンクリック時
 */
function onClickBtnSelectAll() {
  var $taCode = $("#taCode")[0];
  $taCode.selectionStart = 0;
  $taCode.selectionEnd = $taCode.value.length;
}


/**
 * コードコピー時
 */
function onCopyTaCode() {
  //コピー終了後に
  setTimeout(function() {
    var $taCode = $("#taCode")[0];
    $taCode.selectionEnd = 0; //選択を解除
    $taCode.blur(); //フォーカスを外す
  });
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
