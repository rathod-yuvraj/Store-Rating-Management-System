import {
  useEffect,
  useState
} from "react";

import {
  Box,
  Button,
  Grid,
  MenuItem,
  Rating,
  TextField,
  Typography,
  Card,
  CardContent
} from "@mui/material";

import API from "../../api/axios";

export default function StorePage() {

  const [stores, setStores] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchAddress, setSearchAddress] = useState("");

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = async () => {

    try {

      const res = await API.get(
        "/store/all"
      );

      setStores(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const searchStore = async () => {

    try {

      const res = await API.get(
        `/store/search?name=${searchName}&address=${searchAddress}`
      );

      setStores(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const submitRating = async (
    storeId,
    rating
  ) => {

    try {

      await API.post(
        "/rating/submit",
        {
          storeId,
          rating
        }
      );

      loadStores();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <Box p={3}>

      <Typography
        variant="h4"
        mb={3}
      >
        Stores
      </Typography>

      <Grid
        container
        spacing={2}
        mb={3}
      >

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Search Name"
            value={searchName}
            onChange={(e) =>
              setSearchName(
                e.target.value
              )
            }
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Search Address"
            value={searchAddress}
            onChange={(e) =>
              setSearchAddress(
                e.target.value
              )
            }
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <Button
            variant="contained"
            fullWidth
            onClick={searchStore}
          >
            Search
          </Button>
        </Grid>

      </Grid>

      <Grid
        container
        spacing={3}
      >

        {
          stores.map(store => (

            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              key={store.id}
            >

              <Card>

                <CardContent>

                  <Typography
                    variant="h6"
                  >
                    {store.name}
                  </Typography>

                  <Typography
                    color="text.secondary"
                  >
                    {store.address}
                  </Typography>

                  <Box mt={2}>

                    <Typography>
                      Overall Rating :
                      {store.averageRating}
                    </Typography>

                  </Box>

                  <Box mt={2}>

                    <Typography mb={1}>
                      Submit Rating
                    </Typography>

                    <Rating
                      onChange={(
                        event,
                        value
                      ) =>
                        submitRating(
                          store.id,
                          value
                        )
                      }
                    />

                  </Box>

                </CardContent>

              </Card>

            </Grid>

          ))
        }

      </Grid>

    </Box>
  );
}