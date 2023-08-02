package fr.lelouet.services.scores;

import fr.lelouet.services.qraphql.QraphqlApi;
import fr.lelouet.services.scores.beans.UserScore;
import fr.lelouet.services.scores.enums.RulesSaison;
import fr.lelouet.services.scores.enums.RulesScoreType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Singleton
public class ScoresService {

    private static final Logger logger = LoggerFactory.getLogger(ScoresService.class);


    private final Map<RulesScoreType, List<UserScore>> cachedScores = new HashMap<>();
    private Instant lastUpdateOfCache = null;
    private final QraphqlApi graphQLApi;

    @Inject
    private ScoresService(
        QraphqlApi graphQLApi
    ) {
        this.graphQLApi = graphQLApi;
    }

    public Map<RulesScoreType, List<UserScore>> initializeCache() {
        logger.info("INIT Scores cache");
        this.initializeCacheSeason(RulesScoreType.SEASON_1);
        this.initializeCacheSeason(RulesScoreType.SEASON_2);
        logger.info("Scores cache initialized");
        this.calculateAllTimes();
        this.lastUpdateOfCache = Instant.now();
        return this.cachedScores;
    }

    private void calculateAllTimes() {
        this.calculateAllTimeRank();
        this.calculateAllTimeScore();
    }

    private void calculateAllTimeScore() {
        // todo : calculer une liste triée en se basant sur la somme des scores de chaque season
    }

    private void calculateAllTimeRank() {
        // todo : calculer une liste triée en se basant sur la moyenne du rank de chaque season
    }

    private void initializeCacheSeason(RulesScoreType rulesScoreType) {
        // Si la saison n'est pas définie, on ne fait rien
        if(rulesScoreType.getSaison() == null) {
            return;
        }
        RulesSaison saison = rulesScoreType.getSaison();
        List<UserScore> seasonScores = graphQLApi.fetchScores(saison);
        // TODO : Double tri pour etre sur d'avoir un tri par rank croissant
        logger.info("Scores cache initialized for [{}]", saison.name());
        this.cachedScores.put(rulesScoreType, seasonScores);
    }

    // TODO : modifier l'appel et l'objet pour renvoyer une map<Position, UserScore>
    public List<UserScore> getScores(RulesScoreType scoreType) {
        return this.cachedScores.get(scoreType);
    }

    /**
     * Raffraichis l'ensemble du cache des scores
     *
     * @return : L'instant correspondant à la derniere mise à jour du cache
     */
    public Instant refresh() {
        this.initializeCache();
        return this.lastUpdateOfCache;
    }

    /**
     * @return : L'instant correspondant à la derniere mise à jour du cache
     */
    public Instant getLastUpdateInstant() {
        return this.lastUpdateOfCache;
    }
}
