package fr.lelouet.services.qraphql;

import fr.lelouet.services.scores.enums.RulesSaison;

import javax.inject.Inject;
import javax.inject.Singleton;

@Singleton
public class QraphQLQueryBuilder {

    @Inject
    public QraphQLQueryBuilder() {
        // this constructor is empty
    }

    public String buildNextUserQuery(RulesSaison saison, String endCursor) {
        return "{\"operationName\":\"HallOfFame\"," +
            "\"variables\":{\"season\":" + saison.getSaison() + ",\"after\":\"" + endCursor + "\",\"sort\":{\"type\":\"" + saison.name() + "\",\"direction\":\"DESC\"}}" +
            ",\"query\":\"query HallOfFame($season: Int!, $sort: UsersSortInput!, $after: String, $first: Int) {\\n"
            + getUserQuery();
    }

    public String buildFirstUserQuery(RulesSaison saison, Integer top) {
        return "{\"operationName\":\"HallOfFame\"," +
            "\"variables\":{\"season\":" + saison.getSaison() + ",\"first\":" + top + ",\"sort\":{\"type\":\"" + saison.name() + "\",\"direction\":\"DESC\"}}" +
            ",\"query\":\"query HallOfFame($season: Int!, $sort: UsersSortInput!, $after: String, $first: Int) {\\n"
            + getUserQuery();

    }

    private static String getUserQuery() {
        return "  users(sort: $sort, after: $after, first: $first) {\\n" +
            "    pageInfo {\\n" +
            "      endCursor\\n" +
            "      hasNextPage\\n" +
            "      __typename\\n" +
            "    }\\n" +
            "    edges {\\n" +
            "      node {\\n" +
            "        username\\n" +
            "        slug\\n" +
            "        cScore(season: $season)\\n" +
            "        rank(season: $season)\\n" +
            "          profile {\\n" +
            "              pictureUrl(derivative: \\\"width=128\\\")\\n" +
            "              fallbackUrl(derivative: \\\"width=128\\\")\\n" +
            "              __typename\\n" +
            "           }\\n" +
            "        __typename\\n" +
            "     __typename\\n" +
            "      }\\n" +
            "      __typename\\n" +
            "    }\\n" +
            "    __typename\\n" +
            "  }\\n" +
            "}\\n" +
            "\"}";
    }
}
