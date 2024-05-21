import { useEffect, useState } from 'react';
import { createClient } from 'urql';
import './App.css';

function App() {
  const [delegations, setDelegations] = useState([]);

  const QueryURL= "https://gateway-arbitrum.network.thegraph.com/api/dc6799170793e8d015a3b3c4b1f3a359/subgraphs/id/4YgtogVaqoM8CErHWDK8mKQ825BcVdKB8vBYmb4avAQo";

  const client = createClient({
    url: QueryURL
  });

  const query = `{
  delegations(first: 5) {
    id
    delegator
    space
    delegate
  }
  blocks(first: 5) {
    id
    number
    timestamp
  }
}`

useEffect(() => {
  const getDelegations = async () => {
    const { data } = await client.query(query).toPromise();
    console.log(data);
    setDelegations(data.delegations);
  }
  getDelegations();
}, []);

return (
    <>
      <div>
        <h1>Delegations Information</h1>
        {delegations !== null && delegations.length > 0 && delegations.map((delegation) => {
          return (
            <div key={delegation.id}>
              <div><b>Id: </b>{delegation.id}</div>
              <div><b>Delegator: </b>{delegation.delegator}</div>
              <div><b>Space: </b> {delegation.space}</div>
              <div><b>Delegate: </b>{delegation.delegate}</div>
              <br></br>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;