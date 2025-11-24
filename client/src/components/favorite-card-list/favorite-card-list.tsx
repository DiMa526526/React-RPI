import { OffersList } from "../../types/offer";
import { FavoriteCard } from "../favorite-card/favorite-card";

type FavoriteCardListProps = {
  offersList: OffersList[];
};

function FavoriteCardList({ offersList }: FavoriteCardListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offersList.map((item) => (
        <FavoriteCard
          key={item.id}
          id={item.id}
          title={item.title}
          type={item.type}
          price={item.price}
          previewImage={item.previewImage}
          isPremium={item.isPremium}
          rating={item.rating}
        />
      ))}
    </div>
  );
}

export { FavoriteCardList };
