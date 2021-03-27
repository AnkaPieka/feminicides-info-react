import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import apiHandler from '../api/apiHandler';

class Dashboard extends Component {
  state = {
    users: [],
    events: [],
    regions: []
  }

  componentDidMount() {
    apiHandler
      .getUsers()
      .then(data => this.setState({ users: data }))
      .catch(error => console.log(error));
  }

  handleDeleteUser(userID) {
    apiHandler
      .deleteUser(userID)
      .then(deletedUser => {
        this.setState({ users: [...this.state.users.filter(user => userID !== user._id)] });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <h1>Tableau de bord</h1>
        <section>
          <h2>Utilisatrices & utilisateurs</h2>
          <Link to="/admin/nouvel-utilisateur">Ajouter un.e utilisatrice.eur</Link>
          <table>
            <thead>
              <tr>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Éditer</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
            {this.state.users.map(user => {
              return (
              <tr key={user._id}>
                <td>
                  {user.firstName}
                </td>
                <td>
                  {user.lastName}
                </td>
                <td>
                  <Link 
                  to={{pathname: `/admin/editer-utilisateur/${user._id}`,
                  state: {user: user}
                }}>
                    <i className="fas fa-edit"></i>
                  </Link>
                </td>
                <td>
                <i className="fas fa-trash" onClick={() => this.handleDeleteUser(user._id)}></i>
                </td>
              </tr>
            )
            })}
            </tbody>
          </table>

        </section>
        <section>
          <h2>Événements</h2>
          <Link to="/nouvel-evenement">Ajouter un événement</Link>
        </section>
        <section>
          <h2>Régions, collectivités & territoires</h2>
        </section>
      </div>
    )
  }
}

export default Dashboard;
