import { gql } from "@apollo/client";
import { Entity } from ".";

export interface GenreEntity extends Entity {
  name: string;
  imageUrl?: string;
  imageName?: string;
}

const GQL_FRAGMENT_GENRE_DETAILS = gql`
  fragment GenreDetails on Genre {
    id
    name
    imageUrl
    imageName
  }
`;

export const GQL_GENRES_GET_ALL = gql`
  query {
    getAllGenres {
      ...GenreDetails
    }
  }
  ${GQL_FRAGMENT_GENRE_DETAILS}
`;

export const GQL_GENRE_CREATE = gql`
  mutation createGenre($name: String!, $image: Upload!) {
    createGenre(name: $name, image: $image) {
      ...GenreDetails
    }
  }
  ${GQL_FRAGMENT_GENRE_DETAILS}
`;

export const GQL_GENRE_UPDATE = gql`
  mutation updateGenre($id: ID!, $input: UpdateGenreInput!) {
    updateGenre(id: $id, input: $input) {
      ...GenreDetails
    }
  }
  ${GQL_FRAGMENT_GENRE_DETAILS}
`;

export const GQL_GENRE_DELETE = gql`
  mutation deleteGenre($id: ID!) {
    deleteGenre(id: $id)
  }
`;
