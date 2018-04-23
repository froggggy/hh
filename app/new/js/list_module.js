//common js 
/**
 * @param function_name custom function name
 */
function run_function_by_function_name(function_name, data){
	var fn = window[function_name];
	if(function_name != '' && typeof fn === 'function'){
		return fn(data);
	}
}

/**
 * @param sortList sortList
 * @param sortKey sortKey
 * @param sortBy 'asc' or 'desc'
 * @returns sorted list
 */
function list_sort(sort_list, sort_key, sort_by) {
	if (sort_by.toLowerCase() == 'asc') {
		sort_list.sort(function(a, b) {
			if(sort_key == 'name'){
	            if(a[sort_key] === ''){ // 이름이 없을 경우 아이디를 이름으로 지정
	            	a[sort_key] = a['id'].split('@')[0];
	            }
	            if(b[sort_key] === ''){ // 이름이 없을 경우 아이디를 이름으로 지정
	            	b[sort_key] = b['id'].split('@')[0];
	            }
			}
			return a[sort_key] < b[sort_key] ? -1 : a[sort_key] > b[sort_key] ? 1 : 0;
		});
	} else if (sort_by.toLowerCase() == 'desc') {
		sort_list.sort(function(a, b) {
			if(sort_key == 'name'){
	            if(a[sort_key] === ''){ // 이름이 없을 경우 아이디를 이름으로 지정
	            	a[sort_key] = a['id'].split('@')[0];
	            }
	            if(b[sort_key] === ''){ // 이름이 없을 경우 아이디를 이름으로 지정
	            	b[sort_key] = b['id'].split('@')[0];
	            }
			}
			return a[sort_key] > b[sort_key] ? -1 : a[sort_key] < b[sort_key] ? 1 : 0;
		});
	}
	return sort_list;
};

function isKorean(word){
	var check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
	return check.test(word);
}

function getKoreanInitial(str) {
	var chosung = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
	var result = "";
	for(var i = 0; i < str.length; i++) {
		code = str.charCodeAt(i)-44032;
		if(code>-1 && code<11172) result += chosung[Math.floor(code/588)];
	}
	return result;
}

var before_initial ='';
var rowIndex = 0;
var list_drawer = {
	targetSectionId : '',
	targetUlClass : '',
	lastUsedFunctionName : new Map(),
	listDatas : new Map(),
	init : function(map_key, sort_key, initial_create_function_name, unordered_list_function_name, row_create_function_name){
		this.drawList(map_key, sort_key, 'asc', initial_create_function_name, unordered_list_function_name, row_create_function_name, '');
	},
	addElementByFunction : function(function_name, data){
		$(this.targetSectionId).append(run_function_by_function_name(function_name, data));
	},
	addRow : function(function_name,data){
		$(this.targetUlClass+':last-child').append(run_function_by_function_name(function_name, data));
	},
	drawList : function(map_key, sort_key, sort_by, initial_create_function_name, unordered_list_function_name, row_create_function_name, search_function_name){
		var _this = this;
		var isSearch = typeof window[search_function_name] === 'function';
		
		list_drawer.clear();
		var drawer_data = this.listDatas.get(map_key);
		drawer_data = list_sort(drawer_data, sort_key, sort_by);
		if(isSearch){
			drawer_data = run_function_by_function_name(search_function_name, drawer_data);
		}
		
		before_initial = '';
		rowIndex = 0;
		$.each(drawer_data, function(idx, val){
			if(!isSearch){
				_this.addElementByFunction( initial_create_function_name,val);
				_this.addElementByFunction( unordered_list_function_name,val);
			}
			_this.addRow(row_create_function_name,val);
		});
		this.lastUserFunctionSetting(initial_create_function_name, unordered_list_function_name, row_create_function_name, search_function_name);
	},
	rowClickEvent : function(type){
		$('.'+type+'Area').off('click').on('click', function() {
			var info_id = '';
			if(type == 'member'){
				info_id = $(this).find('dd a').text();
			}else if(type == 'group' ){
				info_id = $(this).parent().find('.checkRow').attr('id');
			}
			
			location.href = './m_'+type+'_info.html?'+type+'_id=' + info_id;
		});
	},
	lastUserFunctionSetting : function(initial_create_function_name, unordered_list_function_name, row_create_function_name, search_function_name){
		this.lastUsedFunctionName.set('initial', initial_create_function_name);
		this.lastUsedFunctionName.set('ul', unordered_list_function_name);
		this.lastUsedFunctionName.set('row', row_create_function_name);
		this.lastUsedFunctionName.set('search', search_function_name);
	},
	clear : function(){
		$(this.targetSectionId).empty();
	}
};
