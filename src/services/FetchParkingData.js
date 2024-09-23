import axios from 'axios';

export const fetchParkingData = async () => {
  try {
    const response = await axios.get('https://parking.fullerton.edu/ParkingLotCounts/mobile.aspx');
    return response.data;
  } catch (error) {
    console.error('Error fetching parking data:', error);
  }
};
export default fetchParkingData;