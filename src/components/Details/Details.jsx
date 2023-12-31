import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Box, Grid, Typography, Button, Divider } from "@mui/material";
import ImageStepper from "./ImageStepper";
import { useEffect } from "react";
import "./Details.css";
// import { textAlign } from "@mui/system";

const Details = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const {
    id,
    street,
    city,
    state,
    zip,
    site_name,
    architect,
    year_built,
    description,
  } = useSelector((store) => store.details);
  const details = useSelector((store) => store.details);
  const sitesColumns = useSelector((store) => store.sitesColumns);
  const photos = useSelector((store) => store.photos);
  console.log(photos);

  useEffect(() => {
    dispatch({ type: "FETCH_DETAILS", payload: params.id });
    dispatch({ type: "FETCH_PHOTOS", payload: params.id });
  }, []);

  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: "#F2F2F2",
        width: "80%",
        margin: "auto",
        minHeight: "75vh",
      }}
    >
      <Grid container>
        <Grid item>
          <Button
            onClick={() => {
              history.push("/home");
              dispatch({ type: "SET_SITES", payload: [] });
            }}
          >
            BACK
          </Button>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid
          display="flex"
          item
          xs={12}
          sm={11}
          md={9}
          lg={6}
          justifyContent="center"
          alignItems="center"
        >
          {photos.length > 0 && <ImageStepper images={photos} />}
        </Grid>
      </Grid>
      <Grid container padding={2} justifyContent="center">
        <Grid item sx={{ textAlign: "center" }}>
          <Typography component="h2" variant="h3" color="primary">
            {site_name}
          </Typography>
          <Divider role="presentation" sx={{ margin: 2 }} />
        </Grid>
      </Grid>
      <Grid
        className="detailsContainer"
        container
        justifyContent="space-evenly"
        display="flex"
        gap={5}
      >
        <Grid
          item
          justifyContent="center"
          display="flex"
          flexDirection="column"
        >
          <Grid item sx={{ textAlign: "center" }}>
            <Typography
              component="h5"
              variant="h5"
              sx={{ fontWeight: "bold" }}
              color="primary"
            >
              Address
            </Typography>
          </Grid>
          <Grid item sx={{ textAlign: "center" }}>
            <Typography>
              {street}, {city}, {state}, {zip}
            </Typography>
          </Grid>
        </Grid>
        {/* Dynamically fill in rest of columns */}
        {sitesColumns
          .filter(
            (column) =>
              ![
                "id",
                "street",
                "city",
                "state",
                "zip",
                "site_name",
                "description",
                "latitude",
                "longitude",
              ].includes(column.column_name)
          )
          .map(
            (column) =>
              details[column.column_name] && (
                <Grid
                  item
                  justifyContent="center"
                  display="flex"
                  flexDirection="column"
                  key={column.column_name}
                >
                  <Grid item sx={{ textAlign: "center" }}>
                    <Typography
                      component="h5"
                      variant="h5"
                      sx={{ fontWeight: "bold" }}
                      color="primary"
                    >
                      {column.column_name
                        .split("_")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </Typography>
                  </Grid>
                  <Grid item sx={{ textAlign: "center" }}>
                    <Typography>{details[column.column_name]}</Typography>
                  </Grid>
                </Grid>
              )
          )}
      </Grid>
      {description != null && (
        <>
          <Divider sx={{ margin: 5 }} role="presentation" />
          <Grid
            container
            display="flex"
            flexDirection="column"
            gap={2}
            alignItems="center"
          >
            <Grid item>
              <Typography
                component="h5"
                variant="h5"
                sx={{ fontWeight: "bold" }}
                color="primary"
              >
                Description
              </Typography>
            </Grid>
            <Grid
              item
              lg={9}
              sm={11}
              paddingTop={0}
              paddingBottom={5}
              sx={{ textAlign: "center" }}
            >
              <Typography component="p">{description}</Typography>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Details;
