import styled from 'styled-components'

export const CadastroContainer = styled.div`
  .divForm {
    background-color: ${(props) => props.theme['gray-300']};
    padding: 2rem;
    border-radius: 10px;
    min-width: 50vw;
  }
  .divForm {
    text-align: center;
  }
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`
