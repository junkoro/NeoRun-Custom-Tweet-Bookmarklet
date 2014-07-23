
/**
 * AngularJSアプリケーションコントローラー
 */
var app = angular.module("app", []);
app.config(function($compileProvider) {
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);
});
app.controller("ctrl", function($scope) {

  $scope.data = {
    "workoutName": "workout 51",
    "duration": "0:35'44\".10",
    "timeRange": "10:04:17-11:54:09",
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
    "pulseRange": "MIN 62 bpm MAX 167 bpm"
  };
  $scope.format = "走りました！ =距離, =タイム, =平均ペース, =カロリー #WristableGPS";
  $scope.out = formatNeoRunData($scope.data, $scope.format);
  $scope.onChnageTaFormat = function() {
    $scope.out = formatNeoRunData($scope.data, $scope.format);
  };

});


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

