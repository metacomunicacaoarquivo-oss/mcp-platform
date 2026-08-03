import { getInstagramDashboard } from "./instagram.service.js";
import { getFacebookOverview } from "./facebook.service.js";

export async function getMetaBusinessOverview({
  instagramAccessToken,
  pageAccessToken
}) {
  const [instagram, facebook] = await Promise.all([
    getInstagramDashboard(instagramAccessToken),
    getFacebookOverview(pageAccessToken)
  ]);

  const instagramViews =
    instagram?.data?.[0]?.total_value?.value ?? 0;

  const facebookValues =
    facebook?.insights?.data?.[0]?.values ?? [];

  const facebookViews = facebookValues.reduce(
    (total, item) => total + Number(item.value || 0),
    0
  );

  return {
    total: {
      views: instagramViews + facebookViews
    },
    instagram: {
      views: instagramViews,
      raw: instagram
    },
    facebook: {
      views: facebookViews,
      followers: facebook?.profile?.followers_count ?? 0,
      pageLikes: facebook?.profile?.fan_count ?? 0,
      raw: facebook
    }
  };
}
