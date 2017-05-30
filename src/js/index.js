//历史纪录
function historyshow() {
	var address = document.getElementById("history").getElementsByTagName("ul")[0];
	var historyBg = "";
	if(localStorage.historyBg) {
		var arr = localStorage.historyBg.split(",");
		var num = arr.length - 27;
		if(arr.length - 27 >= 0) {
			for(var i = num; i < arr.length; i++) {
				historyBg += "<li><img src='" + arr[i] + "'></li>";
			}
		} else {
			for(var i = 0; i < arr.length; i++) {
				historyBg += "<li><img src='" + arr[i] + "'></li>";
			}
			for(var j = 0; j < Math.abs(num); j++) {
				historyBg += "<li></li>";
			}
		}
	}
	address.innerHTML = historyBg;
	var oImg = address.getElementsByTagName("img");
	for(var i = 0; i < oImg.length; i++) {
		(function(num) {
			oImg[num].onclick = function() {
				changeBg(arr[num], 0);
				historyshow();
			}
		})(i)
	}
}

BgChange.prototype.historyshow = historyshow;
//查询
var oSearch = document.getElementById("search");
//var oCamBtn = document.getElementById("picsearch");
//oCamBtn.onclick = function() {
//	searchChange(1);
//};
//var oCloseSearch = document.getElementById("closeSearch");
//oCloseSearch.onclick = function() {
//	searchChange(2);
//}
function searchChange(value) {
	if(value == 1) {
		if(localStorage.IndexStyle == 1) {
			oSearch.className = "searchChange newsearchChange";
			oSearch.getElementsByClassName("button")[0].innerHTML = "<img src='img/camera_newindex_layer_cc6dffd.png'/>";
		} else {
			oSearch.className = "searchChange";
			oSearch.getElementsByClassName("button")[0].innerHTML = "<img src='img/camera_layer_dc17de8.png'/>";
		}
	} else if(value == 2) {
		if(localStorage.IndexStyle == 1) {
			oSearch.className = "newsearchChange";
			oSearch.getElementsByClassName("button")[0].innerHTML = "百度一下";
		} else {
			oSearch.className = "";
			oSearch.getElementsByClassName("button")[0].innerHTML = "百度一下";
		}
	}
}
var NewsNumber = document.getElementById("newsNumber");
var cleanNews = document.getElementById("cleanNews");
cleanNews.onclick = function() {
	localStorage.newsNumber = 0;
	showNewsNumber();
}

function showNewsNumber() {
	if(localStorage.newsNumber != 0) {
		NewsNumber.innerHTML = " <span>百度贴吧</span>您有<span>" + localStorage.newsNumber + "条</span>新回复，快去查看吧";
		cleanNews.className = "";
	} else {
		NewsNumber.innerHTML = "您目前没有新消息";
		cleanNews.className = "noNews";
	}
}
document.getElementById("changbk").getElementsByTagName("a")[0].onclick = function() {
	document.getElementById("changebody").className = "activeChangeBody";
}
document.getElementById("news").onclick = function() {
	this.getElementsByClassName("news")[0].style.display = "block";
	showNewsNumber();
}
document.getElementById("close").onclick = function() {
	document.getElementById("changebody").className = "";
};
document.onclick = function(event) {
	var e = event || window.event;
	var elem = e.target || e.srcElement;
	while(elem) {
		if(elem.id == "news" || elem.id == "changbk" || elem.id == "search") {
			return;
		}
		elem = elem.parentNode;
	}
	document.getElementsByClassName("news")[0].style.display = "none";
	document.getElementById("changebody").className = null;
	searchChange(2);
}
//改变背景
function changeBg(pic, value) {
	var articleBG = document.getElementById("bgarticle");
	var oLoge = document.getElementById("logo");
	var oHeader = document.getElementsByTagName("header")[0];
	if(value == 3) {
		localStorage.removeItem("nowBg");
		articleBG.style.backgroundImage = "";
		oLoge.src = "img/bd_logo1.png";
		//样式更换
		oHeader.className = "";
		oSearch.className = "";
		oSearch.getElementsByClassName("button")[0].innerHTML = "百度一下";
		document.getElementsByClassName("blackbg")[0].style.display = "none";
		localStorage.IndexStyle = 0;
	} else {
		localStorage.nowBg = pic;
		if(value == 1) {
			if(localStorage.historyBg) {
				localStorage.historyBg = pic + "," + localStorage.historyBg;
			} else {
				localStorage.historyBg = pic;
			}
		}
		articleBG.style.background = "url('" + pic + "')";
		oLoge.src = "img/bd_logo2.png";
		//样式更换
		oHeader.className = "newBg";
		localStorage.IndexStyle = 1;
		document.getElementById("search").className = "newsearchChange";
		document.getElementsByClassName("blackbg")[0].style.display = "block";
	}
}
var showBgPic = document.getElementsByClassName("bodyshow")[0];

