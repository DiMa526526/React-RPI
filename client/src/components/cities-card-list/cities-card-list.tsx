import { OffersList } from "../../types/offer";
import { CitiesCard } from "../cities-card/cities-card";

type CitiesCardListProps = {
  offersList: OffersList[];
  wrapperClassName?: string;
  cardClassName?: string;
  onCardHover?: (id: string | null) => void;
};

export function CitiesCardList({
  offersList,
  wrapperClassName = "cities__places-list places__list tabs__content",
  cardClassName = "cities__card",
  onCardHover,
}: CitiesCardListProps) {
  return (
    <div className={wrapperClassName}>
      {offersList.map((item) => (
        <CitiesCard
          key={item.id}
          {...item}
          cardClassName={cardClassName}
          onCardHover={onCardHover}
        />
      ))}
    </div>
  );
}
