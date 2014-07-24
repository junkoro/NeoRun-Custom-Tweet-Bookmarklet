
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
  var codePost = "%22;var%20out=formatNeoRunData(getNeoRunData(),format);out=prompt(%22この内容でTwitterのツイートページを表示します%22,out);if(out)%7Bopen(%22http://twitter.com/share?text=%22+encodeURIComponent(out),null,%22_blank%22);%7Dfunction%20formatNeoRunData(data,format)%7Bvar%20out=format;out=out.replace(/=ワークアウト名/,data.workoutName);out=out.replace(/=タイム/,data.duration);out=out.replace(/=時間範囲/,data.timeRange);out=out.replace(/=距離/,data.distance);out=out.replace(/=平均ペース/,data.averagePace);out=out.replace(/=カロリー/,data.calorie);out=out.replace(/=ピッチ/,data.averagePitch);out=out.replace(/=ストライド/,data.averageStride);out=out.replace(/=歩数/,data.steps);out=out.replace(/=スピード/,data.averageSpeed);out=out.replace(/=上昇/,data.totalAscent);out=out.replace(/=下降/,data.totalDescent);out=out.replace(/=心拍/,data.averagePulse);out=out.replace(/=心拍範囲/,data.pulseRange);return%20out;%7Dfunction%20getNeoRunData()%7Bfunction%20getCol(id)%7Breturn%20$(id).parent().parent();%7Dfunction%20getColData1Text(id)%7Breturn%20getCol(id).find(%22.data1%22).text();%7Dvar%20data=%7B%7D;data.workoutName=$(%22%23workout_detail%20.col-md-9.icon_pd%20.read-only.notread-area%22).text();var%20$timeCol=getCol(%22%23trainingTimeLabel%22);data.duration=$timeCol.find(%22.data1%22).text();data.timeRange=$timeCol.find(%22.data2%22).text();data.distance=getColData1Text(%22%23distanceLabel%22);data.averagePace=getColData1Text(%22%23averagePaceLabel%22);data.calorie=getColData1Text(%22%23calorieLabel%22);data.averagePitch=getColData1Text(%22%23averagePitchLabel%22);data.averageStride=getColData1Text(%22%23averageStrideLabel%22);data.steps=getColData1Text(%22%23stepsLabel%22);data.averageSpeed=getColData1Text(%22%23averageSpeedLabel%22);data.totalAscent=getColData1Text(%22%23totalAscentLabel%22);data.totalDescent=getColData1Text(%22%23totalDescentLabel%22);var%20$pulseCol=getCol(%22%23averagePulseLabel%22);data.averagePulse=$pulseCol.find(%22.data1%22).text();data.pulseRange=$pulseCol.find(%22.data3%22).text();return%20data;%7D%7D)();";
  $scope.code = "";                                                                                                                                                                            

  //更新処理
  $scope.update = function() {
    $scope.preview = formatNeoRunData($scope.data, $scope.format, $scope.isCutSpace);
    $scope.code = codePre + $scope.format + codePost;
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
