package fr.lelouet.services.scores.beans;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserScore {
    private String username;
    private String slug;
    private String cScore;
    private String rank;
    private Profile profile;

    public static int compareRank(UserScore score1, UserScore score2) {
        Integer rank1 = Integer.parseInt(score1.getRank());
        Integer rank2 = Integer.parseInt(score2.getRank());
        return rank1.compareTo(rank2);
    }
}
