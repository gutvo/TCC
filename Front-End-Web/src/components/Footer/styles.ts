import styled from 'styled-components'

export const FooterContainer = styled.footer`
  background: ${(props) => props.theme['blue-700']};
  color: ${(props) => props.theme.white};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 5rem;
  width: 100%;

  p {
    color: var(--white);
    font-weight: bold;
  }
  p + p {
    // pega apenas os paragrafos que estão no mesmo escopo
    margin-top: 1rem;
  }
  a {
    color: #fffb00;
  }
`
