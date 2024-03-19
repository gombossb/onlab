import { Container } from "@mui/material"
import { ReactNode } from "react"
import TopBar from "./TopBar"

export const MainContainer = ({ children }: { children: ReactNode}) => {
  return (
    <>
      <TopBar />
      <Container fixed>
        { children }
      </Container>
    </>
  )
}
