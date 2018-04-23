var headerUI = {
	_menuBtn : '#menuBtn',
	_homeBtn : '#homeBtn',
	_reloadBtn : '#reloadBtn',
	_moreBtn : '#moreBtn',
	_more_deleteBtn : '#more_delete',
	_more_sortBtn : '#more_sort',
	init : function(){
		this.addEvents();
	},
	addEvents : function(){
		var _this =  this;
		//common event
		$(document).click(function(e) {
			if(!$(e.target).hasClass("moreArea") &&  !$(e.target).hasClass("ic_more") ) { 
				$('#moreArea').addClass('ct_hide');
			}
		});
		$(this._menuBtn).on('click', function(){
			
		});
		$(this._homeBtn).on('click', function(){
			
		});
		
		//more
		$(this._moreBtn).on('click', function(){
			if($('#moreArea').hasClass('ct_hide')){
				$('#moreArea').removeClass('ct_hide');
			}else{
				$('#moreArea').addClass('ct_hide');
			}
		});
		
		$(this._more_deleteBtn).on('click',function(){
			if($('#wrapper').hasClass('selMode')){
				$('#wrapper').removeClass('selMode');
			}else{
				$('#wrapper').addClass('selMode');
			}
		});
		
		$(this._more_sortBtn).on('click', function(){
			$('#sort_modal').removeClass('ct_hide');
			$('#moreArea').addClass('ct_hide');
		});
	}
};

var searchUI = {
	_search_openBtn : '#searchOpenBtn',
	_search_startBtn : '#searchStartBtn',
	_search_cancelBtn : '#searchCancelBtn',
	_search_CloseBtn : '#searchCloseBtn',
	init : function(){
		this.addEvents();
	},
	addEvents : function(){
		//searchEvent
		$(this._search_openBtn).on('click', function(){
			$('.searchWrap').removeClass('ct_hide');
		});
		$('#searchKeyword').on('keyup', function(){
			var search_function_name = 'seachLogic';
			if($('#searchKeyword').val() == ''){
				search_function_name = '';
			}
			list_drawer.drawList($('.tabmenu li.on a').attr('id'), 'name', 'asc', list_drawer.lastUsedFunctionName.get('initial'), list_drawer.lastUsedFunctionName.get('ul'), list_drawer.lastUsedFunctionName.get('row'), search_function_name);
		});
		$(this._search_cancelBtn).on('click', function(){
			$('.searchWrap').addClass('ct_hide');
		});
		$(this._search_CloseBtn).on('click', function(){
			$('.searchWrap').addClass('ct_hide');
		});
	}
};

var tabMenu = {
	active : 'active',
	inactive : 'inactive',
	pending : 'invitation',
	group : 'group',
	init : function(){
		this.addEvents();
	},
	addEvents : function(){
		$('.tabmenu li').click(function(){
			var tab_id = $(this).find('a').attr('id');
			list_drawer.init(tab_id, 'name','addInitial', 'addUnorderedList', 'addListRow');
			list_drawer.rowClickEvent(tab_id);
			checkBoxAction.clear();
			sortUI.setOnClass('sortASC');
		});
	},
	drawCount : function(count_arr){
		$.each($('.new'),function(idx,val){
			if(count_arr[idx] == 0){
				$(val).addClass('nonData');
			}else{
				$(val).html(count_arr[idx]);
			}
		});
	}
};

var checkBoxAction =  {
	allCheckId : '#checkAll',
	checkBoxClass : '.checkRow',
	checkCount : '#chkCount',
	init : function(){
		checkBoxAction.allCheckClickEvent();
		checkBoxAction.checkBoxClickEvent();
	},
	allCheckClickEvent : function(){
		var _this = this;
		$(this.allCheckId).on('click', function(){
			if($(_this.allCheckId).prop('checked')){
				$(_this.checkBoxClass).each(function(){
					$(_this.checkBoxClass).prop('checked', true);
				});
			}else{
				$(_this.checkBoxClass).each(function(){
					$(_this.checkBoxClass).prop('checked', false);
				});
			}
			_this.checkBoxCount();
		});
	},
	checkBoxClickEvent : function(){
		var _this = this;
		$(this.checkBoxClass).off('click').on('click', function(){
			if($('input:checkbox[name="checkRow"]:checked').length == $('input:checkbox[name="checkRow"]').length){
				$(_this.allCheckId).prop('checked',true);
			}else{
				$(_this.allCheckId).prop('checked',false);
			}
			_this.checkBoxCount();
		});
	},
	checkBoxCount : function(){
		$(this.checkCount).html($('input:checkbox[name="checkRow"]:checked').length);
	},
	clear : function(){
		var _this = this;
		$(this.checkBoxClass).each(function(){
			$(_this.checkBoxClass).prop('checked', false);
		});
		$(_this.checkCount).html(0);
		$(_this.allCheckId).prop('checked',false);
	}
};

var deleteUI = {
	deleteType : '',
	cancelDeleteBtn : '#cancelDeleteBtn',
	deleteBtn : '#deleteBtn',
	deleteModal : '#delete_modal',
	deleteCancel : '#delete_cancel',
	deleteApproval : '#delete_approval',
	init : function(type){
		deleteType = type;
		this.addEvents();
	},
	addEvents : function(){
		var _this = this;
		$(this.cancelDeleteBtn).on('click',function(){
			$('#wrapper').removeClass('selMode');
		});
		$(this.deleteBtn).on('click',function(){
			$(_this.deleteModal).removeClass('ct_hide');
		});
		$(this.deleteCancel).on('click', function(){
			$(_this.deleteModal).addClass('ct_hide');
		});
		$(this.deleteApproval).on('click', function(){
			_this.deleteAction(_this.deleteType);
		});
	},
	deleteAction : function(type){
		var deleteList = [];
		$.each($('input:checkbox[name="checkRow"]:checked'), function(idx, val){
			if(deleteType == 'group'){
				deleteList.push($(val).attr('id'));
			}else if(deleteType == 'member'){
				deleteList.push($(val).parent().parent().find('dd a').text());
			}
			
			
		});   
		ajaxCall.deleteByList(deleteList);
	}
};

var sortUI = {
	sortList : '#sortList',
	sortASC : '#sortASC',
	sortDESC : '#sortDESC',
	sortCancel : '#sortCancel',
	sortModal : '#sort_modal',
	init : function(){
		this.addEvents();
	},
	addEvents : function(){
		var _this = this;
		$(_this.sortASC).on('click', function(){
			_this.setOnClass(_this.sortASC);
			list_drawer.drawList($('.tabmenu li.on a').attr('id'), 'name', 'asc', 'addInitial', 'addUnorderedList', 'addListRow', '');
		});
		$(_this.sortDESC).on('click', function(){
			_this.setOnClass(_this.sortDESC);
			list_drawer.drawList($('.tabmenu li.on a').attr('id'), 'name', 'desc', 'addInitial', 'addUnorderedList', 'addListRow', '');
		});
		$(_this.sortCancel).on('click', function(){
			$(_this.sortModal).addClass('ct_hide');
		});
	},
	setOnClass : function (element_id){
		$(this.sortList+' li.on').removeClass('on');
		$('#'+element_id).addClass('on');
		$(this.sortModal).addClass('ct_hide');
	}
};