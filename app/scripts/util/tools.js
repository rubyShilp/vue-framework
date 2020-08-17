//判断手机号
export  function isMobile(val){
     return /^1\d{10}$/.test(val)
//判断邮箱
export  function isEmail(val){
    return /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/.test(val);
}
//判断是否为邮箱或者手机号
export  function isMobileOrEmail(val){
    return isMobile(val) || isEmail(val);
}
//数字
export  function isNumber(val){
    return /^[0-9]*$/.test(val);
}
//由字母、数字组合
export  function isCombination(val){
    return /^(([a-z]+[0-9]+)|([0-9]+[a-z]+))[a-z0-9]*$/i.test(val);
}
//判断身份证
export function isIdCard(idCard){
    var vcity={ 11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",  
				            21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",  
				            33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",  
				            42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",  
				            51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",  
				            63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"  
				           }; 
					 idCard = idCard.toUpperCase();
					 if(!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(idCard))) {
						 return false;
					 }
					 var province = idCard.substr(0,2);  
				     if(vcity[province] == undefined)  {  
				    	 return false;
				     }   
					 
					 var len = idCard.length,re;
					 if(len == 15){
						 re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
							var arrSplit = idCard.match(re);
							var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/'+ arrSplit[4]);
							var bGoodDay;
							bGoodDay = (dtmBirth.getFullYear()== Number(arrSplit[2]))
									&& ((dtmBirth.getMonth() + 1) == Number(arrSplit[3]))
									&& (dtmBirth.getDate() == Number(arrSplit[4]));
							if (!bGoodDay) {
								return false;
							} else {
								var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5,8, 4, 2);
								var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4','3', '2');
								var nTemp = 0, i;
								idCard = idCard.substr(0, 6) + '19' + idCard.substr(6, idCard.length - 6);
								for (i = 0; i < 17; i++) {
									nTemp += idCard.substr(i, 1) * arrInt[i];
								}
								idCard += arrCh[nTemp % 11];
								return true;
							}
					 }
					 if(len == 18){
							re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
							var arrSplit = idCard.match(re);  
							var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/"+ arrSplit[4]);
							var bGoodDay;
							bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2]))
									&& ((dtmBirth.getMonth() + 1) == Number(arrSplit[3]))
									&& (dtmBirth.getDate() == Number(arrSplit[4]));
							if (!bGoodDay) {
								return false;
							} else {  
								var valnum;
								var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5,8, 4, 2);
								var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4','3', '2');
								var nTemp = 0, i;
								for (i = 0; i < 17; i++) {
									nTemp += idCard.substr(i, 1) * arrInt[i];
								}
								valnum = arrCh[nTemp % 11];
								if (valnum != idCard.substr(17, 1)) {
									return false;
								}
								return true;
							}
					 }
}