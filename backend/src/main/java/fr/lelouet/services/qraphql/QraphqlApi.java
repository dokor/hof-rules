package fr.lelouet.services.qraphql;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.lelouet.services.scores.Profile;
import fr.lelouet.services.scores.RulesSaison;
import fr.lelouet.services.scores.UserScore;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.List;
import java.util.Objects;

@Singleton
public class QraphqlApi {

    private final ObjectMapper objectMapper;

    @Inject
    private QraphqlApi(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public List<UserScore> fetchScores(RulesSaison season) {
        // TODO
        if (season == null) {
            return null;
        }
        UserScore userScore = new UserScore(
            "username",
            "slug",
            "cScore",
            "rank",
            new Profile(
                "username",
                "slug"
            )
        );
        return List.of(
            userScore,
            userScore,
            userScore,
            userScore,
            userScore,
            userScore,
            userScore,
            userScore,
            userScore,
            userScore,
            userScore,
            userScore,
            userScore,
            userScore,
            userScore
        );
    }
}
