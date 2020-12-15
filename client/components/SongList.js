import React from "react";
import gql from "graphql-tag"; // Help us write queries inside of component
import { graphql } from "react-apollo"; // Like react-redux.  Use to bind graphql query with component
import { Link } from "react-router";
import query from "../queries/fetchSongs";

class SongList extends React.Component {
  // Currently deletes from the back end but in the next section we need to fix the refetch of the list without the item.
  onSongDelete(id) {
    this.props
      .mutate({
        variables: { id: id },
      })
      .then(() => this.props.data.refetch()); // method to refetch query associated with component
  }

  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => {
      return (
        <li key={id} className="collection-item">
          <Link to={`/songs/${id}`}>{title}</Link>
          <i className="material-icons" onClick={() => this.onSongDelete(id)}>
            delete
          </i>
        </li>
      );
    });
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(graphql(query)(SongList));

/* 
  // Moved to queries folder
  const query = gql`
    {
      songs {
        id
        title
      }
    }
  `;
*/
