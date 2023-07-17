import styled from 'styled-components'

export const NavbarContainer = styled.div`
  background: ${(props) => props.theme['blue-700']};
  height: 4rem;
  margin-bottom: 4rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center; //para usar esse precisa colocar display flex antes
  a {
    color: ${(props) => props.theme.white};
    font-size: 1.4rem;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    font-weight: bold;
    transition: 80ms;
  }
  a:first-child {
    margin-left: 1rem;
  }
  a:last-child {
    margin-right: 1rem;
  }
  a:hover {
    background-color: ${(props) => props.theme['blue-600']};
  }
`

export const LinksLeft = styled.div``

export const LinksRight = styled.div``
