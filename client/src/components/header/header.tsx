import { Link } from "react-router-dom";
import { Logo } from "../logo/logo";
import { OffersList } from "../../types/offer";

type HeaderProps = {
  offersList: OffersList[];
};

function Header({ offersList }: HeaderProps) {
  const favoriteOffers = offersList.filter((offer) => offer.isFavorite);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link
                  className="header__nav-link header__nav-link--profile"
                  to="/favorites"
                >
                  <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                  <span className="header__user-name user__name">
                    Myemail@gmail.com
                  </span>
                  <span className="header__favorite-count">
                    {favoriteOffers.length}
                  </span>
                </Link>
              </li>
              <li className="header__nav-item">
                <a className="header__nav-link" href="#">
                  <span className="header__signout">Sign out</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export { Header };
