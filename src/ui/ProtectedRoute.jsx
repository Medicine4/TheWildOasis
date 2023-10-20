import PropTypes from "prop-types";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Spinner from "../ui/Spinner";
import { useUser } from "../features/authentication/useUser";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

ProtectedRoute.propTypes = {
  children: PropTypes.any,
};
function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. 加载被认证的用户
  const { isLoading, isAuthenticated } = useUser();

  // 2. 如果没有被认证的用户，返回/login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  // 3. 加载时，显示<Spinner/>
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. 如果有被认证用户，渲染App
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
