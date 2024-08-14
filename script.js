




var myPlot = document.getElementById('myMap')


var lon=terremotos.map(item => item.Lon);
var lat=terremotos.map(item => item.Lat);
var magnitud=terremotos.map(item => (item.Magnitud*5-28));

var data = [{
  
  type: 'choropleth',
  locations: ['CHL'],
  z: [5],
  zmin: 0,
  zmax: 10,
  hoverinfo: "skip",
  colorscale: [
              [0, 'rgb(255,255,255)'], [1, 'rgb(200,200,200)']
          ],
		  showscale:false,
   

},{
    type: 'scattergeo',
    mode: 'markers',
    lon: lon,
    lat: lat,
	cmax: 9,
	cmin: 6,
	hoverinfo: "none",
    marker: {
		color: magnitud,
        size: magnitud,
        colorscale: [ [0, 'rgb(255,255,255)'], [1, 'rgb(0,0,0)']],
        line: {
            color: 'black'
        }
    },
    name: ''
}];

var layout = {
    'geo': {
        'scope': 'south america',
        'resolution': 150,
		showland: true,
        landcolor: 'rgb(255, 255, 255)',
        subunitwidth: 1,
        countrywidth: 1,
        subunitcolor: 'rgb(255,255,255)',
        countrycolor: 'rgb(255,255,255)',
			
		lonaxis: { range: [-64,-76] },
		lataxis: { range: [-18, -59] }
	},
	autosize: false,
	width: 200,
	height: 800,
	margin: {
		l: 0,
		r: 0,
		b: 0,
		t: 0,
		pad: 0,
		
	},
	dragmode: false
};

Plotly.newPlot('myMap', data, layout, {scrollZoom: false, displayModeBar: false, });

const highAudio = new Audio("effects/high.mp3");
const mediumAudio = new Audio("effects/medium.mp3");
const lowAudio = new Audio("effects/low.mp3");

myPlot.on('plotly_hover', function(data){
	console.log(data);
    console.log(terremotos[data.points[0].pointIndex])
	$("#nombre").html(terremotos[data.points[0].pointIndex].Nombre);
	$("#regiones").html(terremotos[data.points[0].pointIndex].Zonas);
	//$("#fecha").html(terremotos[data.points[0].pointIndex].Fecha);
	if (terremotos[data.points[0].pointIndex].Tzunami){
		$("#tzunami").css("display", "block");
	} else {
		$("#tzunami").css("display", "none");
	}
	
	if (terremotos[data.points[0].pointIndex].Muertos==0){
		$("#muertos").css("color","#0f8813")
	} else {
		$("#muertos").css("color","")
	}
	
	$("#muertos").html(terremotos[data.points[0].pointIndex].Muertos);
	
	var magnitud=terremotos[data.points[0].pointIndex].Magnitud;
	$("#magnitud").html(magnitud);
	magnitud=magnitud*10;
	
	$("#magnitud").css("width", magnitud+"px");
	$("#magnitud").css("height", magnitud+"px");
	$("#magnitud").css("lineHeight", magnitud+"px");
	
	$("#tzunami img").css("height", magnitud+"px");
	
	$("#details").css("opacity",1);
});

myPlot.on('plotly_unhover', function(data){
	console.log("unhover");
	$("#details").css("opacity",0);
});

myPlot.on('plotly_click', function(data){
	var magnitudSound=terremotos[data.points[0].pointIndex].Magnitud;

	
	var volumeHigh = magnitudSound-7.9;
	var volumeMedium = magnitudSound-6.9;
	var volumeLow = magnitudSound-5.9;
	
	if ( volumeHigh < 0) volumeHigh=0;
	if ( volumeMedium < 0) volumeMedium=0;
	if ( volumeLow < 0) volumeLow=0;
	
	if ( volumeHigh > 1) volumeHigh=1;
	if ( volumeMedium > 1) volumeMedium=1;
	if ( volumeLow > 1) volumeLow=1;
	
	console.log(volumeHigh, volumeMedium, volumeLow);
	
	highAudio.volume=volumeHigh;
	mediumAudio.volume=volumeMedium;
	lowAudio.volume=volumeLow;
	
	highAudio.currentTime =0;
	mediumAudio.currentTime =0;
	lowAudio.currentTime =0;
	
	highAudio.play();
	mediumAudio.play();
	lowAudio.play();
	
	setTimeout(() => {
		highAudio.pause();
		mediumAudio.pause();
		lowAudio.pause();
		console.log("stop");
	}, 20000);
	
});