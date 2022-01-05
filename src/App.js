import './App.css';
import React, { useState, useEffect } from "react";
import Auth from '@aws-amplify/auth';
import Lambda from 'aws-sdk/clients/lambda'; // npm install aws-sdk


const BASE_URL = process.env.REACT_APP_BASE_URL;


function patch() {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      {
        name: "Test POST"
        // code_postal: "91600",
        // valeur_fonciere: 1,
        // type_local: "Maison",
        // nb_pieces_principales: 2,
      }
    )
  };
  
  fetch(`http://${BASE_URL}/user`, requestOptions);
}


function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [userList, setUserList] = useState([]);
  let userListPrint = [];

  function getData() {
//     return Auth.currentCredentials()
//     .then(credentials => {
      const lambda = new Lambda({
//         credentials: Auth.essentialCredentials(credentials)
      });
      return lambda.invoke({
        FunctionName: 'hello',
        Payload: JSON.stringify({ "hello": "" }),
      });
//     })
  }

  useEffect(() => {
    console.log(getData(), "<<==== DATA");
    setIsLoaded(true);
    setUserList([]);
  }, [])

  if (!isLoaded)
    return <div>Chargement...</div>;
  else
    userListPrint = [];
    for (var i = 0; i < userList.length; i++) {
      userListPrint.push(
          <tr>
            <td>
              {userList[i].id}
            </td>
            <td>
              {userList[i].name}
            </td>
          </tr>
      )
    }

    return (
      <div>
         <table>
           <thead>
             <tr>
               <th>Id</th>
               <th>Name</th>
             </tr>
           </thead>
           <tbody>
             {userListPrint}
           </tbody>
         </table>
        <div>
          <button onClick={patch}>POST</button>
        </div>
       </div>
    )

    // return (
    //   <div>
    //     <table>
    //       <thead>
    //         <tr>
    //           <th>Id</th>
    //           <th>Code Postal</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {userListPrint}
    //       </tbody>
    //     </table>
    //     <div>
          
    //     </div>
    //   </div>
    // );

    // return(
    //   <TableBody>
    //   {this.state.serviceData.map(n => {
    //     return (
    //       <TableRow key={n.id}>
    //         <TableCell component="th" scope="row">
    //           {deleteIcon}
    //           {editIcon}
    //         </TableCell>
    //         <TableCell>{n.domain}</TableCell>
    //         <TableCell>{n.service_name}</TableCell>
    //       </TableRow>
    //     )
    //   })}
    //   </TableBody>
    // )
}

export default App;
