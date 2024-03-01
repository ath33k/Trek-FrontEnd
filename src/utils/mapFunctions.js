// This function requires two paramteres destination is mandatory to execute this funciton..
// if user location doesn't provided, it will take geolocation and assume it as the location
export async function getDistance(destination, userLocation = false) {
  if (!destination) return;

  if (!userLocation) {
    const currLocation = await geoLocation();
    console.log("before fetching" + currLocation.lat + "" + currLocation.lng);
    const res = await directionFetcher(currLocation, destination);
    console.log("after fetching" + res);
    const distance = res.routes[0].legs[0].distance.text;
    console.log(distance + "sss");
    console.log(distance + "cur");
    return distance;
  } else {
    const res = await directionFetcher(userLocation, destination);
    const distance = res.routes[0].legs[0].distance.text;
    return distance;
  }
}

function geoLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const currLocation = { lat: latitude, lng: longitude };
        resolve(currLocation);
      },
      (error) => {
        console.log("access denied");
        console.log(error.message);
        reject(error); // Handle geolocation error
      }
    );
  });
}

// direction (routes) fetcher
export async function directionFetcher(location, destination) {
  if (!location) return;

  const service = new window.google.maps.DirectionsService();
  const result = await service.route({
    origin: location,
    destination: destination,
    travelMode: window.google.maps.TravelMode.DRIVING,
  });

  return result;
}
