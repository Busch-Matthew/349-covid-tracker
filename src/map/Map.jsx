import React, { memo,useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography,Annotation} from "react-simple-maps";



const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";


function colorScale(numOfCases){
  if (numOfCases > 10000000){
    return "#67001f"
  }
  else if (numOfCases > 5000000){
    return "#980043"
  }
  else if (numOfCases > 1000000){
    return "#ce1256"
  }
  else if (numOfCases > 500000){
    return "#e7298a"
  }
  else if (numOfCases > 250000){
    return "#df65b0"
  }
  else if (numOfCases > 100000){
    return "#c994c7"
  }
  else if (numOfCases > 10000){
    return "#d4b9da"
  }
  else if (numOfCases > 1000){
    return "#e7e1ef"
  }
  else {
    return "#f7f4f9"
  }
  
}


const MapChart = ({setTooltipContent, setTableContent, selectedCountry, historicalData, todaysData, lifetimeData}) => {
  const [data, setData] = useState([]);



  const updateTable = (country) => {
  
      fetch("https://disease.sh/v3/covid-19/jhucsse")
      .then(response => response.json())
      .then(response =>{
        if (country === 'USA'){
          var provinces = response.filter(ref => {
            return ref.country === 'US'
          })
        }
        else{
          var provinces = response.filter(ref => {
            return ref.country === country
          })
        }
       
        
        setTableContent([])
        setTableContent(provinces)
        selectedCountry(country)
        
      })
  }

  const updateTodaysData = (country) => {
    fetch(`https://disease.sh/v3/covid-19/countries/${country}?strict=true`)
    .then(response => response.json())
    .then(response => {
      //console.log(response)
      var {todayCases, todayDeaths, todayRecovered} = response
      var {cases, active, deaths, recovered} = response
      console.log(response)

      console.log(todayCases)
      console.log(todayDeaths)
      console.log(todayRecovered)

      lifetimeData([{"id": "deaths",
                    "label": "Deaths",
                    "value" : deaths,
                    "color": "hsl(29, 70%, 50%)"}, 
                  {"id": "cases",
                    "label": "Cases",
                    "value" : cases,
                    "color": "hsl(106, 70%, 50%)"},
                  {"id": "active",
                    "label": "Active",
                    "value" : active,
                    "color": "hsl(357, 70%, 50%)"},
                   {"id": "recovered",
                    "label": "Recovered",
                    "value" : recovered,
                    "color": "hsl(29, 70%, 50%)"}])

       todaysData([{"id": "newDeaths",
                      "label": "New Deaths",
                      "value" : todayDeaths,
                      "color": "hsl(106, 70%, 50%)"},
                    {"id": "newCases",
                      "label": "New Cases",
                      "value" : todayCases,
                      "color": "hsl(357, 70%, 50%)"},
                    {"id": "newRecovered",
                      "label": "New Recovered",
                      "value" : todayRecovered,
                      "color": "hsl(29, 70%, 50%)"}]) 

    });
  };


  const updateHistoricalData = (country) => {
    fetch(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=all`)
      .then(response => response.json())
      .then(response =>{
    
        var cases = []
        for(var i in response.timeline.cases){
            cases.push({"x": i,
                      "y": response.timeline.cases[i]/1000})
        }
        var deaths = []
        for(var j in response.timeline.deaths){
          deaths.push({"x": j,
                      "y": response.timeline.deaths[j]/1000})
        }
        var recovered = []
        for(var k in response.timeline.recovered){
          recovered.push({"x": k,
                      "y": response.timeline.recovered[k]/1000})
        }       
        historicalData([{"id": "deaths",
                        "color": "hsl(348, 84%, 63%)",
                        "data": deaths},

                        {"id": "cases",
                        "color": "hsl(288, 84%, 63%)",
                        "data": cases},

                        {"id": "recovered",
                        "color": "hsl(108, 84%, 63%)",
                        "data": recovered}])       

      })
      .catch(e =>{
        alert(`No Data Found for ${country}`)
      }
        
      )
  };

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries?yesterday=false&twoDaysAgo=false")
    .then(response => response.json())
    .then(contents => {
      setData(contents)
    })
    fetch(`https://disease.sh/v3/covid-19/all?yesterday=false&twoDaysAgo=false&allowNull=false`)
    .then(response => response.json())
    .then(response => {
      //console.log(response)
      var {todayCases, todayDeaths, todayRecovered} = response
      var {cases, active, deaths, recovered} = response
      console.log(response)

      console.log(todayCases)
      console.log(todayDeaths)
      console.log(todayRecovered)

      lifetimeData([{"id": "deaths",
                    "label": "Deaths",
                    "value" : deaths,
                    "color": "hsl(29, 70%, 50%)"}, 
                  {"id": "cases",
                    "label": "Cases",
                    "value" : cases,
                    "color": "hsl(106, 70%, 50%)"},
                  {"id": "active",
                    "label": "Active",
                    "value" : active,
                    "color": "hsl(357, 70%, 50%)"},
                   {"id": "recovered",
                    "label": "Recovered",
                    "value" : recovered,
                    "color": "hsl(29, 70%, 50%)"}])

       todaysData([{"id": "newDeaths",
                      "label": "New Deaths",
                      "value" : todayDeaths,
                      "color": "hsl(106, 70%, 50%)"},
                    {"id": "newCases",
                      "label": "New Cases",
                      "value" : todayCases,
                      "color": "hsl(357, 70%, 50%)"},
                    {"id": "newRecovered",
                      "label": "New Recovered",
                      "value" : todayRecovered,
                      "color": "hsl(29, 70%, 50%)"}]) 

    });
    fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=all`)
      .then(response => response.json())
      .then(response =>{
        console.log(response)
        var cases = []
        for(var i in response.cases){
            cases.push({"x": i,
                      "y": response.cases[i]/1000})
        }
        var deaths = []
        for(var j in response.deaths){
          deaths.push({"x": j,
                      "y": response.deaths[j]/1000})
        }
        var recovered = []
        for(var k in response.recovered){
          recovered.push({"x": k,
                      "y": response.recovered[k]/1000})
        }       
        historicalData([{"id": "deaths",
                        "color": "hsl(348, 84%, 63%)",
                        "data": deaths},

                        {"id": "cases",
                        "color": "hsl(288, 84%, 63%)",
                        "data": cases},

                        {"id": "recovered",
                        "color": "hsl(108, 84%, 63%)",
                        "data": recovered}])       

      })
      .catch(e =>{
        alert(`No Global Data Found`)
      }
        
      )
      fetch("https://disease.sh/v3/covid-19/jhucsse")
      .then(response => response.json())
      .then(response =>{
          var provinces = response.filter(ref => {
            return ref.province != null
          })
  
        setTableContent(provinces)

        
      })
  }, []);

  return (
    
      <ComposableMap 
      data-tip = ""
      projectionConfig={{
        scale: 155,
        rotation: [-11, 0, 0],
      }}
      width={800}
      height={400}
      style={{ width: "auto", height: "auto", }}
      
      
       
       >
      
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              const d = data.find((s)=> s.countryInfo.iso3 === geo.properties.ISO_A3)
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={colorScale(d ? d.cases : "#EEE")}
                  onMouseEnter = {() =>{      
                    setTooltipContent(`${geo.properties.NAME}`)
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  onClick={() =>{
                   
                    
                    try{
                      const {country} = (d)
                    updateTable(country)
                    updateHistoricalData(geo.properties.ISO_A3)
                    updateTodaysData(geo.properties.ISO_A3)
                    }
                    catch{
                      alert(`No Data found for ${geo.properties.NAME}`)
                    }
                  }}
                  style={{
                    default: {
                      fill: colorScale(d ? d.cases : "#EEE"),
                      outline: "none"
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none"
                    }
                  }}
                />
              );
            })
          }
        </Geographies>
        <Annotation
        subject={[-80.51, -130]}
        dx={-90}
        dy={-30}
        connectorProps={{
          stroke: "#FF5533",
          strokeWidth: 0,
          strokeLinecap: "round"
        }}
      >
        <text x="+15" textAnchor="end" alignmentBaseline="middle" fill="#333333">
          {"Click somewhere"}
        </text>
        <text x="0" y = '+14' textAnchor="end" alignmentBaseline="middle" fill="#333333">
          {" to see more!"}
        </text>
      </Annotation>
      
      </ComposableMap>
      
    
  );
};

export default memo(MapChart);
