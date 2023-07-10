package fr.lelouet.services.scores.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum RulesSaison {
    C_SCORE_SEASON_1("1"),
    C_SCORE_SEASON_2("2");

    private final String saison;
}
