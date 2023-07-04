import React from "react";
import styled from "styled-components";

export default function App() {
  return (
    <AppContainer>
      <AppHeader className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <AppLink className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </AppLink>
      </AppHeader>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  text-align: center;
`;
const AppHeader = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const AppLink = styled.a`
  color: #61dafb;
`;
