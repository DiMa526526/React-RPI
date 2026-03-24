import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../logo/logo";
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction, checkAuthAction } from '../../store/api-action';
import { selectFavoriteOffers } from '../../store/selectors';
import { useEffect } from 'react';

function Header() {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const userData = useAppSelector((state) => state.user);
  const favoriteOffers = useAppSelector(selectFavoriteOffers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authorizationStatus === 'UNKNOWN') {
      dispatch(checkAuthAction());
    }
    if (authorizationStatus === 'AUTH' && !userData) {
      dispatch(checkAuthAction()); // Ensure user data is fetched after login
    }
  }, [authorizationStatus, userData, dispatch]);

  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(logoutAction());
    navigate('/');
  };

  if (authorizationStatus === 'UNKNOWN' || (authorizationStatus === 'AUTH' && !userData)) {
    return (
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <div className="header__spinner">Loading...</div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authorizationStatus === "AUTH" && userData ? (
                <>
                  <li className="header__nav-item user">
                    <Link
                      to="/favorites"
                      className="header__nav-link header__nav-link--profile"
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">
                        {userData.email}
                      </span>
                      <span className="header__favorite-count">
                        {favoriteOffers.length}
                      </span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <button
                      className="header__nav-link header__signout button"
                      onClick={handleSignOut}
                    >
                      Sign out
                    </button>
                  </li>
                </>
              ) : (
                <li className="header__nav-item">
                  <Link to="/login" className="header__nav-link">
                    Sign in
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export { Header };
