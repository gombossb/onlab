import { Box, Container } from "@mui/material"
import { ReactNode } from "react"
import TopBar from "./TopBar"

export const MainContainer = ({ children }: { children: ReactNode}) => {
  return (
    <>
      <TopBar />
      <Container fixed>
        <Box mb={4}>
          { children }
        </Box>
      </Container>
    </>
  )
}
