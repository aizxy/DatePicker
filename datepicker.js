(function(){
	var datepicker = {};

	datepicker.getMonthDate = function(year,month){
		var ret = [];
		if(!year || !(month+1)){
			var today = new Date();
			year = today.getFullYear();
			month = today.getMonth()+1;
		}

		var firstDay = new Date(year,month-1,1);
		//第一天的星期几
		var firstDayWeekDay = firstDay.getDay();
		if(firstDayWeekDay===0){
			firstDayWeekDay = 7;
		}

		//从新获取一次年份和月份
		year = firstDay.getFullYear();
		month = firstDay.getMonth() + 1;

		//上个月的最后一天
		var lastDayOfLastMonth = new Date(year,month - 1,0);
		var lastDateOfLastMonth = lastDayOfLastMonth.getDate();

		//本月第一天前的星期空格数
		var preMonthDayCount = firstDayWeekDay-1;

		//本月的最后一天
		var lastDay = new Date(year,month,0);
		//本月最后一天的号
		var lastDate = lastDay.getDate();

		for(var i=0; i<7*6; i++){
			var date = i + 1 - preMonthDayCount;
			var showDate = date;
			var thisMonth = month;
			if(date <=0){
				//上一个月
				thisMonth=month - 1;
				showDate = lastDateOfLastMonth+date;
			}else if(date>lastDate){
				//下一个月
				thisMonth = month+1;
				showDate = showDate - lastDate;
			}
			//月份的调整
			if(thisMonth===0){
				thisMonth = 12;
			}
			if(thisMonth===13){
				thisMonth = 1;
			}

			ret.push({
				month:thisMonth,
				date:date,
				showDate:showDate
			});
		}

		return {
			year:year,
			month:month,
			days:ret
		};
	};


	window.datepicker = datepicker;
})();