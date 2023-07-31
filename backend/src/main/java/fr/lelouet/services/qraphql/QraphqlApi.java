package fr.lelouet.services.qraphql;

import fr.lelouet.services.scores.enums.RulesSaison;
import fr.lelouet.services.scores.beans.UserScore;

import java.util.Collections;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.List;

@Singleton
public class QraphqlApi {

    private final FetchData fetchData;

    @Inject
    private QraphqlApi(
        FetchData fetchData
    ) {
        this.fetchData = fetchData;
    }

    public List<UserScore> fetchScores(RulesSaison season) {
        if (season == null) {
            return Collections.emptyList();
        }
        return this.fetchData.fetch(season);
    }
}
