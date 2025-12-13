import { useState } from "react";
import { SortOffer } from "../../types/sort";
import classNames from "classnames";
import { SortOffersType } from "../../const";

type SortPlacesProps = {
  activeSorting: SortOffer;
  onChange: (newSorting: SortOffer) => void;
};

function SortOptions({ activeSorting, onChange }: SortPlacesProps) {
  const [isOpen, setIsOpen] = useState(false);

  const iconStyle = {
    transform: `translateX(-50%) ${isOpen ? "rotate(180deg)" : ""}`,
  };

  function keyDownHandler(evt: React.KeyboardEvent<HTMLFormElement>) {
    if (evt.key === "Escape" && isOpen) {
      evt.preventDefault();
      setIsOpen(false);
    }
  }

  function typeClickHandler() {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }

  function sortingItemClickHandler(type: SortOffer) {
    onChange(type);
    setIsOpen(false);
  }

  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
      onKeyDown={keyDownHandler}
    >
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={typeClickHandler}
      >
        {activeSorting}
        <svg
          className="places__sorting-arrow"
          width={7}
          height={4}
          style={iconStyle}
        >
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={classNames("places__options", {
          "places__options--opened": isOpen,
          "places__options--custom": true,
        })}
      >
        {Object.values(SortOffersType).map((sortValue) => (
          <li
            key={sortValue}
            className={classNames("places__option", {
              "places__option--active": sortValue === activeSorting,
              places__option: true,
            })}
            tabIndex={0}
            onClick={() => sortingItemClickHandler(sortValue)}
          >
            {sortValue}
          </li>
        ))}
      </ul>
    </form>
  );
}

export { SortOptions };
