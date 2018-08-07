/*
  Calculate best link station for given point with power
*/

// Link stations with x,y points and range ([x,y,r])
const link_stations = [[0,0,10],[20,20,5],[10,0,12]]
// Input points ([x,y])
const output_points = [[0,0],[100,100],[15,10],[18,18]]

/**
* Function to calculate points and output best link station with power
* @param {number} x Given x point
* @param {number} y Given y point
* @param {Object[]} stations Link station list
*/
const f = (x, y, stations = []) => {
  // Filter suitable stations, sort by power and splice first
  const best_station = stations.filter((station) => {
      const distance = Math.sqrt(Math.pow((x - station[0]), 2) + Math.pow((y - station[1]), 2));
      const power = distance > station[2] ? 0 : Math.pow((station[2] - distance), 2);
      // Return station with power if it is more than 0
      if(power > 0){
        return station.push(power)
      }
    }).sort((a,b) => { return b[3] - a[3] }).splice(0,1);

  const body = document.getElementById("body");
  const p = document.createElement('p');

  // Default to no station within reach
  let str = 'No linkstation within reach for point ' + x + ',' + y;

  // There is station in reach
  if(best_station.length > 0){
    station = [].concat(...best_station);
    str = 'Best linkstation for point ' + x + ',' + y + ' is ' +
          station[0] + ', '+ station[1] + ' with power ' + station[3];
  }

  p.appendChild(document.createTextNode(str));
  body.appendChild(p);

}

// Run calculation
output_points.map(p => f(p[0], p[1], link_stations));
