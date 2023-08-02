package fr.lelouet.services.scores.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import static fr.lelouet.services.scores.enums.RulesSaison.C_SCORE_SEASON_1;
import static fr.lelouet.services.scores.enums.RulesSaison.C_SCORE_SEASON_2;

@AllArgsConstructor
@Getter
public enum RulesScoreType {
    ALL_TIME_SCORE(null),
    ALL_TIME_RANK(null),
    SEASON_1(C_SCORE_SEASON_1),
    SEASON_2(C_SCORE_SEASON_2);

    private final RulesSaison saison;
}
