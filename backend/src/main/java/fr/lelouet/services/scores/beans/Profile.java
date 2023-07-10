package fr.lelouet.services.scores.beans;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Profile {
    private String pictureUrl;
    private String fallbackUrl;
}
