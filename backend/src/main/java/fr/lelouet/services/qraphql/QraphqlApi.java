package fr.lelouet.services.qraphql;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.lelouet.services.scores.enums.RulesSaison;
import fr.lelouet.services.scores.beans.UserScore;

import java.util.Collections;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.List;

@Singleton
public class QraphqlApi {

    private static final Logger logger = LoggerFactory.getLogger(QraphqlApi.class);

    private final ObjectMapper objectMapper;
    private final FetchData fetchData;

    private static final String url = "https://api.rules.art/graphql";

    @Inject
    private QraphqlApi(
        ObjectMapper objectMapper,
        FetchData fetchData
    ) {
        this.objectMapper = objectMapper;
        this.fetchData = fetchData;

    }

    public List<UserScore> fetchScores(RulesSaison season) {
        if (season == null) {
            return Collections.emptyList();
        }
        return this.fetchData.fetch(season);
    }
}
