import useAxios from "axios-hooks";
import { NextPage } from "next";
import { FC, useContext } from "react";
import styled from "styled-components";

import { AuthContext } from "../src/client/components/Auth/Context";
import { User } from "../src/interfaces";

const AuthenticateDiv = styled.div`
  border: 5px solid red;
  color: red;
`;

const UsersList: FC = () => {
  const [{ data, loading, error }] = useAxios<User[]>("/api/users");

  if (loading) {
    return <p>Loading Users...</p>;
  }
  if (error) {
    console.error(error);
    return <p>Error! {error.message}</p>;
  }

  return (
    <div>
      <ol>
        {data.map(({ email, password }, key) => (
          <li key={key}>
            <ul>
              <li>Email: {email}</li>
              <li>Password: {password}</li>
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
};

const Index: NextPage = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    return <UsersList />;
  }
  return <AuthenticateDiv>You need to be authenticated!</AuthenticateDiv>;
};

export default Index;
