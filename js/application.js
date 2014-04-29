		$(document).ready(function(){
		//////
		if($(".ltIE9").length>0)
		{
			XHR = createXMLHttpRequest();
			XHR.open("GET","newVersion.html",true);
			XHR.onreadystatechange = handleStateChange2;
			XHR.send(null);
		}
		else
		{}
		//////
			$('#header').addClass('flex');
			textChange();
		});

		function handleStateChange2()
		{
			if(XHR.readyState == 4)
			{
				if(XHR.status == 200)
				{
					document.getElementById("concent").innerHTML = XHR.responseText;
				}
				else
				{
					alert("文件打开错误");
				}
			}
		}
//////////滚动监视
		var autoSpy=true;	//标识是否自动监视，如果是手动点击，则不进行监视
		$(window).scroll(function(){
		var top=$(window).scrollTop();
		if(top>=600){
			$('#header').addClass('fixed');
			$('#header').removeClass('flex');
			$('#showGround').addClass('move');
			$('#mail').addClass('move');
			$('#foot').addClass('move');

		}
		else{
			$('#header').addClass('flex');
			$('#header').removeClass('fixed');
			$('#showGround').removeClass('move');
			$('#mail').removeClass('move');
			$('#foot').removeClass('move');
		}

		//导航条activ滚动监听
		if(autoSpy==true)
		{
			if(top >= $("#boardEvent").offset().top-105)
			{
				$("#navIntroduce").removeClass("active");
				$("#navMumbers").removeClass("active");
				$("#navOldPeople").removeClass("active");
				$("#navEvent").addClass("active");
			}
			else if(top >= $("#boardOldPeople").offset().top-105)
			{
				$("#navIntroduce").removeClass("active");
				$("#navMumbers").removeClass("active");
				$("#navOldPeople").addClass("active");
				$("#navEvent").removeClass("active");
			}
			else if(top >= $("#boardMumbers").offset().top-105)
			{
				$("#navIntroduce").removeClass("active");
				$("#navMumbers").addClass("active");
				$("#navOldPeople").removeClass("active");
				$("#navEvent").removeClass("active");
			}
			else if(top >= $("#boardIntroduce").offset().top-105)
			{
				$("#navIntroduce").addClass("active");
				$("#navMumbers").removeClass("active");
				$("#navOldPeople").removeClass("active");
				$("#navEvent").removeClass("active");
			}
		}
		//'''''
		});
