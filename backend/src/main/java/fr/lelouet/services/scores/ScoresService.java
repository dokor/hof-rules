package fr.lelouet.services.scores;

import fr.lelouet.services.qraphql.QraphqlApi;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.List;
import java.util.Map;

@Singleton
public class ScoresService {

    private final Map<RulesSaison, List<UserScore>> cachedScores;
    private final QraphqlApi graphQLApi;

    @Inject
    private ScoresService(
        QraphqlApi graphQLApi
    ) {
        this.graphQLApi = graphQLApi;
        this.cachedScores = this.initializeCache();
    }

    private Map<RulesSaison, List<UserScore>> initializeCache() {
        // TODO, initialiser les deux saisons
        return null;
    }


    // TODO : ajouter un job pour raffraichir le cache des scores
    // TODO : faire un endpoint pour raffraichir le cache des scores

    public List<UserScore> getScores(RulesSaison saison) {
        // TODO : modifier l'appel et l'objet pour renvoyer une map<Position, UserScore>
        return cachedScores.get(saison);
    }

    public List<UserScore> getMockedScores(RulesSaison saison) {
        // TODO : modifier l'appel et l'objet pour renvoyer une map<Position, UserScore>
        return graphQLApi.fetchScores(saison);
    }

    public void refresh() {
        this.initializeCache();
    }
}
