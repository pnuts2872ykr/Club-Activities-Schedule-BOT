function myFunction() {
    // カレンダーID
    var calId = "ここにカレンダーID";  // 例: var calId = "djaishfndcsj324wq21@group.calendar.google.com";
    // LINE Notifyのアクセストークン
    var key = "ここにLINENotifyのアクセストークン"; // 例: var key = "gkL6qVlnLU7g3SyWo3AbVMsivLGhFDbapVaYLsa1Wi7";
  
    var url = "https://notify-api.line.me/api/notify";
  
  
    var cal = CalendarApp.getCalendarById(calId);
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var tommorow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    // googleカレンダーより今日の予定と明日の予定を取得
    var TodayEvent = cal.getEventsForDay(today);
    var tomorrowEvent = cal.getEventsForDay(tommorow);
    // LINE Notifyに送るメッセージ
    var msg = "";
    // 部活がない時
    if(TodayEvent.length === 0){ // 今日の部活が0だったときにこれが実行される
      msg += "今日の予定はありません！！！！";
      msg += "貴重な休みを楽しんでください！！(☝ ՞ਊ ՞)☝ｳｪｰｲ";
    　msg += "ちなみに明日は" + String(tomorrowEvent.length) + "回あります。\n\n"; // 明日の部活の回数を取得
    }
    // 部活がある時
    else{
      msg += "今日の部活は" + String(TodayEvent.length) + "回あります。\n\n"; // 部活の回数表示
      msg += allPlanToMsg(TodayEvent); // 日付とか表示
      msg += "部活があるので行きましょう()";
    }
  
    var jsonData = {
      message: msg
    }
  
    var options =
    {
      "method" : "post",
      "contentType" : "application/x-www-form-urlencoded",
      "payload" : jsonData,
      "headers": {"Authorization": "Bearer " + key}
    };
  
    var res = UrlFetchApp.fetch(url, options);
  }
  
  // イベントの配列をテキストにして返す
  function allPlanToMsg(events/* array */){
    var msg = "";
    events.forEach( function(event, index){
      var title = event.getTitle();
      var start = event.getStartTime().getHours() + ":" + ("0" + event.getStartTime().getMinutes()).slice(-2);
      var end = event.getEndTime().getHours() + ":" + ("0" + event.getEndTime().getMinutes()).slice(-2);
      // 部活が終日の時
      if( event.isAllDayEvent() ){
        msg += String(index + 1) + "件目: " + title + " 終日の予定です。\n\n";
        return;
      }
      msg += String(index + 1) + "件目: " + title + " " + start + "~" + end + "\n\n";
    });
    return msg;
  }
  // こちらの例に記載しているトークンやIDは適当に打った架空のものですが、だれかが所持していた場合消させていただきますのでお問い合わせしていただけると助かります。
  // 引用元 https://qiita.com/imajoriri/items/e211547438967827661f
  // Created pnuts2872ykr.
  