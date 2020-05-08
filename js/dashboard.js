//var urlServer = 'http://192.168.0.6/dashboard1.2/classes/';
var urlServer = 'http://localhost/dashboard/classes/';
var x = new XMLHttpRequest();


function getTemperature()
{
	//petition
	x.open('GET', urlServer + 'gettemperature.php', true);
	x.send();
    
	//event handler
	x.onreadystatechange = function()
	{
		//check status
		if (x.readyState == 4 & x.status == 200)
		{
			//read response
			var data = x.responseText;
            var JSONdata = JSON.parse(data);
            //console.log(JSONdata);
            if (JSONdata.status == 0)
			{
                var readings = JSONdata.plant;
                if (readings.length == 10)
                {
                    for(var i = 0; i < readings.length; i++)
                    {
                            var datetime = JSONdata.plant[i].date;
                            var time = JSONdata.plant[i].date.split(' ');
                            var temp = JSONdata.plant[i].temperature;
                            var moisture = JSONdata.plant[i].moisture;
                            var humidity = JSONdata.plant[i].humidity;

                            //column temperature
                            var c = document.getElementById('column' + i);
                            var height = temp * 2; 
                            var y = 90 - height;

                            c.style.height = height +'%';


                            c.style.y = y + '%';
                            //value temperature
                            var v = document.getElementById('value' + i);
                            v.innerHTML = temp + '&deg;';
                            v.setAttribute = (y - 1) + '%';
                        
                            if (temp >=5 && temp <=22 )
                            {
                                c.style.fill = '#ffff00';
                                c.style.stroke = '#030300';   
                                
                                v.style.fill = '#000000';
                            }
                            if (temp >=22 && temp <=30 )
                            {
                                c.style.fill = '#66b7f7';
                                c.style.stroke = '#0D47A1'; 
                                
                                v.style.fill = '#0D47A1';
                            }
                            if (temp >=30 )
                            {
                                c.style.fill = '#f52929';
                                c.style.stroke = '#000000'; 
                                
                                v.style.fill = '#670000';
                            }

                            //column moisture
                            var cm = document.getElementById('columnm' + i);
                            var heightm = moisture/1.27; 
                            var ym = 90 - heightm;

                            cm.style.height = heightm +'%';


                            cm.style.y = ym + '%';
                            //value moisture
                            var vm = document.getElementById('valuem' + i);
                            vm.innerHTML = moisture;
                            vm.setAttribute = (ym - 1) + '%';
                            if (moisture >=0 && moisture <=30 )
                            {
                                cm.style.fill = '#ffff00';
                                cm.style.stroke = '#030300'; 
                                
                                vm.style.fill = '#000000';
                            }
                            if (moisture >=31 && moisture <=70 )
                            {
                                cm.style.fill = '#66b7f7';
                                cm.style.stroke = '#0D47A1';  
                                
                                vm.style.fill = '#0D47A1';
                            }
                            if (moisture >=71 )
                            {
                                cm.style.fill = '#f52929';
                                cm.style.stroke = '#000000';   
                                
                                vm.style.fill = '#670000';
                            }

                            //Soil mosture

                            //soil moisture
                            var cs = document.getElementById('columns' + i);
                            var heights = humidity/13; 
                            var ys = 90- heights;

                            cs.style.height = heights +'%';


                            cs.style.y = ys + '%';
                            //soil moisture
                            var vs = document.getElementById('values' + i);
                            vs.innerHTML = humidity;
                            vs.setAttribute = (ys - 1) + '%';
                            if (humidity >=1 && humidity <=30 )
                            {
                                cs.style.fill = '#ffff00';
                                cs.style.stroke = '#030300'; 
                                
                                vs.style.fill = '#000000';
                            }
                            if (humidity >=31 && humidity <=200 )
                            {
                                cs.style.fill = '#66b7f7';
                                
                                cs.style.stroke = '#0D47A1';  
                                
                                vs.style.fill = '#0D47A1';
                            }
                            if (humidity >=201 )
                            {
                                cm.style.fill = '#f52929';
                                cm.style.stroke = '#000000';   
                                
                                vs.style.fill = '#670000';
                            }
                            //time temperature
                            var t = document.getElementById('time' + i);
                            t.innerHTML = time[1];

                            //time moisture
                            var tm = document.getElementById('timem' + i);
                            tm.innerHTML = time[1];

                            //time soil
                            var ts = document.getElementById('times' + i);
                            ts.innerHTML = time[1];

                    }
                }
               init();
			}
			else
			{
				alert('error');
			}
		}
	}
}
function init()
{
    setInterval('getTemperature()', 1000);
}
/*

moisture sensor values
0 - 30 seco 
31-70 humedo
70 - 95 en agua

*/
function showTemperature()
{
    var chartTemp = document.getElementById('chart');
    var chartMoisture = document.getElementById('chart2');
    chartMoisture.style.display = "none";
    chartTemp.style.display = "inline-block";
    initTemperature();
}
function showMoisture()
{
    var chartTemp = document.getElementById('chart');
    var chartMoisture = document.getElementById('chart2');
    chartTemp.style.display = "none";
    chartMoisture.style.display = "inline-block";
    initMoisture();
}

