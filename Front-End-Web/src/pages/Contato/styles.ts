import styled from 'styled-components'

export const Ul = styled.ul`
  background-color: ${(props) => props.theme['gray-300']};
  list-style: none;
  padding: 2rem;
  margin: 2rem;
  border-radius: 10px;
  font-size: 1.25rem;
  text-align: center;
  li + li {
    margin-top: 1rem;
  }
  a:hover {
    color: ${(props) => props.theme['gray-400']};
  }
`
