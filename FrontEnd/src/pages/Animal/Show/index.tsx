import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { actions } from "@Redux/animals/slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@Redux/store";

export default function ShowAnimal() {
  const dispatch = useDispatch();
  const { Animalid } = useParams();
  const { showAnimalRequest } = actions;
  const data = useSelector((state: RootState) => state.animals.animalData);

  useEffect(() => {
    if (Animalid) {
      dispatch(showAnimalRequest(parseInt(Animalid)));
    }
  }, [showAnimalRequest, dispatch, Animalid]);
  return (
    <Box>
      {data ? (
        <Box>
          <Typography variant="h3">Animal:</Typography>
          <Typography>{data.id}</Typography>
          <Typography>{data.name}</Typography>
        </Box>
      ) : (
        <Typography>Animal não encontrado</Typography>
      )}
    </Box>
  );
}