// function both()
// {
//     var chartTemp = document.getElementById('chart');
//     var chartMoisture = document.getElementById('chart2');
//     chartTemp.style.display = "inline-block";
//     chartMoisture.style.display = "inline-block";
//     init();
// }
// function getTemperatureOnly()
// {
// 	//petition
// 	x.open('GET', urlServer + 'gettemperature.php', true);
// 	x.send();
    
// 	//event handler
// 	x.onreadystatechange = function()
// 	{
// 		//check status
// 		if (x.readyState == 4 & x.status == 200)
// 		{
// 			//read response
// 			var data = x.responseText;
//             var JSONdata = JSON.parse(data);
//             //console.log(JSONdata);
//             if (JSONdata.status == 0)
// 			{
//                 var readings = JSONdata.plant;
//                 if (readings.length == 10)
//                 {
//                     for(var i = 0; i < readings.length; i++)
//                     {
//                             var datetime = JSONdata.plant[i].date;
//                             var time = JSONdata.plant[i].date.split(' ');
//                             var temp = JSONdata.plant[i].temperature;

//                             //column temperature
//                             var c = document.getElementById('column' + i);
//                             var height = temp * 2; 
//                             var y = 90 - height;

//                             c.style.height = height +'%';


//                             c.style.y = y + '%';
//                             //value temperature
//                             var v = document.getElementById('value' + i);
//                             v.innerHTML = temp + '&deg;';
//                             v.setAttribute = (y - 1) + '%';
                        
//                             if (temp >=0 && temp <=20 )
//                             {
//                                 c.style.fill = '#ffff00';
//                                 c.style.stroke = '#030300';   
                                
//                                 v.style.fill = '#000000';
//                             }
//                             if (temp >=21 && temp <=30 )
//                             {
//                                 c.style.fill = '#66b7f7';
//                                 c.style.stroke = '#0D47A1'; 
                                
//                                 v.style.fill = '#0D47A1';
//                             }
//                             if (temp >=30 )
//                             {
//                                 c.style.fill = '#f52929';
//                                 c.style.stroke = '#000000'; 
                                
//                                 v.style.fill = '#670000';
//                             }

//                             //time temperature
//                             var t = document.getElementById('time' + i);
//                             t.innerHTML = time[1];
//                     }
//                 }
//                initTemperature();
// 			}
// 			else
// 			{
// 				alert('error');
// 			}
// 		}
// 	}
// }
// function getMoistureOnly()
// {
// 	//petition
// 	x.open('GET', urlServer + 'gettemperature.php', true);
// 	x.send();
    
// 	//event handler
// 	x.onreadystatechange = function()
// 	{
// 		//check status
// 		if (x.readyState == 4 & x.status == 200)
// 		{
// 			//read response
// 			var data = x.responseText;
//             var JSONdata = JSON.parse(data);
//             //console.log(JSONdata);
//             if (JSONdata.status == 0)
// 			{
//                 var readings = JSONdata.plant;
//                 if (readings.length == 10)
//                 {
//                     for(var i = 0; i < readings.length; i++)
//                     {
//                             var datetime = JSONdata.plant[i].date;
//                             var time = JSONdata.plant[i].date.split(' ');
//                             var moisture = JSONdata.plant[i].moisture;

//                             //column moisture
//                             var cm = document.getElementById('columnm' + i);
//                             var heightm = moisture/1.27; 
//                             var ym = 90 - heightm;

//                             cm.style.height = heightm +'%';


//                             cm.style.y = ym + '%';
//                             //value moisture
//                             var vm = document.getElementById('valuem' + i);
//                             vm.innerHTML = moisture;
//                             vm.setAttribute = (ym - 1) + '%';
//                             if (moisture >=0 && moisture <=30 )
//                             {
//                                 cm.style.fill = '#ffff00';
//                                 cm.style.stroke = '#030300'; 
                                
//                                 vm.style.fill = '#000000';
//                             }
//                             if (moisture >=31 && moisture <=70 )
//                             {
//                                 cm.style.fill = '#66b7f7';
//                                 cm.style.stroke = '#0D47A1';  
                                
//                                 vm.style.fill = '#0D47A1';
//                             }
//                             if (moisture >=71 )
//                             {
//                                 cm.style.fill = '#f52929';
//                                 cm.style.stroke = '#000000';   
                                
//                                 vm.style.fill = '#670000';
//                             }

//                             //time moisture
//                             var tm = document.getElementById('timem' + i);
//                             tm.innerHTML = time[1];

//                     }
//                 }
//                init();
// 			}
// 			else
// 			{
// 				alert('error');
// 			}
// 		}
// 	}
// }
function initTemperature()
{
    setInterval('getTemperatureOnly()', 1000);
}
function initMoisture()
{
    setInterval('getMoistureOnly()', 1000);
}

