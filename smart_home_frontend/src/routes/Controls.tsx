import { MainContainer } from "../components/MainContainer";
import { Stack } from "@mui/material";

const Controls = () => {
  

  

  return (
    <MainContainer>
      <h1>Controls</h1>
      <Stack spacing={2}>
        <Stack
          direction="row"
          justifyContent="flex-start"
          spacing={2}
        >
          {/*todo 
            blinds manual override
            led 1-3
            fan 1-2
            heating target temp
            heating manual override
          */}
        </Stack>
      </Stack>
    </MainContainer>
  )
}

export default Controls;
