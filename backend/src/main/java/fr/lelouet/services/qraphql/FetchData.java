package fr.lelouet.services.qraphql;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import fr.lelouet.services.scores.beans.Profile;
import fr.lelouet.services.scores.enums.RulesSaison;
import fr.lelouet.services.scores.beans.UserScore;
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
    private static final Integer TOP = 2000;
    private final QraphQLQueryBuilder qraphQLQueryBuilder;

    @Inject
    public FetchData(
        QraphQLQueryBuilder qraphQLQueryBuilder
    ) {
        this.qraphQLQueryBuilder = qraphQLQueryBuilder;
    }

    public List<UserScore> fetch(RulesSaison saison) {
        logger.info("Debut récupération [{}]", saison);
        List<UserScore> scores = new ArrayList<>();
        String data = getData(saison, null);
        while (scores.size() < TOP) {
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

    private String getData(RulesSaison saison, String endCursor) {
        // Aprés la premiere requete, on utilise le endCursor pour fetch la page suivante et continuer la pagination
        if (endCursor != null) {
            return this.qraphQLQueryBuilder.buildNextUserQuery(saison, endCursor);
        }
        // Premiere requete vers grapQL
        return this.qraphQLQueryBuilder.buildFirstUserQuery(saison, TOP);
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
        JsonObject profile = node.get("profile").getAsJsonObject();
        String pictureUrl = profile.get("pictureUrl").getAsString();
        String fallbackUrl = profile.get("fallbackUrl").getAsString();
        return new UserScore(
            username,
            slug,
            cScore,
            rank,
            new Profile(
                pictureUrl,
                fallbackUrl
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