import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import FavoriteClient from "./FavoriteClient";

const FavoritePage = async () => {
  const currentUser = await getCurrentUser();
  // we get all my reservations that are favorited
  const favorites = await getFavoriteListings();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  if (favorites.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="It looks like there is no favorites on your property"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoriteClient favorites={favorites} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default FavoritePage;