function BgChange(pic) {
	this.obj = showBgPic;
	this.pic = pic;
	this.num = null;
	this.oBox = null;
}
BgChange.prototype.addMinBg = function() {
	var article = "";
	for(var j = 0; j < this.pic.length; j++) {
		if(j % 12 == 0) {
			article += "<div class = 'imgshow'>";
		}
		if(j / 6 < 1) {
			if(j % 6 == 0) {
				article += "<ul><li><p></p><a>" + this.pic[j] + "</a><img alt=" + this.pic[j] + " src = 'backgroundImg/" + "max-" + this.pic[j] + ".jpg'></li>"
			} else if(j % 6 == 5) {
				article += "<li><p></p><a>" + this.pic[j] + "</a><img alt=" + this.pic[j] + " src = 'backgroundImg/" + "min-" + this.pic[j] + ".jpg'></li></ul>"
			} else {
				article += "<li><p></p><a>" + this.pic[j] + "</a><img alt=" + this.pic[j] + " src = 'backgroundImg/" + "min-" + this.pic[j] + ".jpg'></li>"
			}
		} else if(j / 6 >= 1) {
			if(j % 6 == 0) {
				article += "<ul><li><p></p><a>" + this.pic[j] + "</a><img alt=" + this.pic[j] + " src = 'backgroundImg/" + "max-" + this.pic[j] + ".jpg'></li>"
			} else if(j % 6 == 5) {
				article += "<li><p></p><a>" + this.pic[j] + "</a><img alt=" + this.pic[j] + " src = 'backgroundImg/" + "min-" + this.pic[j] + ".jpg'></li></ul>"
			} else if(j % 6 == 3) {
				article += "<li><p></p><a>" + this.pic[j] + "</a><img alt=" + this.pic[j] + " src = 'backgroundImg/" + "max-" + this.pic[j] + ".jpg'></li>"
			} else {
				article += "<li><p></p><a>" + this.pic[j] + "</a><img alt=" + this.pic[j] + " src = 'backgroundImg/" + "min-" + this.pic[j] + ".jpg'></li>"
			}
		}
		if(j % 12 == 11 || j == this.pic.length) {
			article += "</div>";
		}
	}
	this.obj.getElementsByClassName("imgPlace")[0].innerHTML = article;
	document.getElementsByClassName("imgshow")[0].style.display = "block";
	this.oBox = this.obj.getElementsByClassName("imgshow");

}
BgChange.prototype.showBoxPic = function() {
	var oShowPic = document.getElementById("showDiv");
	var oBgPic = document.getElementById("showBg");
	var oBox = this.oBox;
	for(var i = 0; i < oBox.length; i++) {
		var oList = oBox[i].getElementsByTagName("li");
		for(var j = 0; j < oList.length; j++) {
			//示例图更换
			oList[j].addEventListener("mousemove", function() {
				oBgPic.style.backgroundPositionX = 0;
				oShowPic.style.backgroundImage = 'url("backgroundImg/max-' + this.getElementsByTagName("img")[0].alt + '.jpg")';
			});
			//背景更换
			oList[j].addEventListener("click", function() {
				changeBg("backgroundImg/" + this.getElementsByTagName("img")[0].alt + ".jpg", 1);
				historyshow();
			});
		}
		//示例图样式更换
		oBox[i].addEventListener("mouseout", function() {
			oBgPic.style.backgroundPositionX = "270px";
			oShowPic.style.backgroundImage = '';
		});
	}
}
BgChange.prototype.displayBox = displayBox;