//////////////////////////////////////版块切换
		var nowNumber=5;	//用来记录当前版块的序号 初始值为0，目的是防止首次加载时自动滚到对应的位置
		var mySwitch=2;	//用来记录是在“关于我们”还是“加入我们”模块
		var sliding=false;	//用来标识是否正在滚动，防止滚个不停
		//版块切换动作

		$("#navIntroduce").click(function(){
			autoSpy=false;
			if(sliding==false)
			{
				$("li").removeClass("active");
				$(this).addClass("active");
			}
			//上下滚动
			if(mySwitch==1 && sliding==false)
			{
				sliding=true;
				$("html,body").animate({scrollTop: $("#boardIntroduce").offset().top-100},1000,function(){autoSpy=true;sliding=false;});
			}
			else if(mySwitch==2)
			{
				slideMove(1);
				//$("html,body").animate({scrollTop: $("#boardIntroduce").offset().top-100},1000);
				//在这里进行滚动会出现一个问题，就是这句上一句里面会执行一个动画，再ajax加载，而它们没执行完毕就会执行上面的滚动语句（这应该是javascript的特点，可以同时进行多个动作），以至于滚动无效。经过思考，可以把这句放在ajax过程中，这样就可以保证是在加载完成后滚动。
				mySwitch=1;
			}
		});

		$("#navEvent").click(function(){
			autoSpy=false;
			if(sliding==false)
			{
				$("li").removeClass("active");
				$(this).addClass("active");
			}
			//上下滚动
			if(mySwitch==1 && sliding==false)
			{
				sliding=true;
				$("html,body").animate({scrollTop: $("#boardEvent").offset().top-100},1000,function(){autoSpy=true;sliding=false;});
			}
			else if(mySwitch==2)
			{
				slideMove(2);
				//$("html,body").animate({scrollTop: $("#boardEvent").offset().top-100},1000);
				mySwitch=1;
			}
		});

		$("#navOldPeople").click(function(){
			autoSpy=false;
			if(sliding==false)
			{
				$("li").removeClass("active");
				$(this).addClass("active");
			}
			//上下滚动
			if(mySwitch==1 && sliding==false)
			{
				sliding=true;
				$("html,body").animate({scrollTop: $("#boardOldPeople").offset().top-100},1000,function(){autoSpy=true;sliding=false;});
			}
			else if(mySwitch==2)
			{
				slideMove(3);
				//$("html,body").animate({scrollTop: $("#boardOldPeople").offset().top-100},1000);
				mySwitch=1;
			}
		});

		$("#navMumbers").click(function(){
			autoSpy=false;
			if(sliding==false)
			{
				$("li").removeClass("active");
				$(this).addClass("active");
			}
			//上下滚动
			if(mySwitch==1 && sliding==false)
			{
				sliding=true;
				$("html,body").animate({scrollTop: $("#boardMumbers").offset().top-100},1000,function(){autoSpy=true;sliding=false;});
			}
			else if(mySwitch==2)
			{
				slideMove(4);
				//$("html,body").animate({scrollTop: $("#boardMumbers").offset().top-100},1000);
				mySwitch=1;
			}
		});

		$("#navJoin").click(function(){
			if(sliding==false)
			{
				autoSpy=false;
				$("li").removeClass("active");
				$(this).addClass("active");
				autoSpy=false;
				$('body,html').animate({scrollTop:600},700);
				if(mySwitch==1)
				{
					slideMove(5);
				}
				mySwitch=2;
			}
		});

		//版块切换函数
		function slideMove(number)
		{
			//number用来记录想要显示的版块序号
			if($(window).scrollTop()>=600)
			{
				sliding=true;
				if(number > nowNumber)	//整体向左滑动
				{
					nowNumber=number;
					$("#showGround").animate(
						{
							left:-document.documentElement.clientWidth
						},
						500,	//speed
						function(){
						changeNew();
						sliding=false;
						}
					);
				}
				else if(number < nowNumber)	//整体向右滑动
				{
					//alert(document.documentElement.clientWidth);
					nowNumber=number;
					$("#showGround").animate(
						{
							left:document.documentElement.clientWidth,
							width:'0px'
						},
						500,	//speed
						function(){
						changeNew();
						sliding=false;
						}
					);
				}
			}
			else
			{
				nowNumber=number;
				changeNew();
			}
		}

		function changeNew()
		{
			//$("#showGround").remove();	//删除原来div

			//Ajax请求数据
			switch(nowNumber)
			{
			case 1:
				startRequest("introduce.html");
				break;
			case 2:
				startRequest("introduce.html");
				break;
			case 3:
				startRequest("introduce.html");
				break;
			case 4:
				startRequest("introduce.html");
				break;
			case 5:
				startRequest("joinus.html");
				break;
			}

			//$('body,html').animate({scrollTop:601},1);
			//$('body,html').animate({scrollTop:600},1);
		}

		//Ajax模块
		function createXMLHttpRequest()
		{
			if(window.XMLHttpRequest)
			return new XMLHttpRequest();
			else if(window.ActiveXObject)
			{
				var XMLVersions=["MSXML2.XMLHttp.5.0","MSXML2.XMLHttp.4.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp","Microsoft.XMLHttp"];
				for(var i=0;i<XMLVersions.length;i++)
				{
					try
					{
						return new ActiveXObject(XMLVersions[i]);
					}
					catch(error){}
				}
			}
			throw new error("您的浏览器不支持XMLHttpRequest对象");
		}

		var XHR=null;
		function startRequest(filename)
		{
			XHR = createXMLHttpRequest();
			XHR.open("GET",filename,true);
			XHR.onreadystatechange = handleStateChange;
			XHR.send(null);
		}

		function handleStateChange()
		{
			if(XHR.readyState == 4)
			{
				if(XHR.status == 200)
				{
					document.getElementById("addPlace").innerHTML = XHR.responseText;
					if(nowNumber>=1 && nowNumber<=4 && $(window).scrollTop()>=600)
					{
						$('#showGround').addClass('move');
					}
					switch(nowNumber)
					{
					case 1:
						$("html,body").animate({scrollTop: $("#boardIntroduce").offset().top-100},1000,function(){autoSpy=true});
						//$('#showGround').addClass('move');
						//$('#mail').addClass('move');
						break;
					case 2:
						$("html,body").animate({scrollTop: $("#boardEvent").offset().top-100},1000,function(){autoSpy=true});
						break;
					case 3:
						$("html,body").animate({scrollTop: $("#boardOldPeople").offset().top-100},1000,function(){autoSpy=true});
						break;
					case 4:
						$("html,body").animate({scrollTop: $("#boardMumbers").offset().top-100},1000,function(){autoSpy=true});
						break;
					case 5:
						textChange();
						break;
					}
				}
				else
				{
					alert("文件打开错误");
				}
			}
		}
		//'

		$(".carousel").carousel({
		  interval: 3500
		})
/////////////////////////////////文字变换动画
	var textMark=1;	//用来标记应该显示什么内容
	function textChange()
	{
		$("#changedText").animate(
			{
				marginLeft:'50px',
				opacity:'0.0'
			},
			600,
			function()
			{
				textMark=textMark+1;
				if(textMark==6)
					textMark=1;
				switch(textMark)
				{
				case 1:
					document.getElementById("changedText").innerHTML="inspirational designs";
					break;
				case 2:
					document.getElementById("changedText").innerHTML="amazing applications";
					break;
				case 3:
					document.getElementById("changedText").innerHTML="excellent web sites";
					break;
				case 4:
					document.getElementById("changedText").innerHTML="brilliant mobile apps";
					break;
				case 5:
					document.getElementById("changedText").innerHTML="anything you desire";
					break;
				}
				$("#changedText").animate(
					{
						marginLeft:'0px',
						opacity:'1.0'
					},
					600,
					function()
					{
						setTimeout(function(){textChange()},3000);
					}
				);
			}
		);
	}
