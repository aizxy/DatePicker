(function(){
	var datepicker = window.datepicker;
	var monthData;
	var $wrapper;
	datepicker.buildUi = function(year, month){
		monthData = datepicker.getMonthDate(year,month);

		var html = '<div class="ui-datepicker-header">'+
			'<a href="#" class="ui-datepicker-btn ui-datepicker-premonth">&lt;</a>'+
			'<a href="#" class="ui-datepicker-btn ui-datepicker-nextmonth">&gt;</a>'+
			'<span class="ui-datepicker-currmonth">'+monthData.year +'-'+monthData.month+'</span>'+
		'</div>'+
		'<div class="ui-datepicker-body">'+
			'<table>'+
				'<thead>'+
					'<th>一</th>'+
					'<th>二</th>'+
					'<th>三</th>'+
					'<th>四</th>'+
					'<th>五</th>'+
					'<th>六</th>'+
					'<th>日</th>'+
				'</thead>'+
				'<tbody>';

				for(var i=0;i<monthData.days.length;i++){
					var date = monthData.days[i];
					if(i%7===0){
						html += '<tr>';
					}
					html += '<td data-date="'+date.date+'">' + date.showDate + '</td>';
					if(i%7===6){
						html += '</tr>';
					}
				}
				html += '</tbody>'+
			'</table>'+
		'</div>';

		return html;
	};

	datepicker.render = function(direction){
		var year,month;
		if(monthData){
			year = monthData.year;
			month = monthData.month;
		}
		
		if(direction==='prev') month--;
		if(direction==='next') month++;

		var html = datepicker.buildUi(year,month);
		//$dom.innerHTML = html;
		//<div class="ui-datepicker-wrapper">
		if(!$wrapper){
			$wrapper = document.createElement('div');
			document.body.appendChild($wrapper);
			$wrapper.className = 'ui-datepicker-wrapper';
		}
		$wrapper.innerHTML = html;
	};

	datepicker.init= function(input){

		datepicker.render();
		var $input = document.querySelector(input);
		var isOpen = false;
		$input.addEventListener('click',function(){
			if(isOpen){
				$wrapper.classList.remove('ui-datepicker-wrapper-show');
				isOpen = false;
			}else{
				$wrapper.classList.add('ui-datepicker-wrapper-show');
				var left = $input.offsetLeft;
				var top = $input.offsetTop;
				var height = $input.offsetHeight;
				$wrapper.style.top = top+height+2+'px';
				$wrapper.style.left = left +'px';
				isOpen = true;
			}
		},false);

		$wrapper.addEventListener('click',function(e){
			var $target = e.target;
			if(!$target.classList.contains('ui-datepicker-btn'))
				return;
			
			//上一月
			if($target.classList.contains('ui-datepicker-premonth')){
				datepicker.render('prev');
			}else if($target.classList.contains('ui-datepicker-nextmonth')){
				datepicker.render('next');
			}
		},false);

		$wrapper.addEventListener('click',function(e){
			//获取点击的元素
			var $target = e.target;
			//如果点击的不是日期单元格
			if($target.tagName.toLowerCase()!=='td'){return;}

			//获取到完整的日期
			var date = new Date(monthData.year,monthData.month - 1,
				$target.dataset.date);
			//赋值给input
			$input.value = format(date);

			//选择日期后，隐藏datepicker
			$wrapper.classList.remove('ui-datepicker-wrapper-show');
				isOpen = false;
		},false);

	};

	function  format(date){
		ret = '';
		var padding = function(num){
			if(num<=9){
				return '0'+num;
			}
			return num;
		}

		//生成完整日期的字符串
		ret += date.getFullYear() + '-';
		ret += padding(date.getMonth() + 1) + '-';
		ret += padding(date.getDate());

		return ret;
	}
})();









