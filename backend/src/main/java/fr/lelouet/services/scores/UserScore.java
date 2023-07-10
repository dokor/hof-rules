package fr.lelouet.services.scores;

import io.swagger.v3.oas.annotations.servers.Server;
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
}
