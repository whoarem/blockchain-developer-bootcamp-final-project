import styled from 'styled-components'

export const FullSizedBox = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;

  /* background-color: #dddddd; */

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export default function LoginMessage() {
  return (
    <FullSizedBox>Login with your eth account on ropsten testnet.</FullSizedBox>
  )
}
