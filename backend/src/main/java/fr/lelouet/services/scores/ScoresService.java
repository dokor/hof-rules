package fr.lelouet.services.scores;

import fr.lelouet.services.qraphql.QraphqlApi;
import fr.lelouet.services.scores.beans.UserScore;
import fr.lelouet.services.scores.enums.RulesSaison;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Singleton
public class ScoresService {

    private static final Logger logger = LoggerFactory.getLogger(ScoresService.class);


    private Map<RulesSaison, List<UserScore>> cachedScores = new HashMap<>();
    private final QraphqlApi graphQLApi;

    @Inject
    private ScoresService(
        QraphqlApi graphQLApi
    ) {
        this.graphQLApi = graphQLApi;
    }

    public Map<RulesSaison, List<UserScore>> initializeCache() {
        logger.info("INIT Scores cache");
        List<UserScore> firstSaison = graphQLApi.fetchScores(RulesSaison.C_SCORE_SEASON_1);
        List<UserScore> secondSaison = graphQLApi.fetchScores(RulesSaison.C_SCORE_SEASON_2);
        Map<RulesSaison, List<UserScore>> map = new HashMap<>();
        map.put(RulesSaison.C_SCORE_SEASON_1, firstSaison);
        map.put(RulesSaison.C_SCORE_SEASON_2, secondSaison);
        logger.info("Scores cache initialized");
        this.cachedScores = map;
        return map;
    }


    // TODO : ajouter un job pour raffraichir le cache des scores
    // TODO : faire un endpoint pour raffraichir le cache des scores

    public List<UserScore> getScores(RulesSaison saison) {
        // TODO : modifier l'appel et l'objet pour renvoyer une map<Position, UserScore>
        return this.cachedScores.get(saison);
    }

    public void refresh() {
        this.initializeCache();
    }
}
