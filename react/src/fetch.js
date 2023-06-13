import axios from "axios";

const fetchListings = (listingData = null) => {
  if (listingData) {
    return axios
      .post("http://localhost:8000/api/create-listing", {
        listing: listingData,
      })
      .then((response) => {
        const createdListing = response.data;

        return createdListing;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  } else {
    return axios
      .get("http://localhost:8000/api/show-listings")
      .then((response) => {
        const listings = response.data;

        return listings;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }
};

export default fetchListings;
