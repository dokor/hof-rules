package fr.lelouet.services.qraphql;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import fr.lelouet.services.scores.Profile;
import fr.lelouet.services.scores.RulesSaison;
import fr.lelouet.services.scores.UserScore;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;


import javax.inject.Inject;
import javax.inject.Singleton;

@Singleton
public class FetchData {

    private static final Logger logger = LoggerFactory.getLogger(FetchData.class);

    private static final String URL = "https://api.rules.art/graphql";
    private static final Integer TOP = 500;

    @Inject
    public FetchData() {

    }

    public List<UserScore> fetch(RulesSaison saison) {
        List<UserScore> scores = new ArrayList<>();
        String data = getData(saison, null);
        while (scores.size() < 500) {
            String response = sendRequest(URL, data);

            if (response != null) {
                JsonObject jsonResponse = JsonParser.parseString(response).getAsJsonObject();
                JsonArray edges = jsonResponse
                    .getAsJsonObject("data")
                    .getAsJsonObject("users")
                    .getAsJsonArray("edges");

                // parse Users
                scores.addAll(extractList(edges));

                JsonObject pageInfo = jsonResponse
                    .getAsJsonObject("data")
                    .getAsJsonObject("users")
                    .getAsJsonObject("pageInfo");
                String endCursor = pageInfo.get("endCursor").getAsString();
                boolean hasNextPage = pageInfo.get("hasNextPage").getAsBoolean();

                if (!hasNextPage) {
                    break;
                }

                data = getData(saison, endCursor);
                logger.debug("[{}] Fetch next page [{}]", saison, endCursor);
            } else {
                logger.warn("Erreur lors de la requête HTTP");
                break;
            }
        }
        return scores;
    }

    private static String getData(RulesSaison saison, String endCursor) {
        if (endCursor != null) {
            return "{\"operationName\":\"HallOfFame\"," +
                "\"variables\":{\"season\":" + saison.getSaison() + ",\"after\":\"" + endCursor + "\",\"sort\":{\"type\":\"" + saison.name() + "\",\"direction\":\"DESC\"}}" +
                ",\"query\":\"query HallOfFame($season: Int!, $sort: UsersSortInput!, $after: String, $first: Int) {\\n" +
                "  users(sort: $sort, after: $after, first: $first) {\\n" +
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
                "     __typename\\n" +
                "      }\\n" +
                "      __typename\\n" +
                "    }\\n" +
                "    __typename\\n" +
                "  }\\n" +
                "}\\n" +
                "\"}";
        }
        return "{\"operationName\":\"HallOfFame\"," +
            "\"variables\":{\"season\":" + saison.getSaison() + ",\"first\":" + TOP + ",\"sort\":{\"type\":\"" + saison.name() + "\",\"direction\":\"DESC\"}}" +
            ",\"query\":\"query HallOfFame($season: Int!, $sort: UsersSortInput!, $after: String, $first: Int) {\\n" +
            "  users(sort: $sort, after: $after, first: $first) {\\n" +
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
            "     __typename\\n" +
            "      }\\n" +
            "      __typename\\n" +
            "    }\\n" +
            "    __typename\\n" +
            "  }\\n" +
            "}\\n" +
            "\"}";
    }

    private static List<UserScore> extractList(JsonArray edges) {
        List<UserScore> scores = new ArrayList<>();
        for (JsonElement edge : edges) {
            UserScore userScore = extractUser(edge);
            scores.add(userScore);
        }
        return scores;
    }

    private static UserScore extractUser(JsonElement edge) {
        JsonObject node = edge.getAsJsonObject().getAsJsonObject("node");
        String username = node.get("username").getAsString();
        String slug = node.get("slug").getAsString();
        String cScore = node.get("cScore").getAsString();
        String rank = node.get("rank").getAsString();
        return new UserScore(
            username,
            slug,
            cScore,
            rank,
            new Profile(
                "pictureUrL",
                "fallbackUrl"
            )
        );
    }

    private static String sendRequest(String url, String data) {
        try {
            URL apiUrl = new URL(url);
            HttpURLConnection connection = (HttpURLConnection) apiUrl.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setDoOutput(true);

            connection.getOutputStream().write(data.getBytes());

            StringBuilder response = new StringBuilder();
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }
            reader.close();

            connection.disconnect();

            return response.toString();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}