function displayBox(oBox, oli) {
	for(var i = 0; i < oBox.length; i++) {
		oBox[i].style.display = "none";
	}
	for(var j = 0; j < oli.length; j++) {
		oli[j].className = "";
	}
}
BgChange.prototype.changePicList = function() {
	var oList = this.obj.getElementsByClassName("changelist")[0].getElementsByTagName("ul")[0];
	var Number = 0;
	this.num = parseInt(this.pic.length / 12) + 1;
	var article = "";
	article += "<p><</p>";
	for(var i = 0; i < this.num; i++) {
		if(i == 0) {
			article += "<li class = 'chioce'></li>";
		} else {
			article += "<li></li>";
		}
	}
	article += "<p>></p>";
	oList.innerHTML = article;
	var oBox = this.oBox;
	var oli = oList.getElementsByTagName("li");
	var oNextPrev = oList.getElementsByTagName("p");
	oNextPrev[0].addEventListener("click", function() {
		displayBox(oBox, oli);
		Number--;
		if(Number < 0) {
			Number = 0;
		}
		oli[Number].className = "chioce";
		oBox[Number].style.display = "block";
	})
	oNextPrev[1].addEventListener("click", function() {
		displayBox(oBox, oli);
		Number++;
		if(Number > oBox.length - 1) {
			Number = oBox.length - 1;
		}
		oli[Number].className = "chioce";
		oBox[Number].style.display = "block";
	})
	for(var i = 0; i < oli.length; i++) {
		(function(i) {
			oli[i].addEventListener("click", function() {
				displayBox(oBox, oli);
				oli[i].className = "chioce";
				oBox[i].style.display = "block";
			})
		})(i)
	}
}
BgChange.prototype.customBg = function() {
	this.obj.getElementsByClassName("changelist")[0].getElementsByTagName("ul")[0].innerHTML = "";
	var article = '<div class = "imgshow" style = "display:block"><a href="javascript:;" class="file">+从你的计算机中选择图片<input type="file" name="" id="filePic"></a>';
	article += '<div class="tip">仅支持JPG,PNG图片，图片尺寸不小于1600*1000像素，10M以内（高质量图片效果更佳）</div></div>';
	this.obj.getElementsByClassName("imgPlace")[0].innerHTML = article;
	document.getElementById("filePic").addEventListener("change", function() {
		var srcs = getObjectURL(this.files[0]);
		var oShowPic = document.getElementById("showDiv");
		oShowPic.style.backgroundImage = 'url("' + srcs + '")';
		changeBg(srcs, 1);
		historyshow();
	})
}

function getObjectURL(file) {
	var url = null;
	if(window.createObjectURL != undefined) {
		url = window.createObjectURL(file)
	} else if(window.URL != undefined) {
		url = window.URL.createObjectURL(file)
	} else if(window.webkitURL != undefined) {
		url = window.webkitURL.createObjectURL(file)
	}
	return url
};
var oNav = document.getElementById("changebody").getElementsByClassName("title")[0].getElementsByTagName("li");
var pic = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8];
var p = new BgChange(pic1);
p.addMinBg();
p.changePicList();
p.showBoxPic();
p.historyshow();
for(var i = 0; i < pic.length; i++) {
	(function(i) {
		oNav[i].addEventListener("click", function() {
			document.getElementById("history").style.display = "none";
			var p = new BgChange(pic[i]);
			p.addMinBg();
			p.changePicList();
			p.showBoxPic();
		});
	})(i)
}
//alert(pic[7]);
oNav[8].addEventListener("click", function() {
	document.getElementById("history").style.display = "none";
	var p = new BgChange();
	p.customBg();
})
oNav[9].addEventListener("click", function() {
	document.getElementById("history").style.display = "block";
})
document.getElementById("returnBg").addEventListener("click", function() {
	changeBg("", 3);
})